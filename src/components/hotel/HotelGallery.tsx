import React, { useState } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

interface HotelGalleryProps {
  officialPhotos: string[];
  guestPhotos: string[];
  hotelName: string;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({
  officialPhotos,
  guestPhotos,
  hotelName,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'guest' | 'official'>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const displayPhotos = 
    activeTab === 'official'
      ? officialPhotos.map((src) => ({ src, type: 'official' }))
      : activeTab === 'guest'
      ? guestPhotos.map((src) => ({ src, type: 'guest' }))
      : [
          ...guestPhotos.map((src) => ({ src, type: 'guest' })),
          ...officialPhotos.map((src) => ({ src, type: 'official' })),
        ];

  return (
    <div className="space-y-6">
      {/* Tabs for Official vs Guest Photos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'all'
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All Photos ({officialPhotos.length + guestPhotos.length})
          </button>
          <button
            onClick={() => setActiveTab('guest')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'guest'
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Guest Photos ({guestPhotos.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('official')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === 'official'
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Property Photos ({officialPhotos.length})</span>
          </button>
        </div>

        <div className="text-xs text-neutral-500 font-mono italic">
          Hover to view in full colour
        </div>
      </div>

      {/* Photos Grid with Monochrome -> Colour Interaction */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {displayPhotos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setLightboxImage(photo.src)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-950 cursor-pointer border border-editorial-border hover:border-neutral-950 transition-all duration-300"
          >
            <img
              src={photo.src}
              alt={`${hotelName} - ${photo.type}`}
              className="w-full h-full object-cover mono-to-color-zoom"
              loading="lazy"
            />
            {/* Tag label */}
            <div className="absolute top-2 left-2 z-10">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  photo.type === 'guest'
                    ? 'bg-neutral-900/90 text-white backdrop-blur-sm border border-neutral-700'
                    : 'bg-white/90 text-neutral-900 backdrop-blur-sm'
                }`}
              >
                {photo.type === 'guest' ? '📷 Guest' : '🏨 Hotel'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] overflow-hidden rounded-xl bg-black border border-neutral-800 shadow-modal"
          >
            <img
              src={lightboxImage}
              alt={hotelName}
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            <div className="p-3 bg-neutral-950 text-neutral-300 text-xs text-center border-t border-neutral-800 flex items-center justify-between px-6">
              <span>{hotelName}</span>
              <span className="font-mono text-neutral-400">Full Resolution Preview</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
