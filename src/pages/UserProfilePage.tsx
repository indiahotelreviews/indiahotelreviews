import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ReviewCard } from '../components/review/ReviewCard';
import { SocialMediaCards } from '../components/hotel/SocialMediaCards';
import { InstagramIcon, YoutubeIcon, TwitterIcon } from '../components/common/Icons';
import { computeUserBadgesWithProgress } from '../utils/badgeSystem';
import { SAMPLE_AVATARS } from '../components/auth/AuthModal';
import { uploadToCloudinary } from '../utils/cloudinary';
import { 
  Award, 
  MapPin, 
  PenSquare, 
  ShieldCheck, 
  Edit3, 
  X, 
  Camera, 
  CheckCircle2, 
  Lock, 
  LogOut,
  Upload,
  Loader2
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    reviews, 
    socialPosts, 
    openWriteReviewModal,
    openAuthModal,
    logout 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'reviews' | 'photos' | 'social' | 'badges'>('reviews');
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(currentUser.name);
  const [editHandle, setEditHandle] = useState(currentUser.handle);
  const [editLocation, setEditLocation] = useState(currentUser.location);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [isUploadingPfp, setIsUploadingPfp] = useState(false);
  const pfpFileInputRef = useRef<HTMLInputElement>(null);
  const [editInstagram, setEditInstagram] = useState(currentUser.connectedSocials.instagram || '');
  const [editYoutube, setEditYoutube] = useState(currentUser.connectedSocials.youtube || '');
  const [editTwitter, setEditTwitter] = useState(currentUser.connectedSocials.twitter || '');

  const handlePfpUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPfp(true);
    try {
      const url = await uploadToCloudinary(file);
      setCustomAvatarInput(url);
      setEditAvatar(url);
    } catch {
      // Handled
    } finally {
      setIsUploadingPfp(false);
      if (pfpFileInputRef.current) pfpFileInputRef.current.value = '';
    }
  };

  const myReviews = reviews.filter((r) => r.userId === currentUser.id);
  const mySocialPosts = socialPosts.filter((p) => p.creatorUsername === currentUser.username || p.creatorUsername === currentUser.handle.replace('@', ''));
  const allMyPhotos = myReviews.flatMap((r) => r.guestPhotos || []);

  // Compute dynamic badge progress
  const { unlockedBadges, allBadgeProgress } = computeUserBadgesWithProgress(
    myReviews,
    mySocialPosts,
    {
      reviewsCount: currentUser.reviewsCount,
      photosCount: currentUser.photosCount,
      socialPostsCount: currentUser.socialPostsCount,
      helpfulVotesReceived: currentUser.helpfulVotesReceived,
    }
  );

  const handleOpenEdit = () => {
    setEditName(currentUser.name);
    setEditHandle(currentUser.handle);
    setEditLocation(currentUser.location);
    setEditBio(currentUser.bio);
    setEditAvatar(currentUser.avatar);
    setCustomAvatarInput('');
    setEditInstagram(currentUser.connectedSocials.instagram || '');
    setEditYoutube(currentUser.connectedSocials.youtube || '');
    setEditTwitter(currentUser.connectedSocials.twitter || '');
    setEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAvatar = customAvatarInput.trim() || editAvatar;
    const finalHandle = editHandle.startsWith('@') ? editHandle : `@${editHandle}`;
    
    updateUserProfile({
      name: editName.trim(),
      handle: finalHandle,
      username: finalHandle.replace('@', ''),
      location: editLocation.trim(),
      bio: editBio.trim(),
      avatar: finalAvatar,
      badges: unlockedBadges,
      connectedSocials: {
        instagram: editInstagram.trim() ? editInstagram.trim().replace('@', '') : undefined,
        youtube: editYoutube.trim() ? editYoutube.trim().replace('@', '') : undefined,
        twitter: editTwitter.trim() ? editTwitter.trim().replace('@', '') : undefined,
      },
    });

    setEditModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-editorial-border p-6 sm:p-10 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover grayscale contrast-125 border-2 border-neutral-900 shadow-subtle"
              />
              <button
                onClick={handleOpenEdit}
                className="absolute inset-0 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Change Profile Picture"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950">
                  {currentUser.name}
                </h1>
                <span title="Verified Reviewer Account">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                <span>{currentUser.handle}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {currentUser.location}
                </span>
              </div>

              {/* Connected Socials */}
              <div className="flex items-center gap-3 pt-1 text-xs text-neutral-600">
                {currentUser.connectedSocials.instagram && (
                  <a
                    href={`https://instagram.com/${currentUser.connectedSocials.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-neutral-950 font-medium"
                  >
                    <InstagramIcon className="w-3.5 h-3.5 text-neutral-700" />
                    @{currentUser.connectedSocials.instagram}
                  </a>
                )}
                {currentUser.connectedSocials.youtube && (
                  <a
                    href={`https://youtube.com/@${currentUser.connectedSocials.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-neutral-950 font-medium"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5 text-neutral-700" />
                    {currentUser.connectedSocials.youtube}
                  </a>
                )}
                {currentUser.connectedSocials.twitter && (
                  <a
                    href={`https://twitter.com/${currentUser.connectedSocials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-neutral-950 font-medium"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-neutral-700" />
                    @{currentUser.connectedSocials.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenEdit}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 rounded-lg text-xs font-bold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={openAuthModal}
              className="px-3 py-2.5 border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors"
              title="Switch Account"
            >
              Switch User
            </button>

            <button
              onClick={() => openWriteReviewModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-subtle"
            >
              <PenSquare className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal max-w-2xl">
          {currentUser.bio}
        </p>

        {/* Community Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
            <span className="font-mono text-2xl font-bold text-neutral-950 block">
              {currentUser.reviewsCount}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Stay Reviews
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
            <span className="font-mono text-2xl font-bold text-neutral-950 block">
              {currentUser.photosCount}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Real Photos
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
            <span className="font-mono text-2xl font-bold text-neutral-950 block">
              {currentUser.socialPostsCount}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Social Reels
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-center">
            <span className="font-mono text-2xl font-bold text-emerald-800 block">
              {currentUser.helpfulVotesReceived}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Helpful Votes
            </span>
          </div>
        </div>

        {/* Dynamic Community Reputation Badges */}
        <div className="pt-4 border-t border-neutral-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Community Reputation Badges ({unlockedBadges.length} Unlocked)</span>
            </div>
            <button
              onClick={() => setActiveTab('badges')}
              className="text-xs text-neutral-500 hover:text-neutral-900 font-mono underline"
            >
              View All Milestones
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allBadgeProgress.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  badge.isUnlocked
                    ? 'bg-neutral-950 text-white border-neutral-800 shadow-subtle'
                    : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                }`}
              >
                <span className={`text-2xl shrink-0 ${badge.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                  {badge.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{badge.name}</span>
                    {badge.isUnlocked ? (
                      <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Unlocked</span>
                    ) : (
                      <span className="text-[9px] font-mono text-neutral-400 font-bold">
                        {badge.currentValue}/{badge.targetValue}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight mt-0.5 line-clamp-2">
                    {badge.description}
                  </p>
                  {!badge.isUnlocked && (
                    <div className="mt-2 h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full"
                        style={{ width: `${Math.min(100, (badge.currentValue / badge.targetValue) * 100)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          My Reviews ({myReviews.length})
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
            activeTab === 'photos'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          My Uploaded Photos ({allMyPhotos.length})
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
            activeTab === 'social'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Attached Social Reels ({mySocialPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
            activeTab === 'badges'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Badge System ({unlockedBadges.length}/{allBadgeProgress.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {myReviews.length === 0 ? (
              <div className="p-12 text-center text-neutral-500 bg-neutral-50 rounded-xl text-xs space-y-3">
                <p>You haven't written any reviews yet. Share your genuine Indian hotel experience!</p>
                <button
                  onClick={() => openWriteReviewModal()}
                  className="px-4 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  Write Your First Review
                </button>
              </div>
            ) : (
              myReviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {allMyPhotos.length === 0 ? (
              <div className="col-span-4 p-12 text-center text-neutral-500 bg-neutral-50 rounded-xl text-xs">
                No guest photos uploaded yet. Attach real photos when submitting reviews.
              </div>
            ) : (
              allMyPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="group aspect-[4/3] rounded-lg overflow-hidden bg-neutral-950 border border-neutral-200 shadow-subtle"
                >
                  <img
                    src={photo}
                    alt="Guest upload"
                    className="w-full h-full object-cover mono-to-color-zoom"
                  />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'social' && (
          <SocialMediaCards
            posts={mySocialPosts}
            title="My Shared Social Media Content"
            subtitle="Posts and reels linked to your reviews with creator attribution"
          />
        )}

        {activeTab === 'badges' && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-6 shadow-subtle">
            <div>
              <h3 className="font-serif text-xl font-bold text-neutral-950">
                Community Reputation & Milestone Badges
              </h3>
              <p className="text-xs text-neutral-500">
                Earn authentic reputation badges by publishing verified stays, helpful guest tips, unfiltered photography, and social reels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allBadgeProgress.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${
                    badge.isUnlocked
                      ? 'bg-neutral-950 text-white border-neutral-900 shadow-subtle'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                  }`}
                >
                  <span className={`text-3xl shrink-0 ${badge.isUnlocked ? '' : 'grayscale opacity-40'}`}>
                    {badge.icon}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{badge.name}</span>
                      {badge.isUnlocked ? (
                        <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-neutral-500 font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          {badge.currentValue} / {badge.targetValue} {badge.unit}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${badge.isUnlocked ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {badge.description}
                    </p>

                    {!badge.isUnlocked && (
                      <div className="pt-1">
                        <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-neutral-900 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (badge.currentValue / badge.targetValue) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl border border-neutral-300 max-w-lg w-full p-6 shadow-modal space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-neutral-900" />
                <h3 className="font-serif text-xl font-bold text-neutral-950">
                  Edit Reviewer Profile
                </h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              {/* Profile Picture (PFP) */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                  Profile Picture (PFP)
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={customAvatarInput.trim() || editAvatar}
                    alt="PFP Preview"
                    className="w-14 h-14 rounded-full object-cover grayscale contrast-125 border-2 border-neutral-950 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {SAMPLE_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setEditAvatar(av);
                            setCustomAvatarInput('');
                          }}
                          className={`w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 transition-transform ${
                            editAvatar === av && !customAvatarInput ? 'border-neutral-950 scale-110' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="url"
                        value={customAvatarInput}
                        onChange={(e) => setCustomAvatarInput(e.target.value)}
                        placeholder="Paste image URL or upload..."
                        className="flex-1 p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                      />
                      
                      <input
                        type="file"
                        ref={pfpFileInputRef}
                        onChange={handlePfpUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => pfpFileInputRef.current?.click()}
                        disabled={isUploadingPfp}
                        className="px-3 py-2 bg-neutral-950 text-white rounded text-xs font-semibold hover:bg-neutral-800 flex items-center gap-1 shrink-0 disabled:opacity-50"
                      >
                        {isUploadingPfp ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1">
                    Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={editHandle}
                    onChange={(e) => setEditHandle(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 mb-1">
                  Traveler Bio
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-2.5 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950 leading-relaxed"
                />
              </div>

              {/* Social Handles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">Instagram</label>
                  <input
                    type="text"
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    placeholder="handle"
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">YouTube</label>
                  <input
                    type="text"
                    value={editYoutube}
                    onChange={(e) => setEditYoutube(e.target.value)}
                    placeholder="channel"
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">Twitter/X</label>
                  <input
                    type="text"
                    value={editTwitter}
                    onChange={(e) => setEditTwitter(e.target.value)}
                    placeholder="handle"
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 rounded text-xs font-bold uppercase tracking-wider text-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
