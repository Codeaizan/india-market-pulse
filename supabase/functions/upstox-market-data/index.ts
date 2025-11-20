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
    const { endpoint, params } = await req.json();
    const apiKey = Deno.env.get('UPSTOX_API_KEY');

    if (!apiKey) {
      throw new Error('UPSTOX_API_KEY not configured');
    }

    const baseUrl = 'https://api.upstox.com/v2';
    const url = new URL(`${baseUrl}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    console.log('Fetching from Upstox:', url.toString());

    const response = await fetch(url.toString(), {
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
    console.log('Upstox response received successfully');

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
    console.error('Error in upstox-market-data:', error);
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
