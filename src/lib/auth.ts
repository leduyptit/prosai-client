import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import ZaloProvider from './providers/zalo';
import TokenProvider from './providers/token';
import { corsApi } from '@/services/api';
import { ProSaiAuthResponse } from '@/types/prosai-api';

// Helper function to handle social login callback
async function handleSocialLoginCallback(
  user: { 
    id?: string; 
    email?: string; 
    name?: string; 
    avatar_url?: string; 
    balance?: string; 
    role?: string; 
    accessToken?: string; 
    refreshToken?: string; 
    provider?: 'google' | 'facebook' | 'zalo' | 'credentials';

  }, 
  accessToken: string, 
  provider: 'GOOGLE' | 'FACEBOOK' | 'ZALO'
): Promise<boolean> {
  try {    
    const response = await corsApi.get<ProSaiAuthResponse>(`/auth/social-login?access_token=${encodeURIComponent(accessToken)}&provider=${provider}`);
    
    if (response && response.access_token && response.user) {
        user.id = response.user.id;
        user.email = response.user.email;
        user.name = response.user.full_name || response.user.email;
        user.avatar_url = response.user.avatar || undefined;
        user.balance = response.user.balance;
        user.role = response.user.role;
        user.accessToken = response.access_token;
        user.refreshToken = response.refresh_token;
        user.provider = provider.toLowerCase() as 'google' | 'facebook' | 'zalo';
      
      return true;
    } else {
      return false;
    }
  } catch (error: unknown) {
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  // Cookie configuration for PKCE support
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false, // Set to false for development, true for production
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try URL encoded format first
          let response: ProSaiAuthResponse;
          try {
            response = await corsApi.postUrlEncoded<ProSaiAuthResponse>('/auth/login', {
              email: credentials.email,
              password: credentials.password,
            });
          } catch (error: unknown) {
            // If URL encoded fails, try form data
            const axiosError = error as { response?: { status?: number } };
            if (axiosError.response?.status === 400 || axiosError.response?.status === 415) {
              response = await corsApi.postForm<ProSaiAuthResponse>('/auth/login', {
                email: credentials.email,
                password: credentials.password,
              });
            } else {
              throw error;
            }
          }

          // ProSai API returns access_token and user directly
          if (response && response.access_token && response.user) {
            const user = {
              id: response.user.id,
              email: response.user.email,
              name: response.user.full_name || response.user.email,
              avatar_url: response.user.avatar || undefined, // Add avatar_url for custom usage
              balance: response.user.balance, // Include balance
              role: response.user.role, // Include role
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
              provider: 'credentials' as const, // Set provider for credentials login
            };
            return user;
          } else {
            return null;
          }
        } catch (error: unknown) {
          return null;
        }
      }
    }),
    TokenProvider(),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    ZaloProvider({
      clientId: process.env.ZALO_APP_ID || '',
      clientSecret: process.env.ZALO_APP_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle token authentication (using credentials provider with token)
      if (account?.provider === 'credentials' && (user as any).accessToken && (user as any).provider === 'credentials') {
        (user as any).provider = 'token';
        return true;
      }
      
      // Handle social login callbacks - bypass NextAuth credentials flow
      if (account?.provider === 'google' && account.access_token) {
        // Set provider before calling callback
        (user as any).provider = 'google';
        return await handleSocialLoginCallback(user, account.access_token, 'GOOGLE');
      }
      
      // Handle Facebook login callback - bypass NextAuth credentials flow
      if (account?.provider === 'facebook' && account.access_token) {
        // Set provider before calling callback
        (user as any).provider = 'facebook';
        return await handleSocialLoginCallback(user, account.access_token, 'FACEBOOK');
      }
      
      // Handle Zalo login callback - bypass NextAuth credentials flow
      if (account?.provider === 'zalo' && account.access_token) {
        // Set provider before calling callback
        (user as any).provider = 'zalo';
        return await handleSocialLoginCallback(user, account.access_token, 'ZALO');
      }
      
      // For credentials login, continue with normal flow
      if (account?.provider === 'credentials') {
        (user as any).provider = 'credentials';
        return true;
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // For token authentication
        if (account.provider === 'credentials' && (user as any).provider === 'token') {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: (user as any).avatar_url || user.image,
            balance: user.balance,
            role: user.role,
            provider: 'token',
          };
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: userData,
          } as any;
        }
        
        // For social login, user data is already updated in signIn callback
        if (account.provider === 'google' || account.provider === 'facebook' || account.provider === 'zalo') {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar_url: (user as any).avatar_url || user.image, // Add avatar_url for custom usage
            balance: user.balance,
            role: user.role,
            provider: user.provider || account.provider, // Use user.provider if available, fallback to account.provider
          };
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: userData,
          } as any;
        }
        
        // For credentials login, use data from ProSai API response
        if (account.provider === 'credentials') {
          const userData = {
            id: user.id,
            email: user.email,
            name: user.name,  
            avatar_url: (user as any).avatar_url, // Add avatar_url for custom usage
            balance: user.balance,
            role: user.role,
            provider: user.provider || 'credentials', // Use user.provider if available, fallback to 'credentials'
          };
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: userData,
          };
        }
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
