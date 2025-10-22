import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { corsApi } from '@/services/api';
import { API_ENDPOINTS } from '@/constants';

export interface TokenCredentials {
  token: string;
}

export interface TokenAuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      full_name: string;
      avatar?: string;
      balance?: string;
      role?: string;
    };
  };
}

export interface UserData {
  id: string;
  email: string;
  full_name?: string;
  name?: string;
  avatar?: string;
  image?: string;
  balance?: string;
  role?: string;
}

export default function TokenProvider(): NextAuthOptions['providers'][0] {
  return CredentialsProvider({
    id: 'token',
    name: 'Token Authentication',
    credentials: {
      token: { label: 'Token', type: 'text' }
    },
    async authorize(credentials) {
      console.log('TokenProvider: Starting token verification...');
      
      if (!credentials?.token) {
        console.log('TokenProvider: No token provided');
        return null;
      }

      try {
        console.log('TokenProvider: Verifying token with backend...', credentials.token.substring(0, 10) + '...');
        
        // Verify the token with the backend
        const response = await corsApi.get<TokenAuthResponse>(
          `${API_ENDPOINTS.AUTH.VERIFY_TOKEN}?token=${encodeURIComponent(credentials.token)}`
        );

        console.log('TokenProvider: Backend response:', response);

        // Handle different response structures
        let userData: UserData | null = null;
        
        if (response && typeof response === 'object') {
          // Check if response has success property
          if ('success' in response && response.success && response.data?.user) {
            userData = response.data.user as UserData;
          }
          // Check if response is the user data directly
          else if ('id' in response && 'email' in response) {
            userData = response as UserData;
          }
          // Check if response has user property
          else if ('user' in response && response.user) {
            userData = response.user as UserData;
          }
        }

        if (userData) {
          console.log('TokenProvider: Token verification successful, user:', userData);
          
          return {
            id: userData.id,
            email: userData.email,
            name: userData.full_name || userData.name || userData.email,
            image: userData.avatar || userData.image,
            // Custom fields for our app
            balance: userData.balance,
            role: userData.role,
            accessToken: credentials.token,
            refreshToken: undefined, // Token-based auth doesn't provide refresh token
            provider: 'credentials' as const, // Use credentials as provider type
          };
        } else {
          console.log('TokenProvider: Invalid response structure:', response);
          return null;
        }
      } catch (error) {
        console.error('TokenProvider: Token verification failed:', error);
        return null;
      }
    }
  });
}
