import React from 'react';
import type { SocialPost } from '../../types';
import { ExternalLink, Play, ShieldCheck } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon } from '../common/Icons';

interface SocialMediaCardsProps {
  posts: SocialPost[];
  title?: string;
  subtitle?: string;
  hotelName?: string;
}

export const SocialMediaCards: React.FC<SocialMediaCardsProps> = ({
  posts,
  title = 'From the Community',
  subtitle = 'Authentic video reels, shorts & photo stories shared by real travellers who stayed here',
}) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Community Gallery & Dual Publicity
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            {subtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
          <span>Original Creators Credited</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-lg border border-editorial-border overflow-hidden hover:border-neutral-950 transition-all duration-300 shadow-subtle hover:shadow-elevated flex flex-col justify-between"
          >
            {/* Thumbnail with Monochrome -> Colour Interaction */}
            <div className="relative aspect-[9/13] w-full overflow-hidden bg-neutral-950">
              <img
                src={post.thumbnailUrl}
                alt={post.caption}
                className="w-full h-full object-cover mono-to-color-zoom"
                loading="lazy"
              />

              {/* Platform badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-950/85 text-white backdrop-blur-sm border border-neutral-700">
                  {post.platform === 'instagram' && <InstagramIcon className="w-3 h-3 text-pink-400" />}
                  {post.platform === 'youtube' && <YoutubeIcon className="w-3 h-3 text-red-500" />}
                  {post.platform === 'facebook' && <FacebookIcon className="w-3 h-3 text-blue-400" />}
                  <span className="capitalize">{post.platform} {post.contentType}</span>
                </span>
              </div>

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-neutral-950/70 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-neutral-950 transition-all">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {post.viewsCount && (
                <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                  {post.viewsCount} views
                </div>
              )}
            </div>

            {/* Creator Attribution & Caption */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {post.creatorAvatar ? (
                    <img
                      src={post.creatorAvatar}
                      alt={post.creatorName}
                      className="w-6 h-6 rounded-full object-cover grayscale border border-neutral-200"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center">
                      @
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block leading-tight">
                      @{post.creatorUsername}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      {post.creatorName}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 line-clamp-3 leading-relaxed">
                  “{post.caption}”
                </p>
              </div>

              {/* Direct External Link to Original Post */}
              <div className="pt-2 border-t border-neutral-100">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 transition-colors group/link"
                >
                  <span>View Original Post</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
