import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Define protected routes
    const protectedRoutes = [
      '/account-overview',
      '/property/create',
      '/property/edit',
      '/user',
      '/chat-ai',
    ];

    // Define admin routes (if needed)
    const adminRoutes = [
      '/admin',
    ];

    // Check if the current path is protected
    const isProtectedRoute = protectedRoutes.some(route => 
      pathname.startsWith(route)
    );

    const isAdminRoute = adminRoutes.some(route => 
      pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !token) {
      const url = new URL('/auth/signin', req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Redirect to home if accessing admin route without admin role
    if (isAdminRoute && (!token || token.user?.role !== 'admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        const { pathname } = req.nextUrl;
        
        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/property',
          '/news',
          '/auth',
          '/api/auth',
        ];

        const isPublicRoute = publicRoutes.some(route => 
          pathname.startsWith(route)
        );

        if (isPublicRoute) {
          return true;
        }

        // For protected routes, require a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|images|svgs|videos).*)',
  ],
};
