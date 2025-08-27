'use client';

import React, { useState, useEffect } from 'react';
import { fetchSuggestions, SuggestionItem } from '../../../services/suggestions';

interface SearchSuggestionsProps {
  visible: boolean;
  keyword: string;
  onClose: () => void;
  selectedDistricts: string[];
  onClearAllDistricts: () => void;
  onRemoveDistrict: (district: string) => void;
  onSelectSuggestion: (title: string) => void;
  onSelectSuggestionAsTag?: (title: string) => void;
  className?: string;
  showKeywordAsTag?: boolean;
  keywordTagText?: string;
  onRemoveKeyword?: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  visible,
  keyword,
  onClose,
  selectedDistricts,
  onClearAllDistricts,
  onRemoveDistrict,
  onSelectSuggestion,
  onSelectSuggestionAsTag,
  className = '',
  showKeywordAsTag = false,
  keywordTagText = '',
  onRemoveKeyword
}) => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch suggestions from API when keyword changes
  useEffect(() => {
    const fetchData = async () => {
      if (keyword && keyword.length > 0) {
        setLoading(true);
        setError(null);
        
        try {
          const data = await fetchSuggestions(keyword, 10);
          setSuggestions(data);
        } catch (err) {
          setError('Không thể tải gợi ý');
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setLoading(false);
        setError(null);
      }
    };

    // Add debounce to avoid too many API calls
    const timeoutId = setTimeout(fetchData, 300);
    
    return () => clearTimeout(timeoutId);
  }, [keyword]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg mt-1 ${className}`}>
      {/* Selected Items Section */}
      {(selectedDistricts.length > 0 || (showKeywordAsTag && keywordTagText)) && (
        <div className="p-3 border-b border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-gray-700">Đã chọn</span>
            <button
              type="button"
              onClick={() => {
                onClearAllDistricts();
                if (onRemoveKeyword) {
                  onRemoveKeyword();
                }
              }}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Show selected districts */}
            {selectedDistricts.map((district, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{district}</span>
                <button
                  type="button"
                  onClick={() => onRemoveDistrict(district)}
                  className="text-blue-600 hover:text-blue-800 ml-1 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
            
            {/* Show keyword tag */}
            {showKeywordAsTag && keywordTagText && (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <span>🔍</span>
                <span className="max-w-none break-words">{keywordTagText}</span>
                <button
                  type="button"
                  onClick={() => onRemoveKeyword?.()}
                  className="text-green-600 hover:text-green-800 ml-1 text-lg leading-none flex-shrink-0"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Suggestions List */}
      <div className="p-3">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-500">Đang tải gợi ý...</span>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-sm text-red-500">
            {error}
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500">
            Không tìm thấy gợi ý nào
          </div>
        ) : (
          suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 rounded-lg border-b border-gray-100 last:border-b-0"
              onClick={() => {
                // Add suggestion title as keyword tag
                onSelectSuggestion(suggestion.title);
                onClose();
              }}
            >
              <img src="/svgs/icon_loaibds.svg" alt="property" className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-700 text-sm leading-tight mb-1">{suggestion.title}</div>
                <div className="text-xs text-gray-500">{suggestion.location}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchSuggestions;
