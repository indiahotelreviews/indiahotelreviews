import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journalArticlesData';
import { useApp } from '../context/AppContext';
import { HotelCard } from '../components/hotel/HotelCard';
import { ArrowLeft, Share2, BookOpen } from 'lucide-react';

export const JournalArticlePage: React.FC = () => {
  const { selectedArticleSlug, navigateTo, hotels, showToast } = useApp();

  const article =
    JOURNAL_ARTICLES.find((a) => a.slug === selectedArticleSlug) || JOURNAL_ARTICLES[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back link */}
      <button
        onClick={() => navigateTo('journal')}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Journal</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500">
          <span className="font-bold uppercase tracking-wider bg-neutral-900 text-white px-2 py-0.5 rounded text-[10px]">
            {article.tags[0]}
          </span>
          <span>•</span>
          <span>{article.publishDate}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight leading-[1.15]">
          {article.title}
        </h1>

        <p className="font-serif italic text-base sm:text-xl text-neutral-600 leading-relaxed">
          {article.subtitle}
        </p>

        {/* Author info & share bar */}
        <div className="flex items-center justify-between pt-4 border-y border-neutral-200">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover grayscale border border-neutral-300"
            />
            <div>
              <span className="font-bold text-sm text-neutral-900 block">{article.author.name}</span>
              <span className="text-xs text-neutral-500">{article.author.role}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="group rounded-2xl overflow-hidden bg-neutral-950 border border-editorial-border shadow-elevated aspect-[16/9]">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover mono-to-color-zoom"
        />
      </div>

      {/* Article Body */}
      <div className="space-y-8 text-neutral-800 leading-relaxed font-normal text-sm sm:text-base">
        {article.body.map((block, idx) => {
          if (block.type === 'paragraph') {
            return (
              <p key={idx} className="leading-relaxed">
                {block.text}
              </p>
            );
          }

          if (block.type === 'quote') {
            return (
              <blockquote
                key={idx}
                className="p-6 my-6 border-l-4 border-neutral-950 bg-neutral-50 font-serif italic text-lg text-neutral-900 leading-relaxed rounded-r-lg"
              >
                {block.text}
              </blockquote>
            );
          }

          if (block.type === 'subheading') {
            return (
              <h3
                key={idx}
                className="font-serif text-2xl font-bold text-neutral-950 pt-6 border-t border-neutral-100"
              >
                {block.text}
              </h3>
            );
          }

          if (block.type === 'hotel_embed' && block.hotelId) {
            const embeddedHotel = hotels.find((h) => h.id === block.hotelId);
            if (!embeddedHotel) return null;

            return (
              <div key={idx} className="my-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Featured Hotel in This Story</span>
                </div>
                <HotelCard hotel={embeddedHotel} variant="list" />
              </div>
            );
          }

          return null;
        })}
      </div>
    </article>
  );
};
