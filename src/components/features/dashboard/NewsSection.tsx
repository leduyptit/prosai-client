'use client';

import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { NewsCategory, NewsArticle } from '@/services/news';
import { formatRelativeTime } from '@/utils/format';
import { EmptyState } from '@/components/shared/empty-states';
import { ShortIdUtil } from '@/utils/uuid';

interface NewsSectionProps {
  activeNewsTab: number;
  newsLoading: boolean;
  newsCategoriesLoading: boolean;
  newsCategories: NewsCategory[];
  newsData: NewsArticle[][];
  onNewsTabChange: (index: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  activeNewsTab,
  newsLoading,
  newsCategoriesLoading,
  newsCategories,
  newsData,
  onNewsTabChange
}) => {
  return (
    <div className="full-width bg-white py-16">
      <div className="responsive-container">
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-[#1D1D44] mb-2 border-l-5 border-[#1D1D44] pl-4">
            Tin tức BĐS
          </h2>
        </div>
        
        {/* News Tabs */}
        <div className="flex border-b-1 border-gray-200 mb-8">
          {newsCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onNewsTabChange(index)}
              disabled={newsLoading}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeNewsTab === index
                  ? 'text-[#1D1D44] border-b-3 border-[#005EBC]'
                  : 'text-[#8D8DA1] hover:text-[#1D1D44]'
              } ${newsLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* News Content */}
        {(newsLoading || newsCategoriesLoading) ? (
          // Loading state
          <div className="grid grid-cols-12 gap-6 relative">
            <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Đang tải tin tức...</p>
              </div>
            </div>
            
            {/* Main Article Skeleton */}
            <div className="col-span-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                  <div className="absolute top-4 left-4 bg-gray-300 w-20 h-6 rounded-full animate-pulse"></div>
                </div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4 animate-pulse"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Articles Skeleton */}
            <div className="col-span-6">
              <div className="space-y-2 pl-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-15 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (!newsData[activeNewsTab] || newsData[activeNewsTab].length === 0) ? (
          // Empty state - single EmptyState for entire section
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-12">
            <EmptyState 
              description="Chưa có tin tức nào trong danh mục này"
              type="default"
            />
          </div>
        ) : (
          // News content when data exists
          <div className="grid grid-cols-12 gap-6">
            {/* Main Article */}
            <div className="col-span-6">
              <div className="rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={newsData[activeNewsTab]?.[0]?.featured_image || "/images/imgdemo_new@2x.png"}
                    alt={newsData[activeNewsTab]?.[0]?.title || "Tin tức"}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {newsCategories[activeNewsTab]?.name || 'Tin tức'}
                  </div>
                </div>
                <div className="py-6">
                  <h3 className="text-xl font-medium mb-2">
                    <Link href={`/news/${newsData[activeNewsTab]?.[0]?.slug}-${ShortIdUtil.encode(newsData[activeNewsTab]?.[0]?.id || '')}`}>
                      {newsData[activeNewsTab]?.[0]?.title || 'Tiêu đề đang cập nhật...'}
                    </Link>
                  </h3>
                  <p className="mb-4">
                    {newsData[activeNewsTab]?.[0]?.summary || 'Nội dung đang cập nhật...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8D8DA1]">
                      {newsData[activeNewsTab]?.[0]?.published_at ? 
                        formatRelativeTime(newsData[activeNewsTab][0].published_at) : 
                        'Đang cập nhật'
                      }
                    </span>
                    <Button type="link" className="text-[#005EBC] p-0 h-auto">
                      Đọc thêm →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side Articles */}
            <div className="col-span-6">
              <div className="space-y-2 pl-4">
                {(newsData[activeNewsTab] || []).slice(1, 7).map((article: NewsArticle, index: number) => (
                  <div key={index}>
                    <div className="items-center border-b border-gray-200">
                      <h4 className="text-lg font-medium line-clamp-2">
                        <Link href={`/news/${article.slug}-${ShortIdUtil.encode(article.id)}`}>
                          {article.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#8D8DA1] mb-2">
                        {article.published_at ? 
                          formatRelativeTime(article.published_at) : 
                          'Đang cập nhật'
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* View More Button */}
        <div className="text-center mt-8 flex justify-center">
          <Link
            href="/news"
            className="px-8 py-3 text-[#005EBC] flex items-center gap-2"
            style={{
              borderRadius: '10px',
              border: '1px solid #EBEBEB',
            }}
          >
            {newsLoading ? 'Đang tải...' : 'Xem thêm'}
            <Image src="/svgs/Path 704.svg" alt="arrow-right" width={10} height={10} style={{
              transform: 'rotate(270deg)',
            }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
