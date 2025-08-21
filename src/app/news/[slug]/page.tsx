'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/navigation';
import { NewsSidebar } from '@/components/features/news';
import { fetchNewsDetail, fetchMostViewedNews, NewsArticle } from '@/services/news';
import Loading from '@/components/ui/feedback/Loading';
import { EmptyState } from '@/components/shared/empty-states';
import { APP_CONFIG } from '@/utils/env';
import { ShortIdUtil } from '@/utils/uuid';
import { formatDateTime } from '@/utils/format';

const NewsDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [sidebarArticles, setSidebarArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Parse slug and shortId from URL
  const slugWithId = params.slug as string;
  
  let shortId = '';
  let articleId = '';
  shortId = ShortIdUtil.extractFromSlug(slugWithId) || '';
  
  // Nếu có shortId nhưng không decode được (do reload page), 
  // thử sử dụng shortId làm articleId tạm thời
  articleId = ShortIdUtil.decode(shortId) || shortId;

  // Fetch article detail
  useEffect(() => {
    const loadArticleDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!articleId) {
          setError('Bài viết không tồn tại');
          setLoading(false);
          return;
        }
        
        // Use the extracted UUID to fetch article detail
        const articleData = await fetchNewsDetail(articleId);
        setArticle(articleData);
      } catch (err: any) {
        console.error('Failed to load article detail:', err);
        
        // Kiểm tra response status
        if (err?.response?.status === 400 || err?.status === 400) {
          setError('Bài viết không tồn tại');
        } else {
          setError('Không thể tải chi tiết bài viết. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      loadArticleDetail();
    } else {
      setError('Bài viết không tồn tại');
      setLoading(false);
    }
  }, [articleId]);

  // Fetch most viewed news for sidebar
  useEffect(() => {
    const loadMostViewedNews = async () => {
      try {
        setSidebarLoading(true);
        const mostViewedData = await fetchMostViewedNews(10);
        setSidebarArticles(mostViewedData);
      } catch (err) {
        console.error('Failed to load most viewed news:', err);
        setSidebarArticles([]);
      } finally {
        setSidebarLoading(false);
      }
    };

    loadMostViewedNews();
  }, []);

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
                },
                {
                  title: <span className="text-gray-900">Đang tải...</span>,
                },
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <div className="flex justify-center items-center py-20">
            <Loading className="bg-white" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
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
                },
                {
                  title: <span className="text-gray-900">Bài viết không tồn tại</span>,
                },
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <div className="flex justify-center items-center py-20">
            <EmptyState
              title="Bài viết không tồn tại"
              description={error || 'Không thể tìm thấy bài viết bạn yêu cầu'}
              actionText="Quay lại"
              onAction={() => router.push('/news')}
            />
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
              },
              {
                title: <span className="text-gray-900">{article.title}</span>,
              },
            ]}
          />
        </div>
      </div>

      <div className="responsive-container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white">
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#1D1D44] mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center text-sm text-[#8D8DA1] mb-4">
                  <span>Ngày đăng: {article.published_at ? formatDateTime(article.published_at) : 'Đang cập nhật'}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-6">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/imgdemo_new@2x.png";
                  }}
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-[#1D1D44] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content || 'Nội dung đang cập nhật...' }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-[#8D8DA1]">
                  <span>Bài viết được đăng bởi PROSAI</span>
                  <span>Lượt xem: {article.view_count || article.views || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <NewsSidebar
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

export default NewsDetailPage;
