import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, PenSquare, Bookmark, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, navigateTo, openWriteReviewModal, savedHotelIds } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200 lg:hidden px-2 py-1.5 shadow-elevated">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentView === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Explore */}
        <button
          onClick={() => navigateTo('explore')}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentView === 'explore' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Explore</span>
        </button>

        {/* Write Review Action (Centered elevated button) */}
        <button
          onClick={() => openWriteReviewModal()}
          className="flex flex-col items-center justify-center -mt-4"
          aria-label="Write a Review"
        >
          <div className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-elevated active:scale-95 transition-transform border-2 border-white">
            <PenSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-900 tracking-tight mt-0.5">Review</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => navigateTo('saved')}
          className={`relative flex flex-col items-center gap-1 py-1 transition-colors ${
            currentView === 'saved' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          {savedHotelIds.length > 0 && (
            <span className="absolute top-0.5 right-4 w-3.5 h-3.5 rounded-full bg-neutral-900 text-white text-[9px] flex items-center justify-center font-mono">
              {savedHotelIds.length}
            </span>
          )}
          <span className="text-[10px] tracking-tight">Saved</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentView === 'profile' ? 'text-neutral-950 font-bold' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
