import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants';

export interface StatisticsResponse {
  type: string;
  date: string;
  data: {
    date: string;
    market: {
      real_value: number;
      transaction_gap: number;
      interest_rate_change: string;
    };
    highlights: {
      buyers: number;
      potential_customers: number;
      ai_matching_accuracy: string;
      matching_speed: string;
    };
  };
}

export const fetchStatistics = async (date: string = new Date().toISOString().split('T')[0]): Promise<StatisticsResponse> => {
  try {
    const response = await apiClient.get<StatisticsResponse>(API_ENDPOINTS.STATISTICS.BASE, {
      params: { type: 'header_statistic', date }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Return fallback data if API fails
    return {
      type: "header_statistic",
      date: date,
      data: {
        date: date,
        market: {
          real_value: 19000,
          transaction_gap: 5000,
          interest_rate_change: "+18%"
        },
        highlights: {
          buyers: 1000000,
          potential_customers: 100000,
          ai_matching_accuracy: "100%",
          matching_speed: "1s"
        }
      }
    };
  }
};
