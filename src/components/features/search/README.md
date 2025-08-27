# Search Components

This directory contains reusable search components for location selection and property search functionality.

## Components

### 1. CitySelector
A dropdown component for selecting cities/provinces with search functionality.

**Props:**
- `visible: boolean` - Controls dropdown visibility
- `onClose: () => void` - Callback when dropdown closes
- `onSelect: (city: string) => void` - Callback when city is selected
- `selectedCity: string` - Currently selected city
- `className?: string` - Optional CSS classes

**Usage:**
```tsx
import { CitySelector } from '@/components/features/search';

<CitySelector
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  onSelect={(city) => handleCitySelect(city)}
  selectedCity={selectedCity}
/>
```

### 2. DistrictSelector
A dropdown component for selecting multiple districts/wards with search functionality.

**Props:**
- `visible: boolean` - Controls dropdown visibility
- `onClose: () => void` - Callback when dropdown closes
- `onSelect: (districts: string[]) => void` - Callback when districts are selected
- `selectedCity: string` - City for which to show districts
- `selectedDistricts: string[]` - Currently selected districts
- `className?: string` - Optional CSS classes

**Usage:**
```tsx
import { DistrictSelector } from '@/components/features/search';

<DistrictSelector
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  onSelect={(districts) => handleDistrictSelect(districts)}
  selectedCity={selectedCity}
  selectedDistricts={selectedDistricts}
/>
```

### 3. SearchSuggestions
A component that shows property search suggestions based on keyword input.

**Props:**
- `visible: boolean` - Controls visibility
- `keyword: string` - Search keyword
- `onClose: () => void` - Callback when suggestions close
- `selectedDistricts: string[]` - Selected districts for context
- `onClearAllDistricts: () => void` - Callback to clear all districts
- `onRemoveDistrict: (district: string) => void` - Callback to remove a district
- `onSelectSuggestion: (title: string) => void` - Callback when suggestion is selected
- `className?: string` - Optional CSS classes

**Usage:**
```tsx
import { SearchSuggestions } from '@/components/features/search';

<SearchSuggestions
  visible={isVisible}
  keyword={keyword}
  onClose={() => setIsVisible(false)}
  selectedDistricts={selectedDistricts}
  onClearAllDistricts={() => handleClearDistricts()}
  onRemoveDistrict={(district) => handleRemoveDistrict(district)}
  onSelectSuggestion={(title) => handleSelectSuggestion(title)}
/>
```

### 4. LocationSearchInput (Recommended)
A combined component that integrates city selection, district selection, and keyword search into one reusable component.

**Props:**
- `city: string` - Selected city
- `district: string` - Selected districts (comma-separated)
- `onCityChange: (city: string) => void` - Callback when city changes
- `onDistrictChange: (district: string) => void` - Callback when districts change
- `onKeywordChange?: (keyword: string) => void` - Optional callback for keyword changes
- `onSearch?: () => void` - Optional callback when search button is clicked
- `showSearchButton?: boolean` - Whether to show the search button (default: false)
- `searchButtonText?: string` - Text for the search button (default: "Tìm kiếm")
- `searchButtonClassName?: string` - Additional CSS classes for the search button
- `className?: string` - Optional CSS classes
- `placeholder?: string` - Custom placeholder text
- `disabled?: boolean` - Whether the input is disabled

**Usage:**
```tsx
import { LocationSearchInput } from '@/components/features/search';

// Without search button
<LocationSearchInput
  city={searchForm.city}
  district={searchForm.district}
  onCityChange={(city) => setSearchForm(prev => ({ ...prev, city }))}
  onDistrictChange={(district) => setSearchForm(prev => ({ ...prev, district }))}
  onKeywordChange={(keyword) => setKeyword(keyword)}
  placeholder="Nhập địa điểm, dự án, quận, huyện..."
/>

// With search button
<LocationSearchInput
  city={searchForm.city}
  district={searchForm.district}
  onCityChange={(city) => setSearchForm(prev => ({ ...prev, city }))}
  onDistrictChange={(district) => setSearchForm(prev => ({ ...prev, district }))}
  onKeywordChange={(keyword) => setKeyword(keyword)}
  onSearch={handleSearch}
  showSearchButton={true}
  searchButtonText="Tìm kiếm"
  searchButtonClassName="bg-blue-600 hover:bg-blue-700"
  placeholder="Nhập địa điểm, dự án, quận, huyện..."
/>
```

## Features

- **Smart Focus Behavior**: Automatically shows city selector if no city is selected, district selector if no districts are selected, and suggestions if both are available
- **Multi-selection**: Support for selecting multiple districts
- **Search Functionality**: Built-in search for cities and districts
- **Responsive Design**: Works on both desktop and mobile devices
- **Accessibility**: Proper keyboard navigation and screen reader support
- **Customizable**: Flexible styling and behavior through props

## Data Structure

The components expect the following data structures:

### Cities
```typescript
interface City {
  value: string;
  label: string;
}
```

### Districts
```typescript
interface District {
  value: string;
  label: string;
  searchCount: number;
}
```

## Integration Example

Here's how to integrate the LocationSearchInput into a search form:

```tsx
import React, { useState } from 'react';
import { LocationSearchInput } from '@/components/features/search';

const SearchForm = () => {
  const [searchForm, setSearchForm] = useState({
    city: '',
    district: '',
    keyword: ''
  });

  const handleCityChange = (city: string) => {
    setSearchForm(prev => ({ ...prev, city, district: '' }));
  };

  const handleDistrictChange = (district: string) => {
    setSearchForm(prev => ({ ...prev, district }));
  };

  const handleKeywordChange = (keyword: string) => {
    setSearchForm(prev => ({ ...prev, keyword }));
  };

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching with:', searchForm);
  };

  return (
    <div className="search-form">
      <LocationSearchInput
        city={searchForm.city}
        district={searchForm.district}
        onCityChange={handleCityChange}
        onDistrictChange={handleDistrictChange}
        onKeywordChange={handleKeywordChange}
        onSearch={handleSearch}
        showSearchButton={true}
        searchButtonText="Tìm kiếm"
        placeholder="Tìm kiếm bất động sản..."
      />
      {/* Other form fields */}
    </div>
  );
};
```

## Styling

The components use Tailwind CSS classes and can be customized through the `className` prop. They also include responsive design considerations and proper z-index management for dropdowns.

## Dependencies

- React 18+
- Ant Design (for Button and Input components)
- Tailwind CSS (for styling)
- SVG icons (stored in `/public/svgs/`)
