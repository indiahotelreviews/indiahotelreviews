import React from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES } from '../../data/destinationsData';
import { ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openWriteReviewModal, setFilters } = useApp();

  const handleStateClick = (stateName: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedState: stateName,
      selectedCity: '',
    }));
    navigateTo('explore');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-sm mt-24">
      {/* Brand Ethos Bar */}
      <div className="border-b border-neutral-800/80 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-5 h-5 text-neutral-300" />
              <span>100% Genuine Stays</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We do not accept paid ratings or allow hotel owners to delete honest criticism. Our mission is transparent, real experiences.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Sparkles className="w-5 h-5 text-neutral-300" />
              <span>Dual Publicity Philosophy</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Creators get genuine exposure for their social media videos, travellers discover authentic stays, and exceptional hotels earn honest recognition.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Building2 className="w-5 h-5 text-neutral-300" />
              <span>Built Exclusively for India</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              From heritage Mewari havelis and Kerala backwater manas to Himalayan chalets and sacred ghat sanctuaries.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                INDIA<span className="font-sans font-light tracking-widest text-neutral-400">HOTEL</span>REVIEWS
              </span>
            </div>
            <p className="font-serif italic text-neutral-300 text-base">
              “Real stays. Real reviews. Real India.”
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              IndiaHotelReviews is an independent, community-driven review and hotel discovery platform dedicated to elevating genuine hospitality across the Indian subcontinent.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openWriteReviewModal()}
                className="px-4 py-2 bg-white text-neutral-950 font-semibold text-xs rounded uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Share Your Stay Experience
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-white transition-colors">
                  Explore Hotels
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-white transition-colors">
                  Interactive India Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('rankings')} className="hover:text-white transition-colors">
                  India Hotel Rankings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">
                  India Hotel Journal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('saved')} className="hover:text-white transition-colors">
                  My Saved Stays
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Hotels & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">For Hotels</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('explore')} className="hover:text-white transition-colors">
                  Claim Your Property
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                  Hotel Owner Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                  Review Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors">
                  Moderation & Disputes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Integrity</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-neutral-400">Authenticity Standard</span>
              </li>
              <li>
                <span className="text-neutral-400">Social Media Linking Policy</span>
              </li>
              <li>
                <span className="text-neutral-400">Content Moderation Terms</span>
              </li>
              <li>
                <span className="text-neutral-400">Privacy & Data Security</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Explore Indian States Direct Links */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <h5 className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Explore Hotels by Indian State
          </h5>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-400">
            {INDIAN_STATES.map((st) => (
              <button
                key={st}
                onClick={() => handleStateClick(st)}
                className="hover:text-white transition-colors"
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright & Sign-off */}
        <div className="border-t border-neutral-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} IndiaHotelReviews. All rights reserved. “India, checked in.”
          </div>
          <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
            Crafted for genuine travellers across Bharat
          </div>
        </div>
      </div>
    </footer>
  );
};
