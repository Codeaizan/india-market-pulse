import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken() {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { data, error } = await supabaseAdmin
    .from('upstox_tokens')
    .select('access_token, expires_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error('No valid Upstox token found. Please authenticate first.');
  }

  // Check if token is expired
  const expiresAt = new Date(data.expires_at);
  if (expiresAt < new Date()) {
    throw new Error('Upstox token has expired. Please re-authenticate.');
  }

  return data.access_token;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();
    const accessToken = await getAccessToken();

    if (!symbols || !Array.isArray(symbols)) {
      throw new Error('symbols array is required');
    }

    const symbolParam = symbols.join(',');
    const url = `https://api.upstox.com/v2/market-quote/quotes?symbol=${symbolParam}`;

    console.log('Fetching quotes for symbols:', symbolParam);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstox API error:', response.status, errorText);
      throw new Error(`Upstox API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Quotes received for', symbols.length, 'symbols');

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in upstox-quotes:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
