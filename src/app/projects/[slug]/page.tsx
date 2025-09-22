'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/navigation';
import { projectService, Project } from '@/services/projectService';
import Loading from '@/components/ui/feedback/Loading';
import { EmptyState } from '@/components/shared/empty-states';
import { APP_CONFIG } from '@/utils/env';
import { formatCurrency, formatArea, formatDateTime } from '@/utils/format';
import { PROJECT_STATUS } from '@/constants';

const ProjectDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const projectId = params.slug as string;

  // Fetch project detail
  useEffect(() => {
    const loadProjectDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!projectId) {
          setError('Dự án không tồn tại');
          setLoading(false);
          return;
        }
        
        const projectData = await projectService.getProjectById(projectId);
        setProject(projectData);
      } catch (err: any) {
        console.error('Failed to load project detail:', err);
        
        if (err?.response?.status === 400 || err?.status === 400) {
          setError('Dự án không tồn tại');
        } else {
          setError('Không thể tải chi tiết dự án. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProjectDetail();
    } else {
      setError('Dự án không tồn tại');
      setLoading(false);
    }
  }, [projectId]);

  const getPriceRange = () => {
    if (project?.price_from && project?.price_to && 
        project.price_from !== '0.00' && project.price_to !== '0.00') {
      return `${formatCurrency(parseFloat(project.price_from))} - ${formatCurrency(parseFloat(project.price_to))}`;
    }
    if (project?.price_from && project.price_from !== '0.00') {
      return `Từ ${formatCurrency(parseFloat(project.price_from))}`;
    }
    return 'Liên hệ';
  };

  const getAreaText = () => {
    if (project?.area && project.area !== '0.00') {
      return formatArea(parseFloat(project.area));
    }
    return 'Chưa cập nhật';
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
                  title: <Link href={APP_CONFIG.homeUrl} className="text-gray-600 hover:text-blue-600">Trang chủ</Link>,
                },
                {
                  title: <Link href="/projects" className="text-gray-600 hover:text-blue-600">Dự án</Link>,
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

  if (error || !project) {
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
                  title: <Link href="/projects" className="text-gray-600 hover:text-blue-600">Dự án</Link>,
                },
                {
                  title: <span className="text-gray-900">Dự án không tồn tại</span>,
                },
              ]}
            />
          </div>
        </div>
        <div className="responsive-container mx-auto">
          <div className="flex justify-center items-center py-20">
            <EmptyState
              title="Dự án không tồn tại"
              description={error || 'Không thể tìm thấy dự án bạn yêu cầu'}
              actionText="Quay lại"
              onAction={() => router.push('/projects')}
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
                title: <Link href="/projects" className="text-gray-600 hover:text-blue-600">Dự án</Link>,
              },
              {
                title: <span className="text-gray-900">{project.name}</span>,
              },
            ]}
          />
        </div>
      </div>

       <div className="responsive-container mx-auto py-10">
         {/* Project Header - Full Width */}
         <div className="mb-6">
           <div className="flex items-center gap-2 mb-4">
             {project.is_featured && (
               <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                 Nổi bật
               </span>
             )}
             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
               {project.project_type || 'Chưa cập nhật'}
             </span>
           </div>
           <h1 className="text-3xl font-medium text-[#1D1D44] mb-4">
             {project.name}
           </h1>
           <div className="flex items-center text-sm text-[#8D8DA1] mb-4">
             <span>Ngày khởi công: {project.start_date ? formatDateTime(project.start_date) : 'Đang cập nhật'}</span>
           </div>
         </div>

         {/* Content with Sidebar */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Main Content */}
           <div className="lg:col-span-8">
             <div className="bg-white">
                {/* Featured Image - Full Width */}
                <div className="mb-6">
                <Image
                    src={project.featured_image || '/images/imgdemo_new@2x.png'}
                    alt={project.name}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/imgdemo_new@2x.png";
                    }}
                />
                </div>
               {/* Project Gallery */}
               {project.images && project.images.length > 0 && (
                 <div className="mb-6">
                   <h3 className="text-xl font-medium text-[#1D1D44] mb-4">Hình ảnh dự án</h3>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {project.images.map((image, index) => (
                       <div key={index} className="aspect-square overflow-hidden rounded-lg">
                         <Image
                           src={image}
                           alt={`${project.name} - Hình ${index + 1}`}
                           width={300}
                           height={300}
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                           onError={(e) => {
                             const target = e.target as HTMLImageElement;
                             target.src = "/images/imgdemo_new@2x.png";
                           }}
                         />
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Project Content */}
               <div className="prose prose-lg max-w-none">
                 <div className="text-[#1D1D44] leading-relaxed">
                   {project.content ? (
                     <div dangerouslySetInnerHTML={{ __html: project.content }} />
                   ) : (
                     <p className="text-gray-500 italic">Nội dung dự án đang được cập nhật...</p>
                   )}
                 </div>
               </div>

               {/* Project Footer */}
               <div className="mt-8 pt-6 border-t border-gray-200">
                 <div className="flex items-center justify-between text-sm text-[#8D8DA1]">
                   <span>Dự án được đăng bởi PROSAI</span>
                   <div className="flex items-center gap-4">
                     <span>Lượt xem: {project.view_count || 0}</span>
                     <div className="flex items-center gap-1">
                       <img src="/svgs/akar-heart.svg" alt="likes" className="w-4 h-4" />
                       <span>{project.like_count || 0}</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Sidebar */}
           <div className="lg:col-span-4">
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
               <h3 className="text-lg font-medium text-[#1D1D44] mb-4">Thông tin dự án</h3>
               
               {/* Project Details */}
               <div className="space-y-4">
                 {/* Address */}
                 <div className="flex gap-3">
                   <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                     <img src="/svgs/address.svg" alt="address" className="w-full h-full" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-700 mb-1">Địa chỉ</p>
                     <p className="text-sm text-gray-600 leading-relaxed">{project.address}</p>
                   </div>
                 </div>

                 {/* Price Range */}
                 <div className="flex gap-3">
                   <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                     <img src="/svgs/icon_gia.svg" alt="price" className="w-full h-full" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-700 mb-1">Giá bán</p>
                     <p className="text-sm font-semibold text-green-600">{getPriceRange()}</p>
                   </div>
                 </div>

                 {/* Area */}
                 <div className="flex gap-3">
                   <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                     <img src="/svgs/icon_dientich.svg" alt="area" className="w-full h-full" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-gray-700 mb-1">Diện tích</p>
                     <p className="text-sm text-gray-600">{getAreaText()}</p>
                   </div>
                 </div>

                 {/* Investor */}
                 {project.investor && (
                   <div className="flex gap-3">
                     <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                       <img src="/svgs/icon_user.svg" alt="investor" className="w-full h-full" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-gray-700 mb-1">Chủ đầu tư</p>
                       <p className="text-sm text-gray-600 leading-relaxed">{project.investor}</p>
                     </div>
                   </div>
                 )}

                 {/* Start Date */}
                 {project.start_date && (
                   <div className="flex gap-3">
                     <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                       <img src="/svgs/icon_namxaydung.svg" alt="start date" className="w-full h-full" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-gray-700 mb-1">Ngày khởi công</p>
                       <p className="text-sm text-gray-600">{formatDateTime(project.start_date)}</p>
                     </div>
                   </div>
                 )}

                 {/* Expected Completion */}
                 {project.expected_completion_date && (
                   <div className="flex gap-3">
                     <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                       <img src="/svgs/icon_namxaydung.svg" alt="completion date" className="w-full h-full" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-gray-700 mb-1">Dự kiến hoàn thành</p>
                       <p className="text-sm text-gray-600">{formatDateTime(project.expected_completion_date)}</p>
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default ProjectDetailPage;
