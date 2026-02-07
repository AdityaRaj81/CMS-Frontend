import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/admin', '/profile', '/cases', '/documents', '/clients', '/calendar']
const authRoutes = ['/login', '/']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.includes(pathname)

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If accessing login with valid token, redirect to dashboard
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
