'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, Pagination } from '@/components/ui/navigation';
import { NewsItem, NewsSidebar } from '@/components/features/news';
import { NewsArticle, NewsSummary } from '@/types';

const NewsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mock news data
  const mockNewsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-15',
      author: 'Nguyễn Văn A',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-15',
      updated_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-14',
      author: 'Trần Thị B',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-14',
      updated_at: '2024-01-14'
    },
    {
      id: '3',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-13',
      author: 'Lê Văn C',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-13',
      updated_at: '2024-01-13'
    },
    {
      id: '4',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-12',
      author: 'Phạm Thị D',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-12',
      updated_at: '2024-01-12'
    },
    {
      id: '5',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-11',
      author: 'Hoàng Văn E',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-11',
      updated_at: '2024-01-11'
    },
    {
      id: '6',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-10',
      author: 'Vũ Thị F',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-10',
      updated_at: '2024-01-10'
    },
    {
      id: '7',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-07',
      author: 'Đỗ Văn G',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-07',
      updated_at: '2024-01-07'
    },
    {
      id: '8',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-06',
      author: 'Bùi Thị H',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-06',
      updated_at: '2024-01-06'
    },
    {
      id: '9',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-05',
      author: 'Ngô Văn I',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-05',
      updated_at: '2024-01-05'
    },
    {
      id: '10',
      title: 'Bất động sản Hà Nội tháng 2020: Những biến động mạnh mẽ trên thị trường Bắc Ninh',
      summary: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      image: '/images/imgdemo_new@2x.png',
      published_at: '2024-01-04',
      author: 'Đinh Thị J',
      content: 'Thị trường bất động sản Hà Nội trong tháng 2020 ghi nhận những biến động mạnh mẽ với nhiều dự án mới được công bố và giá cả có xu hướng tăng nhẹ so với cùng kỳ năm trước...',
      created_at: '2024-01-04',
      updated_at: '2024-01-04'
    }
  ];

  const mockSidebarArticles: NewsSummary[] = [
    {
      id: '101',
      title: 'Xu hướng đầu tư bất động sản 2024: Những cơ hội không thể bỏ lỡ',
      publishedAt: new Date('2024-01-20')
    },
    {
      id: '102',
      title: 'Giá nhà đất tại TP.HCM tiếp tục tăng trong quý I/2024',
      publishedAt: new Date('2024-01-19')
    },
    {
      id: '103',
      title: 'Thị trường chung cư Hà Nội: Nguồn cung khan hiếm, giá tăng mạnh',
      publishedAt: new Date('2024-01-18')
    },
    {
      id: '104',
      title: 'Bất động sản nghỉ dưỡng: Phân khúc sáng giá trong năm 2024',
      publishedAt: new Date('2024-01-17')
    },
    {
      id: '105',
      title: 'Luật Đất đai mới: Những thay đổi quan trọng cần biết',
      publishedAt: new Date('2024-01-16')
    }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(mockNewsArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = mockNewsArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
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
                {/* News List */}
                <div className="divide-y divide-gray-100">
                {currentArticles.map((article) => (
                    <NewsItem key={article.id} article={article} />
                ))}
                </div>
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
            <NewsSidebar
                title="Bài viết xem nhiều nhất"
                articles={mockSidebarArticles}
            />
            </div>
        </div>
        </div>
    </div>
  );
};

export default NewsPage;