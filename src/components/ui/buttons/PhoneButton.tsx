'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { copyToClipboard } from '@/utils/clipboard';

interface PhoneButtonProps {
  phoneNumber: string;
  hiddenText?: string;
  copiedText?: string;
  className?: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({
  phoneNumber,
  hiddenText = "Hiện số",
  copiedText = "Sao chép",
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Early return if phoneNumber is invalid
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return (
      <button
        disabled
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          bg-gray-400 text-white cursor-not-allowed
          font-medium text-sm
          ${className}
        `}
      >
        <span>Không xác định</span>
      </button>
    );
  }

  const handleClick = async () => {
    if (!isRevealed) {
      // First click: reveal phone number
      setIsRevealed(true);
    } else {
      // Second click: copy to clipboard
      const success = await copyToClipboard(phoneNumber);
      if (success) {
        setIsCopied(true);
        // Reset copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    }
  };

  const formatPhoneNumber = (phone: string) => {
    // Format phone number with asterisks for hidden digits
    if (!phone || typeof phone !== 'string') {
      return '*** *** ***';
    }
    if (phone.length >= 7) {
      return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ***`;
    }
    return phone;
  };

  const displayText = () => {
    if (isCopied) {
      return "Đã sao chép!";
    }
    if (isRevealed) {
      return `${phoneNumber} | ${copiedText}`;
    }
    return `${formatPhoneNumber(phoneNumber)} | ${hiddenText}`;
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        bg-blue-600 hover:bg-blue-700 text-white
        transition-colors duration-200
        font-regular phone-button
        ${className}
      `}
    >
      <Image
        src="/svgs/phone.svg"
        alt="Phone"
        width={25}
        height={25}
        className="filter brightness-0 invert"
      />
      <span>{displayText()}</span>
    </button>
  );
};

export default PhoneButton;
