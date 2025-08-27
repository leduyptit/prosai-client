'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import CitySelector from './CitySelector';
import DistrictSelector from './DistrictSelector';
import SearchSuggestions from './SearchSuggestions';

interface LocationSearchInputProps {
  city: string;
  district: string;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
  onKeywordChange?: (keyword: string) => void;
  onSearch?: () => void;
  showSearchButton?: boolean;
  searchButtonText?: string;
  searchButtonClassName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  showKeywordAsTag?: boolean;
  keywordTagText?: string;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  city,
  district,
  onCityChange,
  onDistrictChange,
  onKeywordChange,
  onSearch,
  showSearchButton = false,
  searchButtonText = 'Tìm kiếm',
  searchButtonClassName = '',
  className = '',
  placeholder = 'Nhập địa điểm, dự án, quận, huyện...',
  disabled = false,
  showKeywordAsTag = false,
  keywordTagText = ''
}) => {
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [districtPickerVisible, setDistrictPickerVisible] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [internalKeywordTagText, setInternalKeywordTagText] = useState<string>('');
  const [internalShowKeywordAsTag, setInternalShowKeywordAsTag] = useState<boolean>(false);

  // Initialize selectedDistricts from district prop
  useEffect(() => {
    if (district) {
      setSelectedDistricts(district.split(', ').filter(d => d.trim()));
    } else {
      setSelectedDistricts([]);
    }
  }, [district]);

  // Auto-show keyword tag when props change
  useEffect(() => {
    if (showKeywordAsTag && keywordTagText) {
      setInternalShowKeywordAsTag(true);
      setInternalKeywordTagText(keywordTagText);
    } else {
      setInternalShowKeywordAsTag(false);
      setInternalKeywordTagText('');
    }
  }, [showKeywordAsTag, keywordTagText]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.location-input-container')) {
        setLocationPickerVisible(false);
        setSuggestionsVisible(false);
        // Only close district picker if user has selected some districts
        if (selectedDistricts.length > 0) {
          setDistrictPickerVisible(false);
        }
      }
    };

    if (locationPickerVisible || districtPickerVisible || suggestionsVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [locationPickerVisible, districtPickerVisible, suggestionsVisible, selectedDistricts]);

  const handleCitySelect = (selectedCity: string) => {
    onCityChange(selectedCity);
    // Reset selected districts when changing city
    setSelectedDistricts([]);
    onDistrictChange('');
  };

  const handleDistrictSelect = (districts: string[]) => {
    setSelectedDistricts(districts);
    onDistrictChange(districts.join(', '));
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    if (onKeywordChange) {
      onKeywordChange(value);
    }
    
    // Show suggestions when typing, regardless of district selection
    if (value.length > 0) {
      setSuggestionsVisible(true);
      setDistrictPickerVisible(false);
      setLocationPickerVisible(false);
    } else {
      setSuggestionsVisible(false);
    }
  };

  const handleInputFocus = () => {
    if (!city || city === 'Chọn vị trí') {
      setDistrictPickerVisible(false);
      setLocationPickerVisible(true);
      setSuggestionsVisible(false);
      return;
    }
    // Allow focusing on keyword input even without districts
    if (selectedDistricts.length === 0) {
      setLocationPickerVisible(false);
      setDistrictPickerVisible(true);
      setSuggestionsVisible(false);
      return;
    }
    // If districts are selected and there's a keyword, show suggestions
    if (keyword.length > 0) {
      setSuggestionsVisible(true);
      setDistrictPickerVisible(false);
      setLocationPickerVisible(false);
    }
  };

  const handleDistrictClick = () => {
    if (!city || city === 'Chọn vị trí') {
      setLocationPickerVisible(true);
      setDistrictPickerVisible(false);
      setSuggestionsVisible(false);
    } else {
      setLocationPickerVisible(false);
      setDistrictPickerVisible(true);
      setSuggestionsVisible(false);
    }
  };

  return (
    <div className={`relative location-input-container ${className}`}>
      <div className="flex bg-white border border-[#C3C3C3] rounded-lg">
        {/* Left Section - City Selector */}
        <div className="flex items-center px-4 py-3 border-r border-[#C3C3C3] cursor-pointer" onClick={() => {
          setDistrictPickerVisible(false);
          setLocationPickerVisible(!locationPickerVisible);
        }}>
          <img src="/svgs/address.svg" alt="location" className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-sm text-gray-700 mr-2">
            {city || "Chọn vị trí"}
          </span>
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
         
        {/* Middle Section - Search Input */}
         <div className="flex-1 flex items-center px-4 py-0">
           <img src="/svgs/icon_search.svg" className="w-5 h-5 mr-3 text-gray-400" alt="search" />
                                   <div className="flex-1">
              {/* Always show selected districts and keyword tags when they exist */}
              {(selectedDistricts.length > 0 || (showKeywordAsTag && keywordTagText) || (internalShowKeywordAsTag && internalKeywordTagText)) && !districtPickerVisible && !suggestionsVisible ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Show selected districts */}
                  {selectedDistricts.slice(0, 1).map((district, index) => (
                    <span
                      key={`${district}-${index}`}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer"
                      onClick={handleDistrictClick}
                    >
                      {district}
                    </span>
                  ))}
                  
                                     {/* Show keyword tag */}
                   {((showKeywordAsTag && keywordTagText) || (internalShowKeywordAsTag && internalKeywordTagText)) && (
                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                       <span>🔍</span>
                       <span className="max-w-[120px] truncate" title={keywordTagText || internalKeywordTagText}>
                         {keywordTagText || internalKeywordTagText}
                       </span>
                       <button
                         type="button"
                         onClick={(e) => {
                           e.stopPropagation();
                           // Clear all keyword states
                           setKeyword('');
                           setInternalKeywordTagText('');
                           setInternalShowKeywordAsTag(false);
                           // Reset keyword in parent component to remove from URL params
                           if (onKeywordChange) {
                             onKeywordChange('');
                           }
                           // Focus on input for new keyword
                           const inputElement = e.currentTarget.closest('.flex-1')?.querySelector('input');
                           if (inputElement) {
                             inputElement.focus();
                           }
                         }}
                         className="text-green-600 hover:text-green-800 ml-1 flex-shrink-0"
                       >
                         ×
                       </button>
                     </span>
                   )}
                  
                  {/* Show remaining districts and keywords summary */}
                   {(selectedDistricts.length > 1) && (
                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer" onClick={handleDistrictClick}>
                       {(() => {
                         const remainingDistricts = Math.max(0, selectedDistricts.length - 1);
                         if (remainingDistricts > 0) {
                           return `+${remainingDistricts} khu vực`;
                         }
                         return '';
                       })()}
                     </span>
                   )}
                  
                                     {/* Always show input for new keyword */}
                   <input
                     placeholder={placeholder}
                     value={keyword}
                     onChange={(e) => handleKeywordChange(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && keyword.trim()) {
                         // Add keyword to tag and push to params
                         setInternalKeywordTagText(keyword.trim());
                         setInternalShowKeywordAsTag(true);
                         // Clear input
                         setKeyword('');
                         // Update parent component
                         if (onKeywordChange) {
                           onKeywordChange(keyword.trim());
                         }
                         // Close suggestions if open
                         setSuggestionsVisible(false);
                       }
                     }}
                     onFocus={handleInputFocus}
                     className="w-full border-none outline-none bg-transparent text-sm placeholder:text-gray-400 flex-1 min-w-0"
                     disabled={disabled || !city || city === 'Chọn vị trí'}
                   />
                </div>
              ) : (
                                 <input
                   placeholder={
                     !city || city === 'Chọn vị trí'
                       ? 'Vui lòng chọn tỉnh/thành phố trước'
                       : placeholder
                   }
                   value={keyword}
                   onChange={(e) => handleKeywordChange(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && keyword.trim()) {
                       // Add keyword to tag and push to params
                       setInternalKeywordTagText(keyword.trim());
                       setInternalShowKeywordAsTag(true);
                       // Clear input
                       setKeyword('');
                       // Update parent component
                       if (onKeywordChange) {
                         onKeywordChange(keyword.trim());
                       }
                       // Close suggestions if open
                       setSuggestionsVisible(false);
                     }
                   }}
                   onFocus={handleInputFocus}
                   className={`w-full border-none outline-none bg-transparent text-sm placeholder:text-gray-400 ${
                     (!city || city === 'Chọn vị trí')
                       ? 'cursor-pointer' : ''
                   }`}
                   disabled={disabled || !city || city === 'Chọn vị trí'}
                 />
              )}
            </div>
           {keyword && (
             <button
               type="button"
               onClick={() => {
                 setKeyword('');
                 setSuggestionsVisible(false);
                 if (onKeywordChange) {
                   onKeywordChange('');
                 }
               }}
               className="ml-2 text-gray-400 hover:text-gray-600 p-1"
             >
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>
             </button>
           )}
         </div>

         {/* Right Section - Search Button (Optional) */}
         {showSearchButton && (
           <div className="flex items-center justify-center mr-1">
             <Button
               type="primary"
               size="small"
               onClick={onSearch}
               className={`text-white font-medium rounded-r-lg transition-colors ${searchButtonClassName}`}
             >
               {searchButtonText}
             </Button>
           </div>
         )}
      </div>

      {/* City Selector Dropdown */}
      <CitySelector
        visible={locationPickerVisible}
        onClose={() => setLocationPickerVisible(false)}
        onSelect={handleCitySelect}
        selectedCity={city}
      />

             {/* District Selector Dropdown */}
       <DistrictSelector
         visible={districtPickerVisible}
         onClose={() => setDistrictPickerVisible(false)}
         onSelect={handleDistrictSelect}
         selectedCity={city}
         selectedDistricts={selectedDistricts}
         showKeywordAsTag={Boolean((showKeywordAsTag && keywordTagText) || (internalShowKeywordAsTag && internalKeywordTagText))}
         keywordTagText={keywordTagText || internalKeywordTagText}
         onRemoveKeyword={() => {
           // Clear all keyword states
           setKeyword('');
           setInternalKeywordTagText('');
           setInternalShowKeywordAsTag(false);
           // Reset keyword in parent component to remove from URL params
           if (onKeywordChange) {
             onKeywordChange('');
           }
         }}
       />

      {/* Search Suggestions Dropdown */}
      {suggestionsVisible && keyword.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-[9999]">
                     <SearchSuggestions
             visible={suggestionsVisible}
             keyword={keyword}
             onClose={() => setSuggestionsVisible(false)}
             selectedDistricts={selectedDistricts}
             onClearAllDistricts={() => {
               setSelectedDistricts([]);
               onDistrictChange('');
             }}
             onRemoveDistrict={(district) => {
               const newDistricts = selectedDistricts.filter(d => d !== district);
               setSelectedDistricts(newDistricts);
               onDistrictChange(newDistricts.join(', '));
             }}
              onSelectSuggestion={(title) => {
                 // Don't fill the input, just add to keyword tag
                 setInternalKeywordTagText(title);
                 setInternalShowKeywordAsTag(true);
                 setSuggestionsVisible(false);
                 // Clear input after selecting suggestion
                 setKeyword('');
                 // Update parent component with the new keyword
                 if (onKeywordChange) {
                   onKeywordChange(title);
                 }
               }}
              onSelectSuggestionAsTag={(title) => {
                setInternalKeywordTagText(title);
                setInternalShowKeywordAsTag(true);
              }}
             showKeywordAsTag={Boolean((showKeywordAsTag && keywordTagText) || (internalShowKeywordAsTag && internalKeywordTagText))}
             keywordTagText={keywordTagText || internalKeywordTagText}
             onRemoveKeyword={() => {
               // Clear all keyword states
               setKeyword('');
               setInternalKeywordTagText('');
               setInternalShowKeywordAsTag(false);
               // Reset keyword in parent component to remove from URL params
               if (onKeywordChange) {
                 onKeywordChange('');
               }
             }}
           />
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
