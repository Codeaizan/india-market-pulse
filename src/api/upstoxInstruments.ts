// Upstox instrument key mapping for major Indian stocks and indices
export const UPSTOX_INSTRUMENTS = {
  // Indices
  'NIFTY50': 'NSE_INDEX|Nifty 50',
  'BANKNIFTY': 'NSE_INDEX|Nifty Bank',
  'SENSEX': 'BSE_INDEX|SENSEX',
  
  // Stocks - NSE
  'RELIANCE': 'NSE_EQ|INE002A01018',
  'TCS': 'NSE_EQ|INE467B01029',
  'HDFCBANK': 'NSE_EQ|INE040A01034',
  'INFY': 'NSE_EQ|INE009A01021',
  'ICICIBANK': 'NSE_EQ|INE090A01021',
  'BHARTIARTL': 'NSE_EQ|INE397D01024',
  'ITC': 'NSE_EQ|INE154A01025',
  'SBIN': 'NSE_EQ|INE062A01020',
};

export const getUpstoxSymbol = (symbol: string): string => {
  return UPSTOX_INSTRUMENTS[symbol as keyof typeof UPSTOX_INSTRUMENTS] || symbol;
};

export const getUpstoxSymbols = (symbols: string[]): string[] => {
  return symbols.map(getUpstoxSymbol);
};
