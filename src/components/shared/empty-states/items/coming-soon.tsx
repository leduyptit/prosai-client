'use client';

import React from 'react';
import { Button } from 'antd';

interface ComingSoonProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  image?: string;
  className?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Tính năng sắp ra mắt',
  description = 'Chúng tôi đang hoàn thiện để mang đến cho bạn trải nghiệm tốt nhất. Vui lòng quay lại sau!',
  actionText,
  onAction,
  image = '/svgs/img_nolist.svg',
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-2xl" />

      {/* Card container */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-md shadow-sm">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500" />

        <div className="flex flex-col items-center text-center px-8 py-10">
          {/* Badge */}
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-xs font-font-medium text-slate-600 shadow-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            COMING SOON
          </span>

          {/* Illustration */}
          {image && (
            <div className="mb-6">
              <img
                src={image}
                alt="Coming soon"
                className="w-28 h-28 md:w-32 md:h-32 object-contain opacity-80"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-2xl md:text-3xl font-font-semibold text-transparent">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-7 max-w-xl text-slate-600">
            {description}
          </p>

          {/* Action Button */}
          {actionText && onAction && (
            <Button
              type="primary"
              size="small"
              onClick={onAction}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-transparent px-6 shadow-md"
            >
              {actionText}
            </Button>
          )}

          {/* Subtle bottom divider */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;


