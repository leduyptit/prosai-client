'use client';

import React, { useState, useEffect } from 'react';
import { createSearchUrlFromBookmark, createSearchUrl } from '@/utils/searchUrl';
import { BookmarkItem } from '@/services/bookmarksList';

const SearchUrlDemo: React.FC = () => {
  const [demoUrl, setDemoUrl] = useState<string>('');
  const [testResults, setTestResults] = useState<string[]>([]);

  // Sample bookmark data
  const sampleBookmark: BookmarkItem = {
    id: 'demo-1',
    name: 'Demo Bookmark - Hà Nội Cầu Giấy',
    description: 'Demo bookmark for testing search URL generation',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Dịch Vọng',
    from_price: '1000',
    to_price: '2000',
    from_area: '100',
    to_area: '200',
    num_bedrooms: 3,
    property_type: 2,
    listing_type: 1,
    legal_status: 1,
    keyword: 'chung cư',
    created_at: '1640995200',
    updated_at: null
  };

  // Auto-generate URLs on component mount
  useEffect(() => {
    const results: string[] = [];
    
    // Test 1: Generate URL from bookmark
    try {
      const url1 = createSearchUrlFromBookmark(sampleBookmark);
      results.push(`✅ Bookmark URL: ${url1}`);
      setDemoUrl(url1);
    } catch (error) {
      results.push(`❌ Bookmark URL Error: ${error}`);
    }
    
    // Test 2: Generate URL from params
    try {
      const url2 = createSearchUrl({
        city: 'Hà Nội',
        district: 'Cầu Giấy',
        property_type: 2,
        listing_type: 1,
        from_price: 1000,
        to_price: 2000,
        from_area: 100,
        to_area: 200
      });
      results.push(`✅ Params URL: ${url2}`);
    } catch (error) {
      results.push(`❌ Params URL Error: ${error}`);
    }
    
    setTestResults(results);
  }, []);

  const generateUrlFromBookmark = () => {
    const url = createSearchUrlFromBookmark(sampleBookmark);
    setDemoUrl(url);
  };

  const generateUrlFromParams = () => {
    const url = createSearchUrl({
      city: 'Hà Nội',
      district: 'Cầu Giấy',
      property_type: 2,
      listing_type: 1,
      from_price: 1000,
      to_price: 2000,
      from_area: 100,
      to_area: 200
    });
    setDemoUrl(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(demoUrl);
      alert('URL đã được copy vào clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Search URL Generator Demo
          </h1>

          <div className="space-y-6">
            {/* Sample Bookmark Data */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Sample Bookmark Data:</h2>
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(sampleBookmark, null, 2)}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={generateUrlFromBookmark}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate URL from Bookmark
              </button>
              <button
                onClick={generateUrlFromParams}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Generate URL from Params
              </button>
            </div>

            {/* Generated URL */}
            {demoUrl && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Generated URL:</h3>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-white p-2 rounded border text-sm break-all">
                    {demoUrl}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Copy
                  </button>
                </div>
                
                {/* Decoded URL for readability */}
                <div className="mt-3">
                  <h4 className="font-medium text-gray-700 mb-1">Decoded URL:</h4>
                  <code className="bg-white p-2 rounded border text-sm block">
                    {decodeURIComponent(demoUrl)}
                  </code>
                </div>

                {/* Test Link */}
                <div className="mt-3">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Test Search Link
                  </a>
                </div>
              </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
                <div className="space-y-1">
                  {testResults.map((result, index) => (
                    <div key={index} className="text-sm font-mono">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expected Result */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Expected Result:</h3>
              <p className="text-sm text-gray-700 mb-2">
                The generated URL should match the format you requested:
              </p>
              <code className="bg-white p-2 rounded border text-sm block">
                /search?city=H%C3%A0+N%E1%BB%99i&district=C%E1%BA%A7u+Gi%E1%BA%A5y&property_type=2&listing_type=1&from_price=1000&to_price=2000&from_area=100&to_area=200&num_bedrooms=3&legal_status=1&keyword=chung+c%C6%B0
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUrlDemo;
