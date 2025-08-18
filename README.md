# ProSai Client

A Next.js application for the ProSai real estate platform.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Authentication
- `NEXTAUTH_SECRET` - Secret key for NextAuth.js
- `NEXTAUTH_URL` - Your application URL (e.g., http://localhost:3000)

### ProSai API
- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the ProSai backend API

### OAuth Providers

#### Google
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

#### Facebook
- `FACEBOOK_CLIENT_ID` - Facebook OAuth app ID
- `FACEBOOK_CLIENT_SECRET` - Facebook OAuth app secret

#### Zalo
- `ZALO_APP_ID` - Zalo OAuth app ID
- `ZALO_APP_SECRET` - Zalo OAuth app secret
- `ZALO_REDIRECT_URI` - Zalo OAuth redirect URI (optional, defaults to `${NEXTAUTH_URL}/api/auth/callback/zalo`)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Set up environment variables (see above)

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Zalo OAuth Setup

The application supports Zalo OAuth v4 with PKCE (Proof Key for Code Exchange) using NextAuth.js v4.21.0+ built-in PKCE support.

### Configuration Steps:

1. **Create a Zalo App**:
   - Go to [Zalo Developers](https://developers.zalo.me/)
   - Create a new app
   - Note down your App ID and App Secret

2. **Configure OAuth Settings**:
   - Set the redirect URI to: `https://yourdomain.com/api/auth/callback/zalo`
   - For development: `http://localhost:3000/api/auth/callback/zalo`

3. **Environment Variables**:
   ```env
   ZALO_APP_ID=your_zalo_app_id
   ZALO_APP_SECRET=your_zalo_app_secret
   ZALO_REDIRECT_URI=https://yourdomain.com/api/auth/callback/zalo
   ```

4. **Usage**:
   ```tsx
   import { ZaloLoginButton } from '@/components/features/auth';
   
   <ZaloLoginButton>Đăng nhập với Zalo</ZaloLoginButton>
   ```

### OAuth Flow:

1. User clicks Zalo login button
2. NextAuth generates PKCE code verifier and challenge automatically
3. User is redirected to Zalo OAuth with code challenge
4. Zalo redirects back to NextAuth callback with authorization code
5. NextAuth exchanges code for access token using code verifier
6. Access token is used to get user info and create/login user via ProSai API

### Technical Details:

- **PKCE Support**: Uses NextAuth.js built-in PKCE support with `checks: ["pkce"]`
- **Token Exchange**: Custom handler for Zalo's OAuth v4 format (app_id/app_secret)
- **Integration**: Seamlessly integrates with NextAuth's session management

## Features

- **Responsive Design**: Mobile-first approach with desktop and mobile layouts
- **Authentication**: Multiple OAuth providers (Google, Facebook, Zalo) + credentials
- **Property Management**: View, search, and manage real estate properties
- **AI Integration**: AI-powered property ratings and recommendations
- **User Dashboard**: Account management, membership plans, and post management

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js v4.21.0+ with built-in PKCE support
- **State Management**: React hooks
- **API**: Axios with CORS handling
- **UI Components**: Custom component library

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── features/        # Feature-specific components
│   ├── shared/          # Shared components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── services/           # API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
