'use client';

import React, { useState, useEffect } from 'react';
import { Project, ProjectListParams } from '@/types';
import { projectService } from '@/services/projectService';
import ProjectCard from './ProjectCard';
import { Spin } from 'antd';
import { Pagination } from '@/components/ui/navigation';
import { EmptyState } from '@/components/shared/empty-states';

interface ProjectListProps {
  initialParams?: ProjectListParams;
  className?: string;
  showPagination?: boolean;
  itemsPerPage?: number;
}

const ProjectList: React.FC<ProjectListProps> = ({
  initialParams = {},
  className = '',
  showPagination = true,
  itemsPerPage = 10
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [params, setParams] = useState<ProjectListParams>({
    page: 1,
    limit: itemsPerPage,
    ...initialParams
  });

  const fetchProjects = async (searchParams: ProjectListParams) => {
    try {
      setLoading(true);
      
      const apiParams = { ...searchParams };
      
      const response = await projectService.getProjects(apiParams);
      setProjects(response.data);
      setTotal(response.total);
      setPageCount(response.pageCount);
      setCurrentPage(response.page);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setTotal(0);
      setPageCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(params);
  }, [params]);

  // Update params when initialParams change
  useEffect(() => {
    setParams(prev => ({
      ...prev,
      ...initialParams,
      page: 1 // Reset to first page when filters change
    }));
  }, [initialParams]);

  const handlePageChange = (page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }));
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        type="search"
        title="Không tìm thấy dự án nào"
        description="Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm thấy dự án phù hợp"
        className="py-20"
      />
    );
  }

  return (
    <div className={className}>
      {/* Projects Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && pageCount > 1 && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={pageCount}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectList;
