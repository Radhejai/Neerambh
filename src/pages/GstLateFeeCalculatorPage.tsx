import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import { calculateGstLateFee, ReturnType, TurnoverSlab } from '../lib/gstLateFee';

function formatINR(n: number): string {
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

export default function GstLateFeeCalculatorPage() {
  const [returnType, setReturnType] = useState<ReturnType>('normal');
  const [turnoverSlab, setTurnoverSlab] = useState<TurnoverSlab>('upto_1_5cr');
  const [daysDelayed, setDaysDelayed] = useState<string>('10');
  const [netTax, setNetTax] = useState<string>('50000');

  const days = Math.max(0, Number(daysDelayed) || 0);
  const netTaxNum = Math.max(0, Number(netTax) || 0);

  const result = useMemo(
    () => calculateGstLateFee(returnType, turnoverSlab, days, netTaxNum),
    [returnType, turnoverSlab, days, netTaxNum]
  );

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
            Return Type
          </label>
          <div className="inline-flex rounded-lg border border-white/10 bg-royal-950/60 p-1">
            {(['normal', 'nil'] as ReturnType[]).map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => setReturnType(rt)}
                className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-widest transition-all ${
                  returnType === rt ? 'bg-gold-500 text-royal-950' : 'text-royal-300 hover:text-white'
                }`}
              >
                {rt === 'normal' ? 'Normal Return' : 'Nil Return'}
              </button>
            ))}
          </div>
        </div>

        {returnType === 'normal' && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
              Annual Turnover (determines the late fee cap)
            </label>
            <select
              value={turnoverSlab}
              onChange={(e) => setTurnoverSlab(e.target.value as TurnoverSlab)}
              className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            >
              <option value="upto_1_5cr">Up to ₹1.5 Crore</option>
              <option value="1_5cr_to_5cr">₹1.5 Crore – ₹5 Crore</option>
              <option value="above_5cr">Above ₹5 Crore</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
            Days Delayed
          </label>
          <input
            type="number"
            min={0}
            value={daysDelayed}
            onChange={(e) => setDaysDelayed(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            placeholder="e.g. 10"
          />
        </div>

        {returnType === 'normal' && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-royal-300 mb-2">
              Net Tax Liability (₹) — after ITC
            </label>
            <input
              type="number"
              min={0}
              value={netTax}
              onChange={(e) => setNetTax(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-3 text-white font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              placeholder="e.g. 50000"
            />
            <p className="mt-2 text-[11px] text-royal-400 font-light">
              Interest is charged only on tax paid via cash ledger, not on your gross output tax.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-gold-500/40 bg-gold-500/5 p-6 backdrop-blur-xl">
        <h3 className="font-serif text-base font-bold text-white mb-4">Estimated Amount Due</h3>
        <p className="font-mono text-3xl font-bold text-white mb-4">{formatINR(result.total)}</p>
        <dl className="space-y-1.5 text-xs text-royal-300 font-light">
          <div className="flex justify-between">
            <dt>Late Fee ({result.daysDelayed} days × ₹{result.perDayRate})</dt>
            <dd className="font-mono">{formatINR(result.lateFeeBeforeCap)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Cap applied</dt>
            <dd className="font-mono">{formatINR(result.cap)}</dd>
          </div>
          <div className="flex justify-between pl-4">
            <dt>&mdash; CGST share</dt>
            <dd className="font-mono">{formatINR(result.cgstShare)}</dd>
          </div>
          <div className="flex justify-between pl-4">
            <dt>&mdash; SGST share</dt>
            <dd className="font-mono">{formatINR(result.sgstShare)}</dd>
          </div>
          {returnType === 'normal' && (
            <div className="flex justify-between">
              <dt>Interest (18% p.a. on net tax)</dt>
              <dd className="font-mono">{formatINR(result.interest)}</dd>
            </div>
          )}
          <div className="flex justify-between pt-1.5 border-t border-royal-800/60 text-royal-200 font-semibold">
            <dt>Total Payable</dt>
            <dd className="font-mono">{formatINR(result.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl flex items-start space-x-3">
        <AlertTriangle className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
        <p className="text-xs text-royal-300 font-light leading-relaxed">
          Late fee is paid in cash equally under CGST and SGST, and cannot be settled using Input Tax
          Credit. If excess ITC was claimed or output tax reduced, interest applies at 24% p.a. instead
          of 18% — this calculator assumes the standard 18% case. For an exact figure and to file,{' '}
          <Link to="/contact" className="text-gold-400 hover:underline inline-flex items-center">
            talk to us <ArrowUpRight className="h-3 w-3 ml-0.5" />
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
