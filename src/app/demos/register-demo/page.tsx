'use client';

import React, { useState } from 'react';
import RegisterModal from '@/components/features/auth/register/RegisterModal';
import LoginModal from '@/components/features/auth/login/LoginModal';
import Button from '@/components/ui/buttons/Button';
import { API_CONFIG } from '@/utils/env';

export default function RegisterDemoPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registration Demo</h1>
        
        <div className="space-y-4">
          <Button
            type="primary"
            onClick={() => setShowRegisterModal(true)}
            className="w-full"
          >
            Open Registration Modal
          </Button>
          
          <Button
            onClick={() => setShowLoginModal(true)}
            className="w-full"
          >
            Open Login Modal
          </Button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">API Endpoint:</h3>
          <code className="text-sm bg-gray-200 p-2 rounded block">
            POST {API_CONFIG.baseUrl}/auth/register
          </code>
          
          <h4 className="font-semibold mt-4 mb-2">Required Fields:</h4>
          <ul className="text-sm space-y-1">
            <li>• first_name: string</li>
            <li>• last_name: string</li>
            <li>• email: string</li>
            <li>• phone: string</li>
            <li>• password: string</li>
          </ul>
        </div>
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
    </div>
  );
}
