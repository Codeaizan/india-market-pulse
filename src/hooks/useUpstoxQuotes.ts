import { useQuery } from "@tanstack/react-query";
import { upstoxApi } from "@/api/upstox";

export const useUpstoxQuotes = (symbols: string[], enabled = true) => {
  return useQuery({
    queryKey: ['upstox-quotes', symbols],
    queryFn: () => upstoxApi.getQuotes(symbols),
    enabled: enabled && symbols.length > 0,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });
};

export const useUpstoxHistorical = (
  symbol: string, 
  interval: string = 'day',
  from_date?: string,
  to_date?: string,
  enabled = true
) => {
  return useQuery({
    queryKey: ['upstox-historical', symbol, interval, from_date, to_date],
    queryFn: () => upstoxApi.getHistoricalData(symbol, interval, from_date, to_date),
    enabled: enabled && !!symbol,
  });
};
