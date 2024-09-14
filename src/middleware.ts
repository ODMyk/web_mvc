import {auth as _auth} from '@/lib/auth';
import {
  adminRoutes,
  apiAuthPrefix,
  AUTH_REDIRECT,
  authRoutes,
  DEFAULT_REDIRECT,
  publicRoutes,
} from '@/lib/routes';

export default _auth(req => {
  const {nextUrl, auth} = req;
  const isLoggedIn = !!auth;
  const isAdmin = !!auth?.user?.isAdmin;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(AUTH_REDIRECT, nextUrl));
  }
  if (!isAdmin && isAdminRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
