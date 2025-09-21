'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { formatCurrency, formatArea } from '@/utils/format';
import { PROJECT_STATUS } from '@/constants';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const getProjectImage = () => {
    if (project.featured_image) {
      return project.featured_image;
    }
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    return '/images/imgdemo_new@2x.png'; // Default image
  };

  const getPriceRange = () => {
    if (project.price_from && project.price_to && 
        project.price_from !== '0.00' && project.price_to !== '0.00') {
      return `${formatCurrency(parseFloat(project.price_from))} - ${formatCurrency(parseFloat(project.price_to))}`;
    }
    if (project.price_from && project.price_from !== '0.00') {
      return `Từ ${formatCurrency(parseFloat(project.price_from))}`;
    }
    return 'Liên hệ';
  };

  const getAreaText = () => {
    if (project.area && project.area !== '0.00') {
      return formatArea(parseFloat(project.area));
    }
    return 'Chưa cập nhật';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex h-48">
        {/* Project Image */}
        <div className="relative w-48 h-full bg-gray-100 flex-shrink-0">
          <img
            src={getProjectImage()}
            alt={project.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/imgdemo_new@2x.png';
            }}
          />
          {project.is_featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Nổi bật
            </div>
          )}
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {project.project_type || 'Chưa cập nhật'}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Project Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <Link 
              href={`/projects/${project.id}`}
              className="hover:text-blue-600 transition-colors duration-200 block truncate"
            >
              {project.name || 'Tên dự án chưa cập nhật'}
            </Link>
          </h3>

          {/* Address */}
          <div className="flex items-start gap-2 mb-3">
            <img src="/svgs/address.svg" alt="address" className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-1">
              {project.address}
            </span>
          </div>

          {/* Project Details - 2 columns */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Price Range */}
            <div className="flex items-center gap-2">
              <img src="/svgs/icon_gia.svg" alt="price" className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium text-green-600 line-clamp-1">
                {getPriceRange()}
              </span>
            </div>

            {/* Area */}
            <div className="flex items-center gap-2">
              <img src="/svgs/icon_dientich.svg" alt="area" className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm text-gray-600 line-clamp-1">
                {getAreaText()}
              </span>
            </div>

            {/* Investor */}
            {project.investor && (
              <div className="flex items-center gap-2 col-span-2">
                <img src="/svgs/icon_user.svg" alt="investor" className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-gray-600 line-clamp-1">
                  {project.investor}
                </span>
              </div>
            )}
          </div>

          {/* Status and Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className={`px-2 py-1 rounded-full ${
                project.status === PROJECT_STATUS.PLANNING 
                  ? 'bg-green-100 text-green-700' 
                  : project.status === PROJECT_STATUS.PRE_CONSTRUCTION
                  ? 'bg-yellow-100 text-yellow-700'
                  : project.status === PROJECT_STATUS.UNDER_CONSTRUCTION
                  ? 'bg-blue-100 text-blue-700'
                  : project.status === PROJECT_STATUS.COMPLETED
                  ? 'bg-green-100 text-green-700'
                  : project.status === PROJECT_STATUS.HANDOVER
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS]}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <img src="/svgs/akar-heart.svg" alt="likes" className="w-3 h-3" />
                <span>{project.like_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
