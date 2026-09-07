import React from 'react';
import type { Hotel } from '../../types';
import { ShieldCheck } from 'lucide-react';

interface RealityCheckCardProps {
  realityCheck: Hotel['realityCheck'];
  guestsLove: string[];
  guestsMention: string[];
}

export const RealityCheckCard: React.FC<RealityCheckCardProps> = ({
  realityCheck,
  guestsLove,
  guestsMention,
}) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-300 p-6 md:p-8 shadow-subtle my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Authentic Review Synthesis
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-950 mt-1">
            Reality Check
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            What guests actually experienced — unfiltered insights from verified stays
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold self-start sm:self-auto border border-neutral-200">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" />
          <span>Independent & Unbiased</span>
        </div>
      </div>

      {/* Three Pillars: Positives, Notable, Drawbacks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Positives (Green) */}
        <div className="bg-emerald-50/50 rounded-lg p-5 border border-emerald-200/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm uppercase tracking-wider">
            <span className="text-base">🟢</span>
            <span>Standout Highlights</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
            {realityCheck.positives.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notable (Yellow/Amber) */}
        <div className="bg-amber-50/50 rounded-lg p-5 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
            <span className="text-base">🟡</span>
            <span>Things to Anticipate</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-amber-950">
            {realityCheck.notable.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Drawbacks (Rose/Red) */}
        <div className="bg-rose-50/50 rounded-lg p-5 border border-rose-200/80 space-y-3">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm uppercase tracking-wider">
            <span className="text-base">🔴</span>
            <span>Potential Drawbacks</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950">
            {realityCheck.drawbacks.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-rose-600 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Quick Chips: What Guests Love & What Guests Mention */}
      <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
            Guests repeatedly love
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {guestsLove.map((love, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-xs font-medium border border-neutral-200 transition-colors"
              >
                ✓ {love}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
            Guests frequently mention
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {guestsMention.map((mention, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded text-xs font-medium border border-neutral-200 transition-colors"
              >
                ℹ {mention}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
