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
    const { symbol, interval, from_date, to_date } = await req.json();
    const accessToken = await getAccessToken();

    if (!symbol) {
      throw new Error('symbol is required');
    }

    const url = new URL('https://api.upstox.com/v2/historical-candle/intraday');
    url.pathname = `/v2/historical-candle/${symbol}/${interval || 'day'}/${to_date || ''}/${from_date || ''}`;

    console.log('Fetching historical data:', url.toString());

    const response = await fetch(url.toString(), {
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
    console.log('Historical data received for', symbol);

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
    console.error('Error in upstox-historical:', error);
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
