export interface SuggestionItem {
  id: string;
  title: string;
  location: string;
  type: string;
}

export const fetchSuggestions = async (keyword: string, limit: number = 10): Promise<SuggestionItem[]> => {
  try {
    const response = await fetch(`https://api-v1.prosai.vn/suggestions/address?keyword=${encodeURIComponent(keyword)}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SuggestionItem[] = await response.json();
    
    // API returns array directly, not wrapped in success/data structure
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn('Suggestions API returned unexpected format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    // Return empty array if API fails
    return [];
  }
};
