import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journalArticlesData';
import { useApp } from '../context/AppContext';
import { BookOpen, ChevronRight } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { navigateTo } = useApp();

  const featuredArticle = JOURNAL_ARTICLES[0];
  const otherArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-neutral-300" />
          <span>India Hotel Journal</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-950 tracking-tight">
          Editorial Travel Stories & Stays
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          In-depth architectural features, regional heritage stories, and curations written by slow-travel correspondents across India.
        </p>
      </div>

      {/* Featured Big Cover Article */}
      {featuredArticle && (
        <div
          onClick={() => navigateTo('journal-article', featuredArticle.slug)}
          className="group relative rounded-2xl overflow-hidden cursor-pointer border border-editorial-border hover:border-neutral-950 transition-all duration-300 shadow-elevated bg-neutral-950 grid grid-cols-1 lg:grid-cols-12 min-h-[440px]"
        >
          <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
            <img
              src={featuredArticle.coverImage}
              alt={featuredArticle.title}
              className="w-full h-full object-cover mono-to-color-zoom"
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span>{featuredArticle.publishDate}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 group-hover:text-neutral-600 transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-7 h-7 rounded-full object-cover grayscale"
                />
                <span className="text-xs font-bold text-neutral-900">{featuredArticle.author.name}</span>
              </div>

              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 group-hover:translate-x-1 transition-transform">
                Read Story <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Other Journal Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => navigateTo('journal-article', article.slug)}
            className="group bg-white rounded-xl border border-editorial-border overflow-hidden hover:border-neutral-950 transition-all duration-300 shadow-subtle hover:shadow-elevated cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-950">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover mono-to-color-zoom"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950 group-hover:text-neutral-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">{article.author.name}</span>
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-950 group-hover:translate-x-1 transition-transform">
                Read Article <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
