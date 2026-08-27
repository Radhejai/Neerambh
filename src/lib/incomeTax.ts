/**
 * Income tax estimator for resident individuals below 60, FY 2026-27
 * (AY 2027-28). Figures per Union Budget 2026 (slabs unchanged from
 * Budget 2025 / Finance Act 2025). Note: under the Income Tax Act 2025
 * (effective 1 April 2026), Sections 80C/80D/80CCD(1B) are renumbered to
 * Sections 123/126/124 respectively — limits and rules are unchanged,
 * only the section numbers. This tool keeps the familiar 80C/80D naming
 * since that's still how these are commonly referred to. This is a
 * simplified estimate: marginal relief on surcharge is not applied, and
 * a handful of itemised deductions cover the most common cases rather
 * than every possible Chapter VI-A deduction.
 */

export type Regime = 'new' | 'old';

export interface OldRegimeDeductionInputs {
  section80C: number; // PPF, ELSS, life insurance, EPF, home loan principal, etc. — cap 1,50,000
  section80CCD1B: number; // Additional NPS (own contribution) — cap 50,000, separate from 80C
  section80DSelf: number; // Health insurance — self & family — cap 25,000
  section80DParents: number; // Health insurance — parents — cap 25,000 (50,000 if senior citizens)
  parentsAreSeniorCitizens: boolean;
  section24B: number; // Home loan interest — self-occupied property — cap 2,00,000
  section80TTA: number; // Savings account interest — cap 10,000
  // HRA exemption inputs (computed via formula, not a flat cap)
  hraBasicSalary: number; // annual
  hraReceived: number; // annual
  rentPaid: number; // annual
  isMetro: boolean;
}

export interface OldRegimeDeductionBreakdown {
  section80C: number;
  section80CCD1B: number;
  section80DSelf: number;
  section80DParents: number;
  section24B: number;
  section80TTA: number;
  hraExemption: number;
  total: number;
}

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

function capped(value: number, cap: number): number {
  return Math.min(Math.max(0, value || 0), cap);
}

export function calculateHraExemption(basic: number, hraReceived: number, rentPaid: number, isMetro: boolean): number {
  const b = Math.max(0, basic || 0);
  const received = Math.max(0, hraReceived || 0);
  const rent = Math.max(0, rentPaid || 0);
  if (received <= 0 || rent <= 0) return 0;
  const rentMinus10Pct = Math.max(0, rent - 0.1 * b);
  const pctOfBasic = (isMetro ? 0.5 : 0.4) * b;
  return Math.max(0, Math.min(received, rentMinus10Pct, pctOfBasic));
}

export function sumOldRegimeDeductions(inputs: OldRegimeDeductionInputs): OldRegimeDeductionBreakdown {
  const section80C = capped(inputs.section80C, 150000);
  const section80CCD1B = capped(inputs.section80CCD1B, 50000);
  const section80DSelf = capped(inputs.section80DSelf, 25000);
  const section80DParents = capped(inputs.section80DParents, inputs.parentsAreSeniorCitizens ? 50000 : 25000);
  const section24B = capped(inputs.section24B, 200000);
  const section80TTA = capped(inputs.section80TTA, 10000);
  const hraExemption = calculateHraExemption(inputs.hraBasicSalary, inputs.hraReceived, inputs.rentPaid, inputs.isMetro);

  const total = section80C + section80CCD1B + section80DSelf + section80DParents + section24B + section80TTA + hraExemption;

  return { section80C, section80CCD1B, section80DSelf, section80DParents, section24B, section80TTA, hraExemption, total };
}

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
