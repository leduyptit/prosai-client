import { BookmarkItem } from '@/services/bookmarksList';

/**
 * Creates a search URL from bookmark data
 * @param bookmark - The bookmark item containing search parameters
 * @returns The formatted search URL
 */
export const createSearchUrlFromBookmark = (bookmark: BookmarkItem): string => {
  const baseUrl = '/search';
  const params = new URLSearchParams();

  // Add city parameter
  if (bookmark.city) {
    params.append('city', bookmark.city);
  }

  // Add district parameter
  if (bookmark.district) {
    params.append('district', bookmark.district);
  }

  // Add ward parameter
  if (bookmark.ward) {
    params.append('ward', bookmark.ward);
  }

  // Add property type parameter
  if (bookmark.property_type) {
    params.append('property_type', bookmark.property_type.toString());
  }

  // Add listing type parameter
  if (bookmark.listing_type) {
    params.append('listing_type', bookmark.listing_type.toString());
  }

  // Add price range parameters
  if (bookmark.from_price) {
    params.append('from_price', parseInt(bookmark.from_price).toFixed(0));
  }
  if (bookmark.to_price) {
    params.append('to_price', parseInt(bookmark.to_price).toFixed(0));
  }

  // Add area range parameters
  if (bookmark.from_area) {
    params.append('from_area', bookmark.from_area);
  }
  if (bookmark.to_area) {
    params.append('to_area', bookmark.to_area);
  }

  // Add number of bedrooms
  if (bookmark.num_bedrooms) {
    params.append('num_bedrooms', bookmark.num_bedrooms.toString());
  }

  // Add legal status
  if (bookmark.legal_status) {
    params.append('legal_status', bookmark.legal_status.toString());
  }

  // Add keyword
  if (bookmark.keyword) {
    params.append('keyword', bookmark.keyword);
  }

  // Construct the final URL
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Creates a search URL from individual search parameters
 * @param searchParams - Object containing search parameters
 * @returns The formatted search URL
 */
export const createSearchUrl = (searchParams: {
  city?: string;
  district?: string;
  ward?: string;
  property_type?: number;
  listing_type?: number;
  from_price?: number;
  to_price?: number;
  from_area?: number;
  to_area?: number;
  num_bedrooms?: number;
  legal_status?: number;
  keyword?: string;
}): string => {
  const baseUrl = '/search';
  const params = new URLSearchParams();

  // Add parameters only if they have values
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
