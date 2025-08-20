'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumb, Pagination } from '@/components/ui/navigation';
import { NewsItem, NewsSidebar } from '@/components/features/news';
import { NewsSummary } from '@/types';
import { fetchAllNews, NewsArticle } from '@/services/news';
import Loading from '@/components/ui/feedback/Loading';
import { EmptyState } from '@/components/shared/empty-states';
import { formatRelativeTime } from '@/utils/format';

const NewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Fetch news data
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAllNews(currentPage, itemsPerPage, 'LATEST', false, true);
        console.log('News API response:', response);
        setNewsData(response.data || []);
        setTotalPages(response.pageCount || 0);
        setTotalItems(response.total || 0);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage]);

  // Generate sidebar articles from main news data
  const sidebarArticles: NewsSummary[] = newsData
    .slice(0, 5)
    .map(article => ({
      id: article.id,
      title: article.title,
      publishedAt: new Date(article.published_at)
    }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-10">
        <div className="bg-gray-50 p-3">
          <div className="responsive-container mx-auto px-4">
            <Breadcrumb
              separator=">"
              className="text-sm"
              items={[
                {
                  title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <Link href="/news" className="text-gray-600 hover:text-blue-600">Tin tức</Link>,
                }
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <h1 className="text-3xl font-font-medium text-[#1D1D44] py-6">
            Tin tức bất động sản
          </h1>
          <div className="flex justify-center items-center py-20">
            <Loading className="bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white pb-10">
        <div className="bg-gray-50 p-3">
          <div className="responsive-container mx-auto px-4">
            <Breadcrumb
              separator=">"
              className="text-sm"
              items={[
                {
                  title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <Link href="/news" className="text-gray-600 hover:text-blue-600">Tin tức</Link>,
                }
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <h1 className="text-3xl font-font-medium text-[#1D1D44] py-6">
            Tin tức bất động sản
          </h1>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-500 mb-4">{error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* Breadcrumb */}
      <div className="bg-gray-50 p-3">
        <div className="responsive-container mx-auto px-4">
          <Breadcrumb
            separator=">"
            className="text-sm"
            items={[
              {
                title: <Link href="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
              },
              {
                title: <Link href="/news" className="text-gray-600 hover:text-blue-600">Tin tức</Link>,
              }
            ]}
          />
        </div>
      </div>
      <div className="responsive-container mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-font-medium text-[#1D1D44] py-6">
          Tin tức bất động sản
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white">
              {(() => {
                console.log('News data length:', newsData.length);
                if (newsData.length === 0) {
                  return (
                    <div className="py-20">
                      <EmptyState 
                        title="Chưa có tin tức"
                        description="Hiện tại chưa có tin tức nào để hiển thị"
                        type="default"
                      />
                    </div>
                  );
                }
                
                return (
                  <>
                    {/* News List */}
                    <div className="divide-y divide-gray-100">
                      {newsData.map((article) => (
                        <NewsItem key={article.id} article={article} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-8">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NewsSidebar
              title="Bài viết xem nhiều nhất"
              articles={sidebarArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;