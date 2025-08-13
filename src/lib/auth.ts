import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { corsApi } from '@/services/api';
import { ProSaiAuthResponse } from '@/types/prosai-api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔐 NextAuth authorize() called with:', { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password 
        });

        if (!credentials?.email || !credentials?.password) {
          console.error('❌ Missing credentials');
          return null;
        }

        try {
          console.log('🚀 Calling ProSai API via CORS-friendly method:', '/auth/login');
          
          // Try URL encoded format first
          let response: ProSaiAuthResponse;
          try {
            response = await corsApi.postUrlEncoded<ProSaiAuthResponse>('/auth/login', {
              email: credentials.email,
              password: credentials.password,
            });
          } catch (error: any) {
            // If URL encoded fails, try form data
            if (error.response?.status === 400 || error.response?.status === 415) {
              response = await corsApi.postForm<ProSaiAuthResponse>('/auth/login', {
                email: credentials.email,
                password: credentials.password,
              });
            } else {
              throw error;
            }
          }

          console.log('📡 ProSai API Response:', response);

          // ProSai API returns access_token and user directly
          if (response && response.access_token && response.user) {
            const user = {
              id: response.user.id,
              email: response.user.email,
              name: response.user.full_name || response.user.first_name || response.user.email,
              image: response.user.avatar || undefined, // Use undefined instead of null
              balance: response.user.balance, // Include balance
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            };
            console.log('✅ NextAuth authorize success:', user);
            return user;
          } else {
            console.error('❌ ProSai API response missing access_token or user');
            return null;
          }
        } catch (error: any) {
          console.error('❌ Authentication error:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
          });
          
          // Log specific error messages for debugging
          if (error.response?.status === 401) {
            console.error('❌ Login failed: Email hoặc mật khẩu không chính xác');
          } else if (error.response?.status === 403) {
            console.error('❌ Login failed: Tài khoản đã bị khóa hoặc chưa được xác thực');
          } else if (error.response?.status === 429) {
            console.error('❌ Login failed: Quá nhiều lần thử, vui lòng thử lại sau');
          } else if (error.response?.status >= 500) {
            console.error('❌ Login failed: Lỗi server, vui lòng thử lại sau');
          } else if (error.code === 'NETWORK_ERROR' || !error.response) {
            console.error('❌ Login failed: Không thể kết nối đến server');
          } else {
            console.error('❌ Login failed: Đã có lỗi xảy ra, vui lòng thử lại');
          }
          
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            balance: user.balance, // Include balance in JWT
          },
        };
      }

      // Return previous token if the access token has not expired yet
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
