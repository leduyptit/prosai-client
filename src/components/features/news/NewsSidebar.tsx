'use client';

import React from 'react';
import Link from 'next/link';
import { NewsSummary } from '@/types';
import { ShortIdUtil } from '@/utils/uuid';

interface NewsSidebarProps {
  title?: string;
  articles: NewsSummary[];
  className?: string;
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({
  title = "Bài viết liên quan",
  articles,
  className = ''
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg border border-[#EBEBEB] ${className}`}>
      <h3 className="text-lg font-font-medium text-[#1D1D44] border-b border-[#EBEBEB] p-4 text-center">
        {title}
      </h3>
      
      <div className="py-2">
        {articles.map((article, index) => {
          const border = index === articles.length - 1 ? "" : "border-b border-[#EBEBEB]";
          return (
            <Link
              key={article.id}
              href={article.url || `/news/${ShortIdUtil.encode(article.id)}`}
              className="block hover:bg-gray-50 p-2 rounded transition-colors duration-200"
            >
            <div className={`flex items-start gap-1 ${border} pb-2`}>
              <img src="/svgs/Polygon_6.svg" alt="news" className="w-4 h-4 mt-1"/>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-[#8D8DA1]">Ngày đăng: {formatDate(new Date(article.publishedAt))}</p>
              </div>
            </div>
          </Link>
          )
        })}
      </div>
    </div>
  );
};

export default NewsSidebar;
