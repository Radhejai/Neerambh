import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowUpRight, ChevronDown } from 'lucide-react';
import { calculateTax, sumOldRegimeDeductions, TaxBreakdown, OldRegimeDeductionInputs } from '../lib/incomeTax';

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

function DeductionField({
  label, section, cap, value, onChange, note,
}: {
  label: string; section: string; cap: number; value: string; onChange: (v: string) => void; note?: string;
}) {
  const numValue = Number(value) || 0;
  const isOverCap = numValue > cap;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-semibold text-royal-200">{label}</label>
        <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">{section} &middot; cap {formatINR(cap)}</span>
      </div>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
        placeholder="0"
      />
      {isOverCap && (
        <p className="mt-1 text-[11px] text-gold-400 font-light">Capped at {formatINR(cap)} — the excess isn&apos;t deductible.</p>
      )}
      {note && <p className="mt-1 text-[11px] text-royal-400 font-light">{note}</p>}
    </div>
  );
}

export default function IncomeTaxCalculatorPage() {
  const [gross, setGross] = useState<string>('1200000');
  const [showItemized, setShowItemized] = useState(true);

  const [section80C, setSection80C] = useState('150000');
  const [section80CCD1B, setSection80CCD1B] = useState('0');
  const [section80DSelf, setSection80DSelf] = useState('25000');
  const [section80DParents, setSection80DParents] = useState('0');
  const [parentsAreSeniorCitizens, setParentsAreSeniorCitizens] = useState(false);
  const [section24B, setSection24B] = useState('0');
  const [section80TTA, setSection80TTA] = useState('0');
  const [hraBasicSalary, setHraBasicSalary] = useState('0');
  const [hraReceived, setHraReceived] = useState('0');
  const [rentPaid, setRentPaid] = useState('0');
  const [isMetro, setIsMetro] = useState(true);

  const grossNum = Math.max(0, Number(gross) || 0);

  const deductionInputs: OldRegimeDeductionInputs = {
    section80C: Number(section80C) || 0,
    section80CCD1B: Number(section80CCD1B) || 0,
    section80DSelf: Number(section80DSelf) || 0,
    section80DParents: Number(section80DParents) || 0,
    parentsAreSeniorCitizens,
    section24B: Number(section24B) || 0,
    section80TTA: Number(section80TTA) || 0,
    hraBasicSalary: Number(hraBasicSalary) || 0,
    hraReceived: Number(hraReceived) || 0,
    rentPaid: Number(rentPaid) || 0,
    isMetro,
  };

  const deductions = useMemo(() => sumOldRegimeDeductions(deductionInputs), [
    section80C, section80CCD1B, section80DSelf, section80DParents, parentsAreSeniorCitizens,
    section24B, section80TTA, hraBasicSalary, hraReceived, rentPaid, isMetro,
  ]);

  const newRegime = useMemo(() => calculateTax(grossNum, 0, 'new'), [grossNum]);
  const oldRegime = useMemo(() => calculateTax(grossNum, deductions.total, 'old'), [grossNum, deductions.total]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
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

      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowItemized((s) => !s)}
          className="w-full flex items-center justify-between px-6 py-4 text-left"
        >
          <div>
            <h3 className="text-sm font-semibold text-white">Old Regime Deductions — by Section</h3>
            <p className="text-[11px] text-royal-400 font-light mt-0.5">Each section has its own statutory limit — enter what you actually pay or invest.</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-royal-400 shrink-0 transition-transform ${showItemized ? 'rotate-180' : ''}`} />
        </button>

        {showItemized && (
          <div className="px-6 pb-6 space-y-5 border-t border-white/10 pt-5">
            <DeductionField
              label="80C / 80CCC / 80CCD(1) — PPF, ELSS, life insurance, EPF, home loan principal, etc."
              section="Sec 123"
              cap={150000}
              value={section80C}
              onChange={setSection80C}
            />
            <DeductionField
              label="80CCD(1B) — Additional NPS (own contribution)"
              section="Sec 124"
              cap={50000}
              value={section80CCD1B}
              onChange={setSection80CCD1B}
              note="Separate from the 80C limit above."
            />
            <DeductionField
              label="80D — Health insurance premium (self & family)"
              section="Sec 126"
              cap={25000}
              value={section80DSelf}
              onChange={setSection80DSelf}
            />
            <div>
              <DeductionField
                label="80D — Health insurance premium (parents)"
                section="Sec 126"
                cap={parentsAreSeniorCitizens ? 50000 : 25000}
                value={section80DParents}
                onChange={setSection80DParents}
              />
              <label className="mt-2 flex items-center space-x-2 text-[11px] text-royal-300 font-light">
                <input
                  type="checkbox"
                  checked={parentsAreSeniorCitizens}
                  onChange={(e) => setParentsAreSeniorCitizens(e.target.checked)}
                  className="rounded border-white/20 bg-royal-950 accent-gold-500"
                />
                <span>Parents are senior citizens (60+) — raises their cap to ₹50,000</span>
              </label>
            </div>
            <DeductionField
              label="24(b) — Home loan interest (self-occupied property)"
              section="Sec 24(b)"
              cap={200000}
              value={section24B}
              onChange={setSection24B}
            />
            <DeductionField
              label="80TTA — Savings account interest"
              section="Sec 80TTA"
              cap={10000}
              value={section80TTA}
              onChange={setSection80TTA}
            />

            <div className="pt-2 border-t border-white/10">
              <h4 className="text-xs font-semibold text-royal-200 mb-3">HRA Exemption (computed automatically)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-royal-400 mb-1">Basic Salary (annual, ₹)</label>
                  <input type="number" min={0} value={hraBasicSalary} onChange={(e) => setHraBasicSalary(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" />
                </div>
                <div>
                  <label className="block text-[11px] text-royal-400 mb-1">HRA Received (annual, ₹)</label>
                  <input type="number" min={0} value={hraReceived} onChange={(e) => setHraReceived(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" />
                </div>
                <div>
                  <label className="block text-[11px] text-royal-400 mb-1">Rent Paid (annual, ₹)</label>
                  <input type="number" min={0} value={rentPaid} onChange={(e) => setRentPaid(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-royal-950/60 px-3 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40" />
                </div>
              </div>
              <label className="mt-2 flex items-center space-x-2 text-[11px] text-royal-300 font-light">
                <input type="checkbox" checked={isMetro} onChange={(e) => setIsMetro(e.target.checked)} className="rounded border-white/20 bg-royal-950 accent-gold-500" />
                <span>Metro city (Delhi, Mumbai, Kolkata, Chennai) — uses 50% of basic instead of 40%</span>
              </label>
              <p className="mt-2 text-[11px] text-royal-400 font-light">
                Exemption = least of HRA received, rent paid minus 10% of basic, or 50%/40% of basic. Computed: <span className="text-gold-400 font-mono">{formatINR(deductions.hraExemption)}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between text-sm">
              <span className="font-semibold text-royal-200">Total Deductions (capped)</span>
              <span className="font-mono font-bold text-gold-400">{formatINR(deductions.total)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegimeCard label="New Regime" result={newRegime} isBetter={newRegime.totalTax <= oldRegime.totalTax} />
        <RegimeCard label="Old Regime" result={oldRegime} isBetter={oldRegime.totalTax < newRegime.totalTax} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl flex items-start space-x-3">
        <AlertTriangle className="h-4 w-4 text-gold-400 mt-0.5 shrink-0" />
        <p className="text-xs text-royal-300 font-light leading-relaxed">
          This is an estimate for resident individuals below 60, based on FY 2026-27 limits. It covers the
          most common deductions but not every possible Chapter VI-A section, and does not apply surcharge
          marginal relief. Under the Income Tax Act 2025 (effective this year), these sections are formally
          renumbered — 80C is now Section 123, 80D is Section 126, 80CCD(1B) is Section 124 — limits are
          unchanged. For an exact computation and filing,{' '}
          <Link to="/contact" className="text-gold-400 hover:underline inline-flex items-center">
            talk to us <ArrowUpRight className="h-3 w-3 ml-0.5" />
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
