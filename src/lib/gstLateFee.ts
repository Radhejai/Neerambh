/**
 * GST late fee & interest estimator for GSTR-3B / GSTR-1 (Section 47 late
 * fee, Section 50 interest). Rates per CBIC notifications current as of
 * 2026. Interest is calculated on net cash tax liability only.
 */

export type ReturnType = 'normal' | 'nil';
export type TurnoverSlab = 'upto_1_5cr' | '1_5cr_to_5cr' | 'above_5cr';

export interface LateFeeBreakdown {
  daysDelayed: number;
  perDayRate: number;
  lateFeeBeforeCap: number;
  cap: number;
  lateFee: number;
  cgstShare: number;
  sgstShare: number;
  interest: number;
  total: number;
}

const LATE_FEE_CAPS: Record<TurnoverSlab, number> = {
  upto_1_5cr: 2000,
  '1_5cr_to_5cr': 5000,
  above_5cr: 10000,
};

export function calculateGstLateFee(
  returnType: ReturnType,
  turnoverSlab: TurnoverSlab,
  daysDelayed: number,
  netTaxLiability: number
): LateFeeBreakdown {
  const days = Math.max(0, Math.floor(daysDelayed));
  const perDayRate = returnType === 'nil' ? 20 : 50;
  const cap = returnType === 'nil' ? 500 : LATE_FEE_CAPS[turnoverSlab];

  const lateFeeBeforeCap = days * perDayRate;
  const lateFee = Math.min(lateFeeBeforeCap, cap);

  const interest = returnType === 'normal' && netTaxLiability > 0
    ? (Math.max(0, netTaxLiability) * (days / 365) * 0.18)
    : 0;

  return {
    daysDelayed: days,
    perDayRate,
    lateFeeBeforeCap,
    cap,
    lateFee,
    cgstShare: lateFee / 2,
    sgstShare: lateFee / 2,
    interest: Math.round(interest),
    total: Math.round(lateFee + interest),
  };
}
