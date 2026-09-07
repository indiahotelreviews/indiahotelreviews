import React, { useState } from 'react';
import type { Review } from '../../types';
import { useApp } from '../../context/AppContext';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Camera, 
  Users, 
  Sparkles, 
  Building2,
  ExternalLink,
  MessageSquare,
  Share2,
  X
} from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { 
    voteHelpful, 
    voteNotHelpful, 
    openReportModal, 
    showToast,
    addHotelResponse,
    currentUser 
  } = useApp();

  const [expanded, setExpanded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleShare = () => {
    if (navigator.clipboard) {
      const publicUrl = `${window.location.origin}${window.location.pathname}?hotel=${review.hotelId}&review=${review.id}`;
      navigator.clipboard.writeText(publicUrl);
      showToast('Public review deep-link copied to clipboard!', 'info');
    }
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addHotelResponse(
      review.hotelId,
      review.id,
      replyText,
      currentUser.name,
      'Hotel Representative'
    );
    setReplyText('');
    setShowReplyBox(false);
  };

  if (review.isReported) {
    return (
      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200 text-xs text-neutral-500 italic text-center">
        This review has been temporarily hidden pending moderation review.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-editorial-border p-6 md:p-7 shadow-subtle space-y-5 hover:border-neutral-400 transition-colors">
      {/* Review Header: User Info & Verification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover grayscale contrast-125 border border-neutral-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-neutral-900">{review.userName}</span>
              <span className="text-xs text-neutral-500 font-mono">@{review.userHandle}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
              {review.userLocation && <span>{review.userLocation}</span>}
              <span>•</span>
              <span>Stayed {review.checkInDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {review.isVerifiedStay ? (
            <Badge type="verified_stay" />
          ) : (
            <Badge type="community_review" />
          )}
        </div>
      </div>

      {/* Stay Metadata pill bar */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100">
        <div className="flex items-center gap-1 font-medium">
          <Users className="w-3.5 h-3.5 text-neutral-500" />
          <span>Trip: <strong>{review.tripType}</strong></span>
        </div>
        <span className="text-neutral-300">•</span>
        <div>
          Room: <strong>{review.roomType}</strong>
        </div>
        <span className="text-neutral-300">•</span>
        <div>
          Duration: <strong>{review.nights} nights</strong>
        </div>
      </div>

      {/* Star Rating & Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <StarRating rating={review.ratings.overall} size="md" />
          <span className="font-mono text-sm font-bold text-neutral-950">
            {review.ratings.overall.toFixed(1)}
          </span>
        </div>
        <h4 className="font-serif text-lg md:text-xl font-bold text-neutral-950">
          {review.title}
        </h4>
      </div>

      {/* Written Review Body */}
      <div className="text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-3 font-normal">
        <p className={!expanded && review.content.length > 300 ? 'line-clamp-4' : ''}>
          {review.content}
        </p>

        {review.content.length > 300 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-bold uppercase tracking-wider text-neutral-900 underline hover:text-neutral-600"
          >
            {expanded ? 'Show Less' : 'Read Full Stay Experience'}
          </button>
        )}
      </div>

      {/* Structured Prompts / Pros & Cons */}
      {(review.pros || review.cons || review.tipsForGuests) && (
        <div className="bg-neutral-50/80 rounded-lg p-4 space-y-2.5 border border-neutral-200/60 text-xs">
          {review.pros && (
            <div className="flex items-start gap-2">
              <span className="font-bold text-emerald-800 shrink-0">Liked:</span>
              <span className="text-neutral-700">{review.pros}</span>
            </div>
          )}
          {review.cons && (
            <div className="flex items-start gap-2">
              <span className="font-bold text-rose-800 shrink-0">Could improve:</span>
              <span className="text-neutral-700">{review.cons}</span>
            </div>
          )}
          {review.tipsForGuests && (
            <div className="flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tips for guests:</span>
              <span className="text-neutral-700">{review.tipsForGuests}</span>
            </div>
          )}
        </div>
      )}

      {/* Guest Photos attached to review */}
      {review.guestPhotos && review.guestPhotos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600">
            <Camera className="w-3.5 h-3.5" />
            <span>Photos by Guest ({review.guestPhotos.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {review.guestPhotos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImage(photo)}
                className="group w-24 h-20 rounded-md overflow-hidden bg-neutral-950 cursor-pointer border border-neutral-200"
              >
                <img
                  src={photo}
                  alt="Guest stay photo"
                  className="w-full h-full object-cover mono-to-color-zoom"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dual Publicity: Social Media Linked Posts ("See this stay in action") */}
      {review.socialPosts && review.socialPosts.length > 0 && (
        <div className="border border-neutral-200 bg-neutral-50/60 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>See this stay in action</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Original Creator Content</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {review.socialPosts.map((sp) => (
              <a
                key={sp.id}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social flex items-center gap-3 p-2 bg-white rounded-md border border-neutral-200 hover:border-neutral-900 transition-all shadow-subtle"
              >
                <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 bg-neutral-950">
                  <img
                    src={sp.thumbnailUrl}
                    alt={sp.caption}
                    className="w-full h-full object-cover mono-to-color"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-neutral-900 block truncate">
                    @{sp.creatorUsername}
                  </span>
                  <span className="text-[10px] text-neutral-500 block capitalize">
                    {sp.platform} {sp.contentType}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-900 group-hover/social:underline mt-0.5">
                    <span>Watch original post</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Official Hotel Management Response */}
      {review.hotelResponse && (
        <div className="bg-neutral-950 text-neutral-200 rounded-lg p-5 border border-neutral-800 space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Official Hotel Response
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              {review.hotelResponse.responseDate}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-neutral-300">
            {review.hotelResponse.responderName} · <span className="font-normal text-neutral-400">{review.hotelResponse.responderRole}</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed pt-1 italic font-serif">
            “{review.hotelResponse.content}”
          </p>
        </div>
      )}

      {/* Review Actions Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => voteHelpful(review.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
              review.userVotedHelpful
                ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Helpful ({review.helpfulVotes})</span>
          </button>

          <button
            onClick={() => voteNotHelpful(review.id)}
            className={`p-1.5 rounded-md border transition-colors ${
              review.userVotedNotHelpful
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border-neutral-200'
            }`}
            title="Not helpful"
          >
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3 text-neutral-500">
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="hover:text-neutral-900 transition-colors flex items-center gap-1 font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Respond as Hotel</span>
          </button>

          <button
            onClick={handleShare}
            className="hover:text-neutral-900 transition-colors flex items-center gap-1 font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={() =>
              openReportModal({
                type: 'review',
                id: review.id,
                title: review.title,
                hotelName: review.hotelName,
              })
            }
            className="hover:text-rose-700 transition-colors flex items-center gap-1 text-neutral-400"
            title="Report this review"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

      {/* Hotel Owner Reply Box */}
      {showReplyBox && (
        <form onSubmit={handleReplySubmit} className="pt-3 border-t border-neutral-200 space-y-3 bg-neutral-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Submit Official Hotel Management Response
            </span>
            <button
              type="button"
              onClick={() => setShowReplyBox(false)}
              className="text-neutral-400 hover:text-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <textarea
            rows={3}
            required
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Thank the guest or address specific points with courteous clarity..."
            className="w-full p-2.5 bg-white border border-neutral-300 rounded text-xs focus:outline-none focus:border-neutral-900"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReplyBox(false)}
              className="px-3 py-1.5 border border-neutral-300 rounded text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-neutral-950 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
            >
              Post Hotel Response
            </button>
          </div>
        </form>
      )}

      {/* Lightbox for guest photos */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Guest stay enlarged"
            className="max-h-[85vh] max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
