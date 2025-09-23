'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { copyToClipboard } from '@/utils/clipboard';
import { useSession } from 'next-auth/react';
import { LoginModal } from '@/components/features/auth/login';
import { useApi } from '@/hooks/useApi';
import { fetchContactById } from '@/services/contact';
import { App } from 'antd';

interface PhoneButtonProps {
  phoneNumber: string;
  contactId?: string;
  hiddenText?: string;
  copiedText?: string;
  className?: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({
  phoneNumber,
  contactId,
  hiddenText = "Hiện số",
  copiedText = "Sao chép",
  className = '',
}) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [revealedPhone, setRevealedPhone] = useState<string>(phoneNumber);
  const { loading } = useApi();
  const { message } = App.useApp();
  // Keep button enabled; will fetch on demand

  const handleClick = async () => {
    // If not authenticated, open login modal
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!isRevealed) {
      // First click: fetch contact if available, then reveal
      if (contactId) {
        try {
          const data = await fetchContactById(contactId);
          if (data.phone_message.length > 0) {
            message.success('Số điện thoại đã được lấy thành công!');
          } else {
            message.error('Số điện thoại không tồn tại!');
          }
          const phone = (data as any)?.phone_message?.[0] || (data as any)?.phone_user || phoneNumber;
          setRevealedPhone(phone || phoneNumber);
        } catch (error) {
          setRevealedPhone(phoneNumber);
          message.error((error as any).message);
        }
      }
      setIsRevealed(true);
    } else {
      // Second click: copy to clipboard
      const success = await copyToClipboard(revealedPhone || phoneNumber);
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
      return 'Không xác định';
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
      return `${revealedPhone || phoneNumber} | ${copiedText}`;
    }
    if (loading) {
      return "Đang lấy số...";
    }
    return `${formatPhoneNumber(phoneNumber)} | ${hiddenText}`;
  };

  return (
    <>
      {phoneNumber === '' && (
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200 font-regular disabled:opacity-50 disabled:cursor-not-allowed">
          <Image src="/svgs/phone.svg" alt="Phone" width={25} height={25} className="filter brightness-0 invert" />
          <span>Không xác định</span>
        </div>
      )}
      {phoneNumber !== '' && (
      <button
        onClick={handleClick}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-600 hover:bg-blue-700 text-white
          transition-colors duration-200
          font-regular phone-button
          cursor-pointer
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
      )}

      {!isAuthenticated && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </>
  );
};

export default PhoneButton;
