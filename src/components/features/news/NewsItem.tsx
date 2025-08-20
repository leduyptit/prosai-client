'use client';

import React from 'react';
import Link from 'next/link';
import { NewsArticle } from '@/services/news';

interface NewsItemProps {
  article: NewsArticle;
  className?: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ article, className = '' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  return (
    <Link
      href={`/news/${article.id}`}
      className={`block hover:bg-gray-50 transition-colors duration-200 ${className}`}
    >
      <div className="flex gap-4 py-4 border-b border-gray-100 grid grid-cols-12 items-center">
        {/* Image */}
        <div className="flex-shrink-0 col-span-4">
          <img
            src={article.featured_image || '/images/imgdemo_new@2x.png'}
            alt={article.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg width='128' height='96' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='12' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3ENews Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 col-span-8">
          <span className="text-sm text-[#8D8DA1]">Ngày đăng: {formatDate(article.published_at)}</span>
          <h3 className="text-base font-font-medium text-[#1D1D44] transition-colors py-3">
            {article.title}
          </h3>
          <p className="text-sm text-[#1D1D44] mb-3 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsItem;
