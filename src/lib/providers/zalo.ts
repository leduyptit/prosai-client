import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';
import { API_CONFIG } from '@/utils/env';

export interface ZaloProfile {
  id: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

export default function ZaloProvider(
  options: OAuthUserConfig<ZaloProfile>
): OAuthConfig<ZaloProfile> {
  return {
    id: 'zalo',
    name: 'Zalo',
    type: 'oauth',
    checks: ["pkce"], // Enable NextAuth's built-in PKCE support
    authorization: {
      url: 'https://oauth.zaloapp.com/v4/permission',
      params: {
        app_id: process.env.ZALO_APP_ID,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/zalo`,
        state: 'zalo_oauth',
        code_challenge: '', // Will be set automatically by NextAuth PKCE
        code_challenge_method: 'S256',
      },
    },
    token: {
      url: 'https://oauth.zaloapp.com/v4/access_token',
      async request({ client, params, checks, provider }) {
        // Ensure we have the required parameters
        if (!params.code) {
          throw new Error('Missing required parameter: code');
        }
        
        // Prepare request body for Zalo OAuth v4 format
        const body = new URLSearchParams({
          code: params.code,
          app_id: process.env.ZALO_APP_ID!,
          grant_type: 'authorization_code',
          code_verifier: checks.code_verifier as string, // Use the code_verifier from checks
        });

        // Add app_secret if available
        if (process.env.ZALO_APP_SECRET) {
          body.append('app_secret', process.env.ZALO_APP_SECRET);
        }

        // Prepare headers
        const headers: Record<string, string> = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        // Add secret_key header if available
        if (process.env.ZALO_APP_SECRET) {
          headers['secret_key'] = process.env.ZALO_APP_SECRET;
        }

        // Custom token exchange for Zalo OAuth v4 format
        const response = await fetch('https://oauth.zaloapp.com/v4/access_token', {
          method: 'POST',
          headers,
          body,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Zalo token exchange failed: ${response.status} ${errorText}`);
        }

        const responseText = await response.text();
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error('Invalid response format from Zalo');
        }

        // Check if we actually got a valid token response
        if (!data.access_token) {
          throw new Error('Zalo response missing access token');
        }

        return {
          tokens: {
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token,
          },
        };
      },
    },
    userinfo: {
      // request to prosai api backend
      url: `${API_CONFIG.baseUrl}/auth/social-login`,
      async request({ tokens, provider }) {
        const response = await fetch(`${API_CONFIG.baseUrl}/auth/social-login?access_token=${tokens.access_token}&provider=ZALO`, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Zalo userinfo failed: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        return data.user;
      },
    },
    profile(profile: ZaloProfile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.id + '@zalo.vn', // Create fake email from Zalo ID
        image: profile.picture?.data?.url,
      };
    },
    style: {
      logo: '/svgs/icon_zalo.svg',
      logoDark: '/svgs/icon_zalo.svg',
      bg: '#0068ff',
      text: '#ffffff',
      bgDark: '#0068ff',
      textDark: '#ffffff',
    },
    ...options,
  };
}
