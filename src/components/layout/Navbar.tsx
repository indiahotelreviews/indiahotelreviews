import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PenSquare, 
  Bookmark, 
  Compass, 
  Trophy, 
  BookOpen, 
  ShieldAlert, 
  Scale, 
  User,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    openWriteReviewModal, 
    savedHotelIds, 
    comparisonHotelIds, 
    setComparisonModalOpen,
    currentUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-editorial-border transition-all">
      {/* Top micro brand banner */}
      <div className="bg-neutral-950 text-neutral-300 text-[11px] py-1 px-4 text-center tracking-widest uppercase font-medium">
        <span className="text-white font-semibold">Real stays. Real reviews. Real India.</span>
        <span className="mx-2 text-neutral-600 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-neutral-400">Authentic community verified stays</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex flex-col cursor-pointer select-none group"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neutral-900 group-hover:scale-125 transition-transform" />
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                INDIA<span className="font-sans font-light tracking-widest text-neutral-600">HOTEL</span>REVIEWS
              </span>
            </div>
            <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-neutral-500 pl-5 -mt-0.5">
              India, checked in.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => navigateTo('explore')}
              className={`px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentView === 'explore'
                  ? 'text-neutral-950 bg-neutral-100 font-bold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              Explore & Map
            </button>
            <button
              onClick={() => navigateTo('rankings')}
              className={`px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentView === 'rankings'
                  ? 'text-neutral-950 bg-neutral-100 font-bold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              Rankings
            </button>
            <button
              onClick={() => navigateTo('journal')}
              className={`px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                currentView === 'journal' || currentView === 'journal-article'
                  ? 'text-neutral-950 bg-neutral-100 font-bold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              Journal
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 ${
                currentView === 'admin'
                  ? 'text-neutral-950 bg-neutral-100 font-bold'
                  : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
              title="Community Moderation & Claims"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
              Moderation
            </button>
          </nav>

          {/* Actions on Desktop */}
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            {/* Compare Trigger Button if any hotels selected */}
            {comparisonHotelIds.length > 0 && (
              <button
                onClick={() => setComparisonModalOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors"
                title="Compare Selected Hotels"
              >
                <Scale className="w-4 h-4" />
                <span>Compare</span>
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-mono">
                  {comparisonHotelIds.length}
                </span>
              </button>
            )}

            {/* Saved Hotels icon */}
            <button
              onClick={() => navigateTo('saved')}
              className={`relative p-2.5 rounded-full border transition-colors ${
                currentView === 'saved'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border-neutral-200'
              }`}
              title="My Saved Hotels"
            >
              <Bookmark className="w-4 h-4" />
              {savedHotelIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-mono font-bold">
                  {savedHotelIds.length}
                </span>
              )}
            </button>

            {/* Write a review primary CTA */}
            <button
              onClick={() => openWriteReviewModal()}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded text-xs font-bold uppercase tracking-wider transition-all shadow-subtle hover:shadow-elevated active:scale-95"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>

            {/* User Profile / Auth trigger */}
            <div className="flex items-center gap-1.5 pl-1">
              <button
                onClick={() => navigateTo('profile')}
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-neutral-100 transition-colors border border-neutral-200"
                title={`${currentUser.name} (${currentUser.handle})`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover grayscale contrast-125 border border-neutral-300"
                />
                <span className="text-xs font-semibold text-neutral-900 hidden xl:inline max-w-[100px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openWriteReviewModal()}
              className="p-2 bg-neutral-900 text-white rounded text-xs font-semibold flex items-center gap-1"
            >
              <PenSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Review</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-neutral-800 hover:bg-neutral-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <button
            onClick={() => {
              navigateTo('explore');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <Compass className="w-4 h-4 text-neutral-500" />
            Explore & Map
          </button>
          <button
            onClick={() => {
              navigateTo('rankings');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <Trophy className="w-4 h-4 text-neutral-500" />
            Rankings
          </button>
          <button
            onClick={() => {
              navigateTo('journal');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <BookOpen className="w-4 h-4 text-neutral-500" />
            India Hotel Journal
          </button>
          <button
            onClick={() => {
              navigateTo('saved');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <Bookmark className="w-4 h-4 text-neutral-500" />
            My Saved Hotels ({savedHotelIds.length})
          </button>
          <button
            onClick={() => {
              navigateTo('profile');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <User className="w-4 h-4 text-neutral-500" />
            My Profile & Badges
          </button>
          <button
            onClick={() => {
              navigateTo('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-800 rounded-md hover:bg-neutral-50"
          >
            <ShieldAlert className="w-4 h-4 text-neutral-500" />
            Moderation & Claims
          </button>
        </div>
      )}
    </header>
  );
};
