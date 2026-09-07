import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import type { TripType, SocialPost } from '../../types';
import { StarRating } from '../common/StarRating';
import { 
  X, 
  PenSquare, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Upload,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { uploadToCloudinary } from '../../utils/cloudinary';

export const WriteReviewModal: React.FC = () => {
  const { 
    writeReviewModalOpen, 
    closeWriteReviewModal, 
    targetHotelForReview, 
    hotels, 
    addReview,
    addCustomHotel,
    currentUser 
  } = useApp();

  // Selected Hotel
  const [selectedHotelId, setSelectedHotelId] = useState<string>(
    targetHotelForReview ? targetHotelForReview.id : hotels[0]?.id || ''
  );

  // Dynamic Hotel Search & Custom Entry state
  const [hotelSearchQuery, setHotelSearchQuery] = useState('');
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState('All');
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [customHotelName, setCustomHotelName] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [customState, setCustomState] = useState('');
  const [customCategory, setCustomCategory] = useState('Boutique');
  const [customPriceTier, setCustomPriceTier] = useState<'₹' | '₹₹' | '₹₹₹' | '₹₹₹₹'>('₹₹');

  // Stay Info
  const [tripType, setTripType] = useState<TripType>('Couple');
  const [roomType, setRoomType] = useState('Heritage Deluxe Room');
  const [nights, setNights] = useState<number>(2);
  const [checkInDate] = useState('2026-02-15');

  // Sub-Ratings
  const [overallRating, setOverallRating] = useState(5);
  const [roomsRating, setRoomsRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [locationRating, setLocationRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [valueRating, setValueRating] = useState(4);
  const [amenitiesRating, setAmenitiesRating] = useState(5);

  // Written Review
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [tipsForGuests, setTipsForGuests] = useState('');
  const [wouldStayAgain] = useState(true);

  // Photos
  const [guestPhotos, setGuestPhotos] = useState<string[]>([]);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingPhoto(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i]);
        urls.push(url);
      }
      setGuestPhotos((prev) => [...prev, ...urls]);
    } catch {
      // Handled
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Social Media Link Attachment (Dual Publicity)
  const [hasSocialLink, setHasSocialLink] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'youtube' | 'facebook'>('instagram');
  const [socialContentType, setSocialContentType] = useState<'reel' | 'video' | 'short' | 'post'>('reel');
  const [socialUrl, setSocialUrl] = useState('');
  const [creatorHandle, setCreatorHandle] = useState(currentUser.handle.replace('@', ''));
  const [socialCaption, setSocialCaption] = useState('');

  // Destination suggestions
  const suggestedDestinations = ['All', 'Udaipur', 'Goa', 'Bengaluru', 'Jaipur', 'Kerala', 'Lonavala', 'Rishikesh', 'Mumbai'];

  // Filtered hotels based on query and destination chip
  const filteredSuggestedHotels = hotels.filter((h) => {
    const matchQuery = hotelSearchQuery
      ? h.name.toLowerCase().includes(hotelSearchQuery.toLowerCase()) ||
        h.location.city.toLowerCase().includes(hotelSearchQuery.toLowerCase()) ||
        h.location.state.toLowerCase().includes(hotelSearchQuery.toLowerCase())
      : true;

    const matchDest = selectedDestinationFilter === 'All'
      ? true
      : h.location.city.toLowerCase().includes(selectedDestinationFilter.toLowerCase()) ||
        h.location.state.toLowerCase().includes(selectedDestinationFilter.toLowerCase());

    return matchQuery && matchDest;
  });

  const handleCreateCustomHotel = () => {
    if (!customHotelName.trim() || !customCity.trim()) return;
    const slug = customHotelName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = `custom-${Date.now()}`;
    const newHotel: any = {
      id: newId,
      slug,
      name: customHotelName.trim(),
      tagline: `Authentic ${customCategory} stay in ${customCity.trim()}`,
      location: {
        city: customCity.trim(),
        state: customState.trim() || 'India',
        region: 'North',
        address: `${customCity.trim()}, ${customState.trim() || 'India'}`,
        lat: 20.5937,
        lng: 78.9629,
      },
      ratings: {
        overall: 5.0,
        rooms: 5.0,
        cleanliness: 5.0,
        service: 5.0,
        location: 5.0,
        food: 5.0,
        value: 4.5,
        amenities: 4.5,
      },
      reviewCount: 0,
      priceTier: customPriceTier,
      priceRangeText: customPriceTier === '₹' ? '₹2,500 – ₹5,000 / night' : customPriceTier === '₹₹' ? '₹5,000 – ₹15,000 / night' : '₹15,000 – ₹35,000 / night',
      primaryCategory: customCategory as any,
      categories: [customCategory as any],
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
      officialPhotos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'],
      amenities: ['WiFi', 'Air Conditioning', 'Room Service'],
      bestSuitedFor: ['Travellers & Explorers'],
      realityCheck: {
        positives: ['Freshly added Indian stay for community reviews'],
        notable: ['Community reviews are currently gathering'],
        drawbacks: ['New listing pending full verification'],
      },
      guestsLove: ['Location', 'Hospitality'],
      guestsMention: ['Authentic Stay'],
      description: `A unique stay property located in ${customCity.trim()}, ${customState.trim()}.`,
      editorialVerdict: 'Community added property open for verified traveler reviews.',
      isClaimed: false,
      isVerified: true,
      trendingScore: 80,
      aiSummary: {
        summary: 'Newly submitted stay awaiting first wave of guest reviews.',
        positiveSentiment: 100,
        neutralSentiment: 0,
        negativeSentiment: 0,
      },
    };

    addCustomHotel(newHotel);
    setSelectedHotelId(newId);
    setShowAddCustomModal(false);
    setCustomHotelName('');
    setCustomCity('');
    setCustomState('');
  };

  if (!writeReviewModalOpen) return null;

  const currentSelectedHotel = hotels.find((h) => h.id === selectedHotelId);

  const handleAddPhoto = () => {
    if (!photoUrlInput.trim()) return;
    setGuestPhotos([...guestPhotos, photoUrlInput.trim()]);
    setPhotoUrlInput('');
  };

  const handleAddSamplePhoto = (sampleUrl: string) => {
    setGuestPhotos([...guestPhotos, sampleUrl]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !title.trim()) return;

    let attachedSocials: SocialPost[] | undefined = undefined;
    if (hasSocialLink && socialUrl) {
      attachedSocials = [
        {
          id: `sp-${Date.now()}`,
          hotelId: selectedHotelId,
          platform: socialPlatform,
          contentType: socialContentType,
          url: socialUrl,
          creatorUsername: creatorHandle || currentUser.username,
          creatorName: currentUser.name,
          creatorAvatar: currentUser.avatar,
          caption: socialCaption || title,
          thumbnailUrl:
            guestPhotos[0] ||
            currentSelectedHotel?.heroImage ||
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
          viewsCount: '1.2K',
          submissionDate: new Date().toISOString().split('T')[0],
          moderationStatus: 'approved',
        },
      ];
    }

    addReview({
      hotelId: selectedHotelId,
      hotelName: currentSelectedHotel?.name || 'Indian Hotel',
      checkInDate,
      roomType,
      nights: Number(nights),
      tripType,
      ratings: {
        overall: overallRating,
        rooms: roomsRating,
        cleanliness: cleanlinessRating,
        service: serviceRating,
        location: locationRating,
        food: foodRating,
        value: valueRating,
        amenities: amenitiesRating,
      },
      title,
      content,
      pros,
      cons,
      tipsForGuests,
      wouldStayAgain,
      guestPhotos,
      socialPosts: attachedSocials,
      isVerifiedStay: true,
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    closeWriteReviewModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl border border-neutral-300 max-w-3xl w-full max-h-[92vh] flex flex-col shadow-modal overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center">
              <PenSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Community Stay Verification
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Authentic Stay
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                Share Your Genuine Stay Experience
              </h2>
            </div>
          </div>

          <button
            onClick={closeWriteReviewModal}
            className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label="Close review dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* 1. DYNAMIC HOTEL & PLACE SELECTION */}
          <div className="space-y-3 bg-neutral-50/80 p-4 rounded-xl border border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                1. Select Hotel or Resort *
              </label>
              <button
                type="button"
                onClick={() => setShowAddCustomModal(!showAddCustomModal)}
                className="text-xs font-bold text-neutral-950 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>+ Add Unlisted Hotel in India</span>
              </button>
            </div>

            {/* Destination filter chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[10px] text-neutral-400 uppercase font-mono mr-1">Places:</span>
              {suggestedDestinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setSelectedDestinationFilter(dest)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    selectedDestinationFilter === dest
                      ? 'bg-neutral-950 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={hotelSearchQuery}
              onChange={(e) => setHotelSearchQuery(e.target.value)}
              placeholder="Type to filter hotels by name or city (e.g. Taj, Leela, Goa, Jaipur)..."
              className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs focus:outline-none focus:border-neutral-950 font-medium"
            />

            {/* Suggestions Carousel / Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredSuggestedHotels.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotelId(h.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedHotelId === h.id
                      ? 'bg-white border-neutral-950 ring-2 ring-neutral-950/10 shadow-subtle'
                      : 'bg-white/70 hover:bg-white border-neutral-200'
                  }`}
                >
                  <img
                    src={h.heroImage}
                    alt={h.name}
                    className="w-12 h-12 rounded object-cover shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-neutral-950 truncate">{h.name}</span>
                      {selectedHotelId === h.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono block truncate">
                      {h.location.city}, {h.location.state} · {h.priceTier}
                    </span>
                  </div>
                </div>
              ))}

              {filteredSuggestedHotels.length === 0 && (
                <div className="col-span-2 p-3 text-center text-xs text-neutral-500 bg-white rounded-lg border border-dashed border-neutral-300 space-y-1">
                  <p>No listed stay matches "{hotelSearchQuery}".</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomHotelName(hotelSearchQuery);
                      setShowAddCustomModal(true);
                    }}
                    className="text-xs font-bold text-neutral-950 underline"
                  >
                    Click to add "{hotelSearchQuery}" as a new stay in India
                  </button>
                </div>
              )}
            </div>

            {/* Inline Custom Unlisted Place Adder */}
            {showAddCustomModal && (
              <div className="bg-white p-4 rounded-xl border border-neutral-300 space-y-3 pt-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Add New Property in India</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddCustomModal(false)}
                    className="text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <span className="block text-[10px] text-neutral-600 font-semibold mb-1">Hotel / Resort Name *</span>
                    <input
                      type="text"
                      value={customHotelName}
                      onChange={(e) => setCustomHotelName(e.target.value)}
                      placeholder="e.g. Wildflower Hall"
                      className="w-full p-2 border border-neutral-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-600 font-semibold mb-1">City / Town *</span>
                    <input
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="e.g. Shimla"
                      className="w-full p-2 border border-neutral-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-600 font-semibold mb-1">State in India</span>
                    <input
                      type="text"
                      value={customState}
                      onChange={(e) => setCustomState(e.target.value)}
                      placeholder="e.g. Himachal Pradesh"
                      className="w-full p-2 border border-neutral-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-600 font-semibold mb-1">Stay Category</span>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    >
                      <option value="Heritage">Heritage</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Boutique">Boutique</option>
                      <option value="Mountain Retreat">Mountain Retreat</option>
                      <option value="Beach Resort">Beach Resort</option>
                      <option value="Homestay">Homestay</option>
                      <option value="Wellness & Spa">Wellness & Spa</option>
                      <option value="Budget">Budget</option>
                    </select>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-600 font-semibold mb-1">Price Tier</span>
                    <select
                      value={customPriceTier}
                      onChange={(e) => setCustomPriceTier(e.target.value as any)}
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white font-mono font-bold"
                    >
                      <option value="₹">₹ (Budget &lt;₹5k)</option>
                      <option value="₹₹">₹₹ (Mid-Range ₹5k–₹15k)</option>
                      <option value="₹₹₹">₹₹₹ (Luxury ₹15k–₹35k)</option>
                      <option value="₹₹₹₹">₹₹₹₹ (Ultra-Luxury &gt;₹35k)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomModal(false)}
                    className="px-3 py-1.5 border border-neutral-300 rounded text-xs text-neutral-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateCustomHotel}
                    disabled={!customHotelName.trim() || !customCity.trim()}
                    className="px-4 py-1.5 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-50"
                  >
                    Add & Select Place
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Stay Metadata */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
              2. Stay Details & Trip Type
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block text-neutral-600 text-xs mb-1 font-medium">Trip Type</span>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value as TripType)}
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950 bg-white"
                >
                  <option value="Couple">Couple</option>
                  <option value="Family">Family</option>
                  <option value="Solo">Solo</option>
                  <option value="Friends">Friends</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div>
                <span className="block text-neutral-600 text-xs mb-1 font-medium">Room Type Booked</span>
                <input
                  type="text"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="e.g. Garden Suite / Deluxe"
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <span className="block text-neutral-600 text-xs mb-1 font-medium">Nights Stayed</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>
            </div>
          </div>

          {/* 3. Detailed Ratings */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                3. Detailed Category Ratings (1 to 5 Stars)
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">Click stars to rate</span>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Overall */}
              <div className="sm:col-span-2 pb-2 border-b border-neutral-200 flex items-center justify-between">
                <span className="font-bold text-neutral-950 text-sm">Overall Experience *</span>
                <StarRating rating={overallRating} size="lg" interactive onChange={setOverallRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Rooms & Comfort</span>
                <StarRating rating={roomsRating} size="sm" interactive onChange={setRoomsRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Cleanliness & Hygiene</span>
                <StarRating rating={cleanlinessRating} size="sm" interactive onChange={setCleanlinessRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Service & Staff Hospitality</span>
                <StarRating rating={serviceRating} size="sm" interactive onChange={setServiceRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Location & Surroundings</span>
                <StarRating rating={locationRating} size="sm" interactive onChange={setLocationRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Food & Breakfast Quality</span>
                <StarRating rating={foodRating} size="sm" interactive onChange={setFoodRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Value for Money</span>
                <StarRating rating={valueRating} size="sm" interactive onChange={setValueRating} showNumber />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-700 font-medium">Amenities & Facilities</span>
                <StarRating rating={amenitiesRating} size="sm" interactive onChange={setAmenitiesRating} showNumber />
              </div>
            </div>
          </div>

          {/* 4. Written Review */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
              4. Written Stay Experience *
            </label>

            <div>
              <span className="block text-neutral-600 text-xs mb-1 font-medium">Review Headline *</span>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Breathtaking lake views and warm Rajasthani hospitality"
                className="w-full px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:border-neutral-950 font-medium"
              />
            </div>

            <div>
              <span className="block text-neutral-600 text-xs mb-1 font-medium">
                Tell future travellers what staying here was actually like *
              </span>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your check-in experience, room noise levels, staff attention, breakfast quality, property atmosphere, or standout moments..."
                className="w-full p-3 border border-neutral-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-neutral-950 leading-relaxed"
              />
            </div>

            {/* Prompt helpers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="block text-emerald-800 text-xs mb-1 font-semibold">What did you like?</span>
                <input
                  type="text"
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  placeholder="e.g. Flute player on sunset boat, quiet garden suites"
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>

              <div>
                <span className="block text-rose-800 text-xs mb-1 font-semibold">What could be improved?</span>
                <input
                  type="text"
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  placeholder="e.g. Valet queue during 7 PM rush, limited dessert choices"
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>
            </div>

            <div>
              <span className="block text-neutral-700 text-xs mb-1 font-semibold">
                Advice / Tip for future guests
              </span>
              <input
                type="text"
                value={tipsForGuests}
                onChange={(e) => setTipsForGuests(e.target.value)}
                placeholder="e.g. Request room on the 2nd floor facing the lake for quiet nights"
                className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
              />
            </div>
          </div>

          {/* 5. Guest Photos Upload */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                5. Upload Real Guest Photos (Authenticity)
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">Unfiltered photos</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                placeholder="Paste real image URL or upload directly..."
                className="flex-1 p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3 py-2 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300 rounded text-xs font-semibold"
              >
                Add URL
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="px-4 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-neutral-800 flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isUploadingPhoto ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick sample buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-neutral-500">Quick Samples:</span>
              <button
                type="button"
                onClick={() =>
                  handleAddSamplePhoto(
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
                  )
                }
                className="text-[11px] px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded border border-neutral-200"
              >
                + Lake Courtyard Photo
              </button>
              <button
                type="button"
                onClick={() =>
                  handleAddSamplePhoto(
                    'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80'
                  )
                }
                className="text-[11px] px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded border border-neutral-200"
              >
                + Poolside Photo
              </button>
            </div>

            {/* Preview of uploaded photos */}
            {guestPhotos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {guestPhotos.map((photo, i) => (
                  <div key={i} className="relative w-20 h-16 rounded overflow-hidden border border-neutral-300">
                    <img src={photo} alt="Uploaded preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGuestPhotos(guestPhotos.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full p-0.5 hover:bg-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Dual-Publicity: Attach Social Media Content */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
                  6. Attach Social Media Content (Dual Publicity)
                </label>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSocialLink}
                  onChange={(e) => setHasSocialLink(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-950"></div>
              </label>
            </div>

            <p className="text-xs text-neutral-500">
              Did you post an Instagram Reel, YouTube Video, or Facebook Post about your stay? Link it here to receive creator exposure and help travelers see the hotel in action!
            </p>

            {hasSocialLink && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-neutral-600 text-xs mb-1 font-medium">Platform</span>
                    <select
                      value={socialPlatform}
                      onChange={(e) =>
                        setSocialPlatform(e.target.value as 'instagram' | 'youtube' | 'facebook')
                      }
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-neutral-600 text-xs mb-1 font-medium">Content Format</span>
                    <select
                      value={socialContentType}
                      onChange={(e) =>
                        setSocialContentType(e.target.value as 'reel' | 'video' | 'short' | 'post')
                      }
                      className="w-full p-2 border border-neutral-300 rounded text-xs bg-white"
                    >
                      <option value="reel">Reel</option>
                      <option value="video">Full Video</option>
                      <option value="short">Short / Story</option>
                      <option value="post">Photo Post</option>
                    </select>
                  </div>

                  <div>
                    <span className="block text-neutral-600 text-xs mb-1 font-medium">Your Social Handle</span>
                    <div className="flex items-center">
                      <span className="px-2 py-2 bg-neutral-200 text-neutral-700 rounded-l text-xs border border-r-0 border-neutral-300">
                        @
                      </span>
                      <input
                        type="text"
                        value={creatorHandle}
                        onChange={(e) => setCreatorHandle(e.target.value)}
                        placeholder="travelcreator"
                        className="w-full p-2 border border-neutral-300 rounded-r text-xs focus:outline-none focus:border-neutral-950"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="block text-neutral-600 text-xs mb-1 font-medium">Public Post URL *</span>
                  <input
                    type="url"
                    value={socialUrl}
                    onChange={(e) => setSocialUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/C-xyz123... or YouTube link"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <span className="block text-neutral-600 text-xs mb-1 font-medium">Video Caption / Title</span>
                  <input
                    type="text"
                    value={socialCaption}
                    onChange={(e) => setSocialCaption(e.target.value)}
                    placeholder="e.g. 3 Days in Jaipur: Living like royalty at Samode Haveli ✨"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Publishing as <strong>{currentUser.name}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeWriteReviewModal}
              className="px-4 py-2 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-subtle hover:shadow-elevated active:scale-95"
            >
              Publish Genuine Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
