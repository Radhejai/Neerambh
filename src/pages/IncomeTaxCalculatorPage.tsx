import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import { calculateTax, TaxBreakdown } from '../lib/incomeTax';

function formatINR(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

function RegimeCard({ label, result, isBetter }: { label: string; result: TaxBreakdown; isBetter: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        isBetter ? 'border-gold-500/40 bg-gold-500/5' : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-base font-bold text-white">{label}</h3>
        {isBetter && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 px-2 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            Lower Tax
          </span>
        )}
      </div>
      <p className="font-mono text-3xl font-bold text-white mb-4">{formatINR(result.totalTax)}</p>
      <dl className="space-y-1.5 text-xs text-royal-300 font-light">
        <div className="flex justify-between"><dt>Taxable Income</dt><dd className="font-mono">{formatINR(result.taxableIncome)}</dd></div>
        <div className="flex justify-between"><dt>Tax before rebate</dt><dd className="font-mono">{formatINR(result.taxBeforeRebate)}</dd></div>
        <div className="flex justify-between"><dt>Rebate (Sec 87A)</dt><dd className="font-mono">-{formatINR(result.rebate87A)}</dd></div>
        {result.surcharge > 0 && (
          <div className="flex justify-between"><dt>Surcharge</dt><dd className="font-mono">{formatINR(result.surcharge)}</dd></div>
        )}
        <div className="flex justify-between"><dt>Health &amp; Education Cess (4%)</dt><dd className="font-mono">{formatINR(result.cess)}</dd></div>
        <div className="flex justify-between pt-1.5 border-t border-royal-800/60 text-royal-200"><dt>Effective Rate</dt><dd className="font-mono">{result.effectiveRate.toFixed(2)}%</dd></div>
      </dl>
    </div>
  );
}

export default function IncomeTaxCalculatorPage() {
  const [gross, setGross] = useState<string>('1200000');
  const [deductions, setDeductions] = useState<string>('150000');

  const grossNum = Math.max(0, Number(gross) || 0);
  const deductionsNum = Math.max(0, Number(deductions) || 0);

  const newRegime = useMemo(() => calculateTax(grossNum, 0, 'new'), [grossNum]);
  const oldRegime = useMemo(() => calculateTax(grossNum, deductionsNum, 'old'), [grossNum, deductionsNum]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
            Annual Gross Income (₹)
          </label>
          <input
            type="number"
            min={0}
            value={gross}
            onChange={(e) => setGross(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            placeholder="e.g. 1200000"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
            Other Deductions — 80C, 80D, HRA, home loan interest, etc. (₹)
          </label>
          <input
            type="number"
            min={0}
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            placeholder="e.g. 150000"
          />
          <p className="mt-2 text-[11px] text-royal-400 font-light">
            Only used for the Old Regime calculation — the New Regime allows the standard deduction only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegimeCard label="New Regime" result={newRegime} isBetter={newRegime.totalTax <= oldRegime.totalTax} />
        <RegimeCard label="Old Regime" result={oldRegime} isBetter={oldRegime.totalTax < newRegime.totalTax} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl flex items-start space-x-3">
        <AlertTriangle className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
        <p className="text-xs text-royal-300 font-light leading-relaxed">
          This is an estimate for resident individuals below 60, based on FY 2026-27 slabs. It does not
          apply surcharge marginal relief and treats deductions as a single combined figure rather than
          itemised 80C/80D/HRA limits. For an exact computation and filing,{' '}
          <Link to="/contact" className="text-gold-400 hover:underline inline-flex items-center">
            talk to us <ArrowUpRight className="h-3 w-3 ml-0.5" />
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
