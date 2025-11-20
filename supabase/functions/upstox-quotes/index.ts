import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();
    const apiKey = Deno.env.get('UPSTOX_API_KEY');

    if (!apiKey) {
      throw new Error('UPSTOX_API_KEY not configured');
    }

    if (!symbols || !Array.isArray(symbols)) {
      throw new Error('symbols array is required');
    }

    const symbolParam = symbols.join(',');
    const url = `https://api.upstox.com/v2/market-quote/quotes?symbol=${symbolParam}`;

    console.log('Fetching quotes for symbols:', symbolParam);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
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
