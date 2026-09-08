import React, { useEffect, useRef, useState } from 'react';
import type { Hotel } from '../../types';
import { useApp } from '../../context/AppContext';
import { Navigation, Sparkles } from 'lucide-react';
import L from 'leaflet';

interface InteractiveMapProps {
  hotels: Hotel[];
  selectedHotelId?: string | null;
  onSelectHotel?: (hotel: Hotel) => void;
  height?: string;
}

declare global {
  interface Window {
    google?: any;
    initGoogleMapCallback?: () => void;
  }
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  hotels,
  selectedHotelId,
  onSelectHotel,
  height = '560px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapType, setMapType] = useState<'google' | 'leaflet'>('google');
  const [mapMode, setMapMode] = useState<'roadmap' | 'satellite' | 'terrain'>('roadmap');
  const googleMapRef = useRef<any>(null);
  const googleMarkersRef = useRef<any[]>([]);
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletMarkersRef = useRef<{ [key: string]: L.Marker }>({});
  const { navigateTo } = useApp();

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyA83s0RvmuU8hZ2WkuJvEBp0kzM4Id5Quk';

  // Load Google Maps Script
  useEffect(() => {
    if (!googleApiKey) {
      setMapType('leaflet');
      return;
    }

    if (window.google && window.google.maps) {
      initGoogleMap();
      return;
    }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initGoogleMap();
      };
      script.onerror = () => {
        // Fallback to Leaflet if blocked or API error
        setMapType('leaflet');
      };
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initGoogleMap();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [googleApiKey]);

  // Initialize Google Maps
  const initGoogleMap = () => {
    if (!mapContainerRef.current || !window.google || !window.google.maps) {
      setMapType('leaflet');
      return;
    }

    try {
      setMapType('google');

      // Center of India
      const center = { lat: 21.5, lng: 78.9 };

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center,
        zoom: 5,
        mapTypeId: mapMode,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'simplified' }] },
          { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'simplified' }] }
        ],
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
      });

      googleMapRef.current = map;
      renderGoogleMarkers();
    } catch {
      setMapType('leaflet');
    }
  };

  const renderGoogleMarkers = () => {
    if (!googleMapRef.current || !window.google || !window.google.maps) return;

    // Clear existing google markers
    googleMarkersRef.current.forEach((m) => m.setMap(null));
    googleMarkersRef.current = [];

    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();

    hotels.forEach((hotel) => {
      const pos = { lat: hotel.location.lat, lng: hotel.location.lng };
      bounds.extend(pos);

      const isSelected = selectedHotelId === hotel.id;

      // Create Custom SVG Marker Icon
      const marker = new window.google.maps.Marker({
        position: pos,
        map: googleMapRef.current,
        title: hotel.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 12 : 9,
          fillColor: isSelected ? '#000000' : '#18181b',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const contentString = `
        <div style="width: 220px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2px;">
          <div style="height: 110px; border-radius: 8px; overflow: hidden; background: #000;">
            <img src="${hotel.heroImage}" alt="${hotel.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <div style="padding-top: 8px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #71717a;">${hotel.location.city}, ${hotel.location.state}</div>
            <div style="font-size: 13px; font-weight: 700; color: #09090b; margin-top: 2px;">${hotel.name}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; font-size: 11px;">
              <span style="font-weight: 700; color: #000;">★ ${hotel.ratings.overall.toFixed(1)}</span>
              <span style="color: #71717a; font-family: monospace;">${hotel.priceTier} · ${hotel.reviewCount} reviews</span>
            </div>
            <div style="margin-top: 8px; display: flex; gap: 4px;">
              <button id="gmap-view-${hotel.id}" style="flex: 1; padding: 5px; background: #09090b; color: #fff; border: none; border-radius: 4px; font-size: 10px; font-weight: 700; cursor: pointer;">
                VIEW STAY
              </button>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${hotel.location.lat},${hotel.location.lng}" target="_blank" rel="noreferrer" style="padding: 5px 8px; background: #f4f4f5; color: #18181b; border: 1px solid #e4e4e7; border-radius: 4px; font-size: 10px; font-weight: 700; text-decoration: none; display: flex; align-items: center;">
                📍 Directions
              </a>
            </div>
          </div>
        </div>
      `;

      marker.addListener('click', () => {
        if (onSelectHotel) onSelectHotel(hotel);
        infoWindow.setContent(contentString);
        infoWindow.open(googleMapRef.current, marker);

        window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          const btn = document.getElementById(`gmap-view-${hotel.id}`);
          if (btn) {
            btn.onclick = () => navigateTo('hotel-detail', hotel.slug);
          }
        });
      });

      googleMarkersRef.current.push(marker);
    });

    if (hotels.length > 0) {
      if (hotels.length === 1) {
        googleMapRef.current.setCenter({ lat: hotels[0].location.lat, lng: hotels[0].location.lng });
        googleMapRef.current.setZoom(13);
      } else {
        googleMapRef.current.fitBounds(bounds);
      }
    }
  };

  // Switch Google Map type (Roadmap / Satellite / Terrain)
  const handleToggleMapMode = (mode: 'roadmap' | 'satellite' | 'terrain') => {
    setMapMode(mode);
    if (googleMapRef.current) {
      googleMapRef.current.setMapTypeId(mode);
    }
  };

  // Initialize Leaflet fallback if Google Maps is in fallback mode
  useEffect(() => {
    if (mapType !== 'leaflet' || !mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 78.9],
        zoom: 5,
        minZoom: 4,
        maxZoom: 16,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;
    Object.values(leafletMarkersRef.current).forEach((m) => m.remove());
    leafletMarkersRef.current = {};

    const markerGroup = L.featureGroup();

    hotels.forEach((hotel) => {
      const isSelected = selectedHotelId === hotel.id;
      const markerHtml = `
        <div class="editorial-map-marker ${isSelected ? '!bg-neutral-950 ring-2 ring-white scale-125' : ''}" style="width: 48px; height: 26px;">
          ★ ${hotel.ratings.overall.toFixed(1)}
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [48, 26],
        iconAnchor: [24, 13],
      });

      const marker = L.marker([hotel.location.lat, hotel.location.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        if (onSelectHotel) onSelectHotel(hotel);
        navigateTo('hotel-detail', hotel.slug);
      });

      leafletMarkersRef.current[hotel.id] = marker;
      markerGroup.addLayer(marker);
    });

    if (hotels.length > 0 && map) {
      try {
        map.fitBounds(markerGroup.getBounds(), { padding: [40, 40], maxZoom: 12 });
      } catch {
        // ignore
      }
    }
  }, [mapType, hotels, selectedHotelId]);

  useEffect(() => {
    if (mapType === 'google' && googleMapRef.current) {
      renderGoogleMarkers();
    }
  }, [hotels, selectedHotelId]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-editorial-border shadow-elevated bg-neutral-900">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-10" />

      {/* Top Map Layer & Status Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
        <div className="bg-neutral-950/90 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700 text-xs font-mono flex items-center gap-1.5 shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Google Maps Active</span>
          <span className="text-neutral-500">•</span>
          <span className="font-bold">{hotels.length} Stays</span>
        </div>

        {/* Satellite / Roadmap / Terrain Toggles */}
        {mapType === 'google' && (
          <div className="hidden sm:flex items-center bg-white/95 backdrop-blur-md rounded-xl p-1 border border-neutral-300 shadow-subtle text-[11px] font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => handleToggleMapMode('roadmap')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${mapMode === 'roadmap' ? 'bg-neutral-950 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              Map
            </button>
            <button
              type="button"
              onClick={() => handleToggleMapMode('satellite')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${mapMode === 'satellite' ? 'bg-neutral-950 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => handleToggleMapMode('terrain')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${mapMode === 'terrain' ? 'bg-neutral-950 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              Terrain
            </button>
          </div>
        )}
      </div>

      {/* Direct Google Maps Directions Helper */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
        {hotels.length === 1 && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${hotels[0].location.lat},${hotels[0].location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-modal hover:bg-neutral-800 transition-colors border border-neutral-700"
          >
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Google Directions</span>
          </a>
        )}
      </div>
    </div>
  );
};
