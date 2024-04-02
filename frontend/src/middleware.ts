import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateToken } from './utils/tokenUtils'
import { JWTVerifyResult, JWTPayload } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('authToken')
  const authToken = authCookie?.value
  const response = NextResponse.next()
  let validatedToken: JWTVerifyResult<JWTPayload> | undefined
  if (!authToken) {
    //response.cookies.delete('authToken')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  try {
    validatedToken = await validateToken(authToken)
  } catch (error) {
    console.error(error)
    response.cookies.delete('authToken')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api/login|api/signup|login|signup|_next/static|_next/image|favicon.ico).*)',
  ],
}
