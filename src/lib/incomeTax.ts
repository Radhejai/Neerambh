/**
 * Income tax estimator for resident individuals below 60, FY 2026-27
 * (AY 2027-28). Figures per Union Budget 2026 (slabs unchanged from
 * Budget 2025 / Finance Act 2025). This is a simplified estimate:
 * marginal relief on surcharge is not applied, and old-regime deductions
 * are taken as a single combined input rather than itemised 80C/80D/HRA.
 */

export type Regime = 'new' | 'old';

export interface TaxBreakdown {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  effectiveRate: number; // % of gross income
}

const NEW_REGIME_SLABS: [number, number][] = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
];

const OLD_REGIME_SLABS: [number, number][] = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.2],
  [Infinity, 0.3],
];

function slabTax(taxable: number, slabs: [number, number][]): number {
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of slabs) {
    if (taxable <= lower) break;
    const bandAmount = Math.min(taxable, upper) - lower;
    tax += bandAmount * rate;
    lower = upper;
  }
  return tax;
}

function surchargeFor(taxable: number, tax: number, regime: Regime): number {
  let rate = 0;
  if (taxable > 20000000) rate = regime === 'old' ? 0.37 : 0.25;
  else if (taxable > 10000000) rate = 0.15;
  else if (taxable > 5000000) rate = 0.1;
  return tax * rate;
}

export function calculateTax(grossIncome: number, otherDeductions: number, regime: Regime): TaxBreakdown {
  const standardDeduction = regime === 'new' ? 75000 : 50000;
  const deductions = standardDeduction + (regime === 'old' ? Math.max(0, otherDeductions) : 0);
  const taxableIncome = Math.max(0, grossIncome - deductions);

  const slabs = regime === 'new' ? NEW_REGIME_SLABS : OLD_REGIME_SLABS;
  const taxBeforeRebate = slabTax(taxableIncome, slabs);

  const rebateThreshold = regime === 'new' ? 1200000 : 500000;
  const rebateCap = regime === 'new' ? 60000 : 12500;
  const rebate87A = taxableIncome <= rebateThreshold ? Math.min(taxBeforeRebate, rebateCap) : 0;

  const taxAfterRebate = taxBeforeRebate - rebate87A;
  const surcharge = surchargeFor(taxableIncome, taxAfterRebate, regime);
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = Math.round(taxAfterRebate + surcharge + cess);

  return {
    grossIncome,
    standardDeduction,
    otherDeductions: regime === 'old' ? Math.max(0, otherDeductions) : 0,
    taxableIncome,
    taxBeforeRebate: Math.round(taxBeforeRebate),
    rebate87A: Math.round(rebate87A),
    taxAfterRebate: Math.round(taxAfterRebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
  };
}
