import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserProfile } from '../../types';
import { 
  X, 
  User, 
  ShieldCheck, 
  Mail, 
  Lock, 
  MapPin, 
  Camera, 
  LogIn, 
  UserPlus, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../common/Icons';

export const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
];

export const DEMO_REVIEWERS: UserProfile[] = [
  {
    id: 'usr-arjun',
    name: 'Arjun Menon',
    username: 'travelwitharjun',
    handle: '@travelwitharjun',
    bio: 'Architect & slow traveler documenting boutique heritage and coastal stays across India. Believer in real, unfiltered reviews.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    location: 'Bengaluru, Karnataka',
    reviewsCount: 15,
    photosCount: 44,
    socialPostsCount: 9,
    helpfulVotesReceived: 318,
    badges: [
      { id: 'top-reviewer', name: 'Top Reviewer', icon: '🏆', description: 'Over 10 highly rated detailed reviews' },
      { id: 'travel-creator', name: 'Travel Creator', icon: '🎥', description: 'Attached authentic verified video content' },
      { id: 'verified-reviewer', name: 'Verified Reviewer', icon: '✓', description: 'Consistently verified on-site check-ins' },
      { id: 'india-explorer', name: 'India Explorer', icon: '🧭', description: 'Reviewed stays across 4+ Indian states' },
    ],
    savedHotelIds: ['taj-lake-palace-udaipur', 'ananda-in-the-himalayas', 'the-machan-lonavala'],
    collections: [],
    connectedSocials: {
      instagram: 'travelwitharjun',
      youtube: 'arjunmenonvlogs',
      twitter: 'arjunmenon_in',
    },
  },
  {
    id: 'usr-priya',
    name: 'Priya Sharma',
    username: 'wanderwithpriya',
    handle: '@wanderwithpriya',
    bio: 'Travel content creator & heritage enthusiast. Exploring palace hotels, wellness retreats and coastal sanctuaries across India.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    location: 'Mumbai, Maharashtra',
    reviewsCount: 8,
    photosCount: 28,
    socialPostsCount: 6,
    helpfulVotesReceived: 184,
    badges: [
      { id: 'travel-creator', name: 'Travel Creator', icon: '🎥', description: 'Attached authentic verified video content' },
      { id: 'verified-reviewer', name: 'Verified Reviewer', icon: '✓', description: 'Consistently verified on-site check-ins' },
      { id: 'visual-storyteller', name: 'Visual Storyteller', icon: '📸', description: 'Uploaded 10+ authentic unfiltered guest stay photos' },
    ],
    savedHotelIds: ['taj-lake-palace-udaipur', 'samode-haveli-jaipur'],
    collections: [],
    connectedSocials: {
      instagram: 'wanderwithpriya',
      youtube: 'priyasharmavlogs',
    },
  },
  {
    id: 'usr-vikram',
    name: 'Vikram Joshi',
    username: 'vikram_j',
    handle: '@vikram_j',
    bio: 'Himalayan trekker and eco-lodge reviewer. Keen eye for hotel sustainability, noise levels and genuine local hospitality.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    location: 'Dehradun, Uttarakhand',
    reviewsCount: 11,
    photosCount: 35,
    socialPostsCount: 3,
    helpfulVotesReceived: 215,
    badges: [
      { id: 'top-reviewer', name: 'Top Reviewer', icon: '🏆', description: 'Over 10 highly rated detailed reviews' },
      { id: 'india-explorer', name: 'India Explorer', icon: '🧭', description: 'Reviewed stays across 4+ Indian states' },
    ],
    savedHotelIds: ['ananda-in-the-himalayas', 'the-machan-lonavala'],
    collections: [],
    connectedSocials: {
      instagram: 'vikramjoshi_trips',
    },
  },
];

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuthModal, loginAsUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'demo'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [bio, setBio] = useState('Passionate Indian explorer & authentic reviewer.');
  const [selectedAvatar, setSelectedAvatar] = useState(SAMPLE_AVATARS[0]);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Match by email or username if matching demo, or create logged-in session
    const matched = DEMO_REVIEWERS.find(
      (u) => u.username.toLowerCase() === loginEmail.toLowerCase() || u.handle.toLowerCase() === loginEmail.toLowerCase()
    );

    if (matched) {
      loginAsUser(matched);
    } else {
      const user: UserProfile = {
        id: `usr-${Date.now()}`,
        name: loginEmail.split('@')[0] || 'Community Reviewer',
        username: loginEmail.split('@')[0].toLowerCase() || 'reviewer',
        handle: `@${loginEmail.split('@')[0].toLowerCase() || 'reviewer'}`,
        bio: 'Passionate Indian explorer & authentic reviewer.',
        avatar: SAMPLE_AVATARS[0],
        location: 'Bengaluru, India',
        reviewsCount: 1,
        photosCount: 2,
        socialPostsCount: 0,
        helpfulVotesReceived: 12,
        badges: [
          { id: 'verified-reviewer', name: 'Verified Reviewer', icon: '✓', description: 'Consistently verified on-site check-ins' }
        ],
        savedHotelIds: [],
        collections: [],
        connectedSocials: {},
      };
      loginAsUser(user);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const cleanHandle = handle.startsWith('@') ? handle : `@${handle || name.toLowerCase().replace(/\s+/g, '')}`;
    const cleanUsername = cleanHandle.replace('@', '');
    const avatarUrl = customAvatarUrl.trim() || selectedAvatar;

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      username: cleanUsername,
      handle: cleanHandle,
      bio: bio.trim(),
      avatar: avatarUrl,
      location: location.trim(),
      reviewsCount: 0,
      photosCount: 0,
      socialPostsCount: 0,
      helpfulVotesReceived: 0,
      badges: [
        { id: 'verified-reviewer', name: 'Verified Reviewer', icon: '✓', description: 'Consistently verified on-site check-ins' }
      ],
      savedHotelIds: [],
      collections: [],
      connectedSocials: {
        instagram: instagram.trim() ? instagram.trim().replace('@', '') : undefined,
        youtube: youtube.trim() ? youtube.trim().replace('@', '') : undefined,
      },
    };

    loginAsUser(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl border border-neutral-300 max-w-lg w-full max-h-[92vh] flex flex-col shadow-modal overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-subtle">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Community Member Access
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                {mode === 'login' ? 'Sign In to Your Account' : mode === 'register' ? 'Join Verified Reviewers' : 'Quick Demo Profile Switcher'}
              </h2>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
            aria-label="Close auth dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-100/60 p-1.5 gap-1 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'login'
                ? 'bg-white text-neutral-950 shadow-subtle'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'register'
                ? 'bg-white text-neutral-950 shadow-subtle'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('demo')}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              mode === 'demo'
                ? 'bg-white text-neutral-950 shadow-subtle'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Demo Profiles</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {/* 1. SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="travelwitharjun or name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-subtle hover:shadow-elevated active:scale-95"
              >
                Sign In to Community
              </button>

              <div className="pt-3 border-t border-neutral-100 text-center">
                <button
                  type="button"
                  onClick={() => setMode('demo')}
                  className="text-xs text-neutral-600 hover:text-neutral-950 font-semibold underline"
                >
                  ⚡ Quick 1-click login with demo reviewers
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sneha Rao"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                    User Handle *
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@sneharaotravels"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sneha@example.com"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                  Location in India
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jaipur, Rajasthan or Bengaluru, Karnataka"
                    className="w-full pl-8 p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>

              {/* Profile Picture (PFP) Selector */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Choose Profile Picture (PFP)</span>
                  </label>
                  <span className="text-[10px] text-neutral-500 font-mono">Select or paste URL</span>
                </div>

                {/* Avatar Grid */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(av);
                        setCustomAvatarUrl('');
                      }}
                      className={`relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 transition-transform ${
                        selectedAvatar === av && !customAvatarUrl
                          ? 'border-neutral-950 scale-110 shadow-elevated'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="Or paste custom image URL: https://..."
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                  Short Traveler Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell fellow travellers about your travel style, favorite destinations in India..."
                  className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-950 leading-relaxed"
                />
              </div>

              {/* Connected Socials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="block text-[10px] text-neutral-600 mb-0.5 font-medium flex items-center gap-1">
                    <InstagramIcon className="w-3 h-3 text-neutral-700" />
                    Instagram Handle
                  </span>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="username"
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>

                <div>
                  <span className="block text-[10px] text-neutral-600 mb-0.5 font-medium flex items-center gap-1">
                    <YoutubeIcon className="w-3 h-3 text-neutral-700" />
                    YouTube Channel
                  </span>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="channelname"
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-subtle hover:shadow-elevated active:scale-95"
              >
                Create Account & Join Community
              </button>
            </form>
          )}

          {/* 3. DEMO PROFILES SWITCHER */}
          {mode === 'demo' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-600">
                Click any reviewer below to instantly switch session and test live community badges, review submissions, and personalized collections:
              </p>

              <div className="space-y-2.5">
                {DEMO_REVIEWERS.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => loginAsUser(user)}
                    className="group bg-neutral-50 hover:bg-neutral-950 hover:text-white p-3.5 rounded-xl border border-neutral-200 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover grayscale contrast-125 border border-neutral-300 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs">{user.name}</span>
                          <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-mono">
                            {user.handle}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 group-hover:text-neutral-300 line-clamp-1 mt-0.5">
                          {user.bio}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 group-hover:text-neutral-400 font-mono">
                          <span>{user.reviewsCount} reviews</span>
                          <span>•</span>
                          <span>{user.badges.length} badges</span>
                          <span>•</span>
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-full bg-white text-neutral-900 group-hover:bg-neutral-800 group-hover:text-white shrink-0 ml-2">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
