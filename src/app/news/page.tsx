'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumb, Pagination } from '@/components/ui/navigation';
import { NewsItem, NewsSidebar } from '@/components/features/news';
import { fetchAllNews, fetchMostViewedNews, fetchNewsCategories, fetchNewsByCategory, NewsArticle, NewsCategory } from '@/services/news';
import Loading from '@/components/ui/feedback/Loading';
import { EmptyState } from '@/components/shared/empty-states';
import { APP_CONFIG } from '@/utils/env';
import { Select } from '@/components/ui/forms';
import { ShortIdUtil } from '@/utils/uuid';

const NewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('latest');

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoriesData = await fetchNewsCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fetch news data
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Determine sort type based on selected sort
        let sortType = 'LATEST';
        if (selectedSort === 'popular') sortType = 'POPULAR';
        if (selectedSort === 'oldest') sortType = 'OLDEST';
        
        let response;
        
        // If category is selected, fetch by category
        if (selectedCategory) {
          response = await fetchNewsByCategory(selectedCategory, currentPage, itemsPerPage, sortType.toLowerCase());
        } else {
          // Otherwise fetch all news
          response = await fetchAllNews(currentPage, itemsPerPage, sortType, false, true);
        }
        
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
  }, [currentPage, selectedSort, selectedCategory]);

  // Fetch most viewed news for sidebar
  useEffect(() => {
    const loadMostViewedNews = async () => {
      try {
        setSidebarLoading(true);
        const mostViewedData = await fetchMostViewedNews(10);
        setSidebarArticles(mostViewedData);
      } catch (err) {
        console.error('Failed to load most viewed news:', err);
        // Set empty array on error to prevent undefined errors
        setSidebarArticles([]);
      } finally {
        setSidebarLoading(false);
      }
    };

    loadMostViewedNews();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedArea, selectedSort]);

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
                  title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <Link href="/news" className="text-gray-600 hover:text-blue-600">Tin tức</Link>,
                }
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <h1 className="text-3xl font-medium text-[#1D1D44] py-4">
            Tin tức bất động sản
          </h1>
          <p className="text-gray-600 mt-2">Khám phá các tin tức bất động sản mới nhất và uy tín nhất</p>
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
                  title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <Link href="/news" className="text-gray-600 hover:text-blue-600">Tin tức</Link>,
                }
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <h1 className="text-3xl font-medium text-[#1D1D44] mb-2">
            Tin tức bất động sản
          </h1>
          <p className="text-gray-600 mt-2">Khám phá các tin tức bất động sản mới nhất và uy tín nhất</p>
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
                title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
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
        <h1 className="text-3xl font-medium text-[#1D1D44] py-4">
          Tin tức bất động sản
        </h1>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex-1 min-w-[200px]">
              <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                placeholder="Tất cả chủ đề"
                className="w-full"
                disabled={categoriesLoading}
              >
                <option value="">Tất cả chủ đề</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Area Filter */}
            <div className="flex-1 min-w-[200px]">
              <Select
                value={selectedArea}
                onChange={(value) => setSelectedArea(value)}
                placeholder="Khu vực"
                className="w-full"
              >
                <option value="all">Khu vực: Toàn quốc</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP. Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
                <option value="haiphong">Hải Phòng</option>
                <option value="cantho">Cần Thơ</option>
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="flex-1 min-w-[200px]">
              <Select
                value={selectedSort}
                onChange={(value) => setSelectedSort(value)}
                placeholder="Sắp xếp"
                className="w-full"
              >
                <option value="latest">Mới nhất</option>
                <option value="popular">Xem nhiều nhất</option>
                <option value="oldest">Cũ nhất</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
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
                      <div className="mt-4 border-t border-gray-100 pt-4">
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
          <div className="lg:col-span-4">
            <NewsSidebar
              className="mt-4"
              title="Bài viết xem nhiều nhất"
              articles={sidebarArticles.map(article => ({
                id: article.id,
                title: article.title,
                url: `/news/${article.slug}-${ShortIdUtil.encode(article.id)}`,
                publishedAt: new Date(article.published_at)
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;