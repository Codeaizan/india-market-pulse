import { PricePoint } from "@/types/market";

// Generate mock OHLCV data for the past year
export const generateMockPriceData = (
  symbol: string,
  days: number = 365
): PricePoint[] => {
  const data: PricePoint[] = [];
  const basePrice = 2500;
  const now = Date.now();
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000;
    const randomFactor = 1 + (Math.random() - 0.5) * 0.05;
    const trend = Math.sin((days - i) / 30) * 0.15;
    
    const close = basePrice * (1 + trend) * randomFactor;
    const open = close * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    const volume = Math.floor(1000000 + Math.random() * 5000000);
    
    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    });
  }
  
  return data;
};

export const calculateMovingAverage = (
  data: PricePoint[],
  period: number
): number[] => {
  const ma: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      ma.push(0);
    } else {
      const sum = data
        .slice(i - period + 1, i + 1)
        .reduce((acc, point) => acc + point.close, 0);
      ma.push(sum / period);
    }
  }
  
  return ma;
};

export const calculateRSI = (data: PricePoint[], period: number = 14): number[] => {
  const rsi: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    if (i < period) {
      rsi.push(50);
      continue;
    }
    
    const changes = data.slice(i - period, i).map((point, idx, arr) => {
      if (idx === 0) return 0;
      return point.close - arr[idx - 1].close;
    });
    
    const gains = changes.filter(c => c > 0).reduce((a, b) => a + b, 0) / period;
    const losses = Math.abs(changes.filter(c => c < 0).reduce((a, b) => a + b, 0)) / period;
    
    const rs = gains / (losses || 1);
    rsi.push(100 - 100 / (1 + rs));
  }
  
  return rsi;
};
