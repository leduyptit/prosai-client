'use client';

import React from 'react';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook' | 'zalo';
  onClick: () => void;
  className?: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  className = ''
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          name: 'Google',
          logo: (
            <img src="/svgs/icon_google.svg" alt="google" className="w-5" />
          ),
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
          hoverColor: 'hover:bg-gray-50'
        };
      case 'facebook':
        return {
          name: 'Facebook',
          logo: (
            <img src="/svgs/social_fb.svg" alt="facebook" className="w-5" />
          ),
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
          hoverColor: 'hover:bg-gray-50'
        };
      case 'zalo':
        return {
          name: 'Zalo',
          logo: (
            <img src="/svgs/social_zalo.svg" alt="zalo" className="w-5" />
          ),
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
          hoverColor: 'hover:bg-gray-50'
        };
      default:
        return {
          name: '',
          logo: null,
          bgColor: 'bg-white',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300',
          hoverColor: 'hover:bg-gray-50'
        };
    }
  };

  const config = getProviderConfig();

  return (
    <button
      onClick={onClick}
      className={`
        w-full h-12 px-4 rounded-lg border-2 flex items-center justify-center gap-3
        transition-all duration-200 font-medium
        ${config.bgColor} ${config.textColor} ${config.borderColor} ${config.hoverColor}
        ${className}
      `}
    >
      {config.logo}
      <span>{config.name}</span>
    </button>
  );
};

export default SocialLoginButton;
