import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Building2, Flame } from 'lucide-react';

interface BadgeProps {
  type: 'verified_stay' | 'community_review' | 'hotel_response' | 'category' | 'price' | 'trending' | 'editorial';
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, label, className = '' }) => {
  if (type === 'verified_stay') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-neutral-900 text-white border border-neutral-800 ${className}`}
      >
        <ShieldCheck className="w-3 h-3 text-emerald-400" />
        {label || '✓ Verified Stay'}
      </span>
    );
  }

  if (type === 'community_review') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-neutral-100 text-neutral-700 border border-neutral-200 ${className}`}
      >
        <CheckCircle2 className="w-3 h-3 text-neutral-500" />
        {label || 'Community Review'}
      </span>
    );
  }

  if (type === 'hotel_response') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-neutral-900 text-white border border-neutral-800 ${className}`}
      >
        <Building2 className="w-3 h-3 text-amber-300" />
        {label || 'Hotel Response'}
      </span>
    );
  }

  if (type === 'trending') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-100 text-amber-900 border border-amber-300 ${className}`}
      >
        <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
        {label || 'Trending'}
      </span>
    );
  }

  if (type === 'editorial') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-neutral-900 text-white ${className}`}
      >
        <Sparkles className="w-2.5 h-2.5 text-amber-300" />
        {label || 'Journal Pick'}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-wide bg-neutral-100 text-neutral-700 border border-neutral-200 ${className}`}
    >
      {label}
    </span>
  );
};
