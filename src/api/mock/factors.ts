import { FactorExposure, RiskMetrics } from "@/types/market";

export const mockFactorExposures: FactorExposure[] = [
  {
    factor: "Market",
    exposure: 0.92,
    beta: 1.15,
    tValue: 12.4,
    pValue: 0.001,
  },
  {
    factor: "Momentum",
    exposure: 0.34,
    beta: 0.28,
    tValue: 3.2,
    pValue: 0.012,
  },
  {
    factor: "Value",
    exposure: -0.18,
    beta: -0.15,
    tValue: -1.8,
    pValue: 0.078,
  },
  {
    factor: "Size",
    exposure: 0.56,
    beta: 0.42,
    tValue: 5.6,
    pValue: 0.003,
  },
  {
    factor: "Volatility",
    exposure: -0.22,
    beta: -0.19,
    tValue: -2.1,
    pValue: 0.045,
  },
  {
    factor: "USD/INR",
    exposure: 0.45,
    beta: 0.38,
    tValue: 4.3,
    pValue: 0.007,
  },
  {
    factor: "India CPI",
    exposure: -0.28,
    beta: -0.24,
    tValue: -2.8,
    pValue: 0.021,
  },
  {
    factor: "India WPI",
    exposure: -0.15,
    beta: -0.12,
    tValue: -1.5,
    pValue: 0.142,
  },
];

export const mockRiskMetrics: RiskMetrics = {
  beta: 1.15,
  rSquared: 0.78,
  sharpeRatio: 1.45,
  volatility: 0.24,
};

export const mockScenarios = [
  {
    name: "RBI Rate +25 bps",
    impact: -2.8,
    probability: 0.35,
  },
  {
    name: "RBI Rate -25 bps",
    impact: 3.2,
    probability: 0.15,
  },
  {
    name: "Crude +5%",
    impact: -1.5,
    probability: 0.45,
  },
  {
    name: "USD/INR +2%",
    impact: 1.8,
    probability: 0.40,
  },
  {
    name: "FPI Outflow ₹10k Cr",
    impact: -4.2,
    probability: 0.25,
  },
];
