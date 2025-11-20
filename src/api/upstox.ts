import { supabase } from "@/integrations/supabase/client";

export const upstoxApi = {
  async getQuotes(symbols: string[]) {
    const { data, error } = await supabase.functions.invoke('upstox-quotes', {
      body: { symbols },
    });

    if (error) throw error;
    return data;
  },

  async getHistoricalData(symbol: string, interval: string, from_date?: string, to_date?: string) {
    const { data, error } = await supabase.functions.invoke('upstox-historical', {
      body: { symbol, interval, from_date, to_date },
    });

    if (error) throw error;
    return data;
  },

  async getMarketData(endpoint: string, params?: Record<string, any>) {
    const { data, error } = await supabase.functions.invoke('upstox-market-data', {
      body: { endpoint, params },
    });

    if (error) throw error;
    return data;
  },
};
