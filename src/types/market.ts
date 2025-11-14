// Domain types for Indian market analytics

export interface Ticker {
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE";
  sector: string;
  marketCap: number;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export interface PricePoint {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicators {
  ma20: number;
  ma50: number;
  ma200: number;
  rsi: number;
  macd: number;
  macdSignal: number;
  macdHistogram: number;
}

export interface FactorExposure {
  factor: string;
  exposure: number;
  beta: number;
  tValue: number;
  pValue: number;
}

export interface RiskMetrics {
  beta: number;
  rSquared: number;
  sharpeRatio: number;
  volatility: number;
}

export interface FinancialStatement {
  period: string;
  revenue: number;
  netIncome: number;
  ebitda: number;
  eps: number;
  assets: number;
  liabilities: number;
  equity: number;
  operatingCashFlow: number;
  freeCashFlow: number;
}

export interface CompanyMetrics {
  roe: number;
  roce: number;
  debtToEquity: number;
  currentRatio: number;
  priceToEarnings: number;
  priceToBook: number;
  dividendYield: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  sentiment: "positive" | "neutral" | "negative";
  sentimentScore: number;
  excerpt: string;
}

export interface FilingEntity {
  id: string;
  type: "announcement" | "shareholding" | "insider" | "bulk";
  title: string;
  date: string;
  fileUrl?: string;
  description: string;
}

export interface MacroIndicator {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  unit: string;
  asOf: string;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: "company" | "supplier" | "customer" | "subsidiary";
  revenue?: number;
  revenuePercent?: number;
}

export interface SupplyChainLink {
  source: string;
  target: string;
  value: number;
  type: "supplier" | "customer" | "subsidiary";
}

export interface WatchlistItem extends Ticker {
  addedAt: string;
  notes?: string;
}

export interface Alert {
  id: string;
  symbol: string;
  condition: string;
  value: number;
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}
