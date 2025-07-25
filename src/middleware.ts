import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
let secretKeyHS512: Uint8Array | undefined;

if (ACCESS_TOKEN_SECRET) {
  try {
    secretKeyHS512 = new TextEncoder().encode(ACCESS_TOKEN_SECRET);
  } catch (e) {
    console.error("Erro ao encodar ACCESS_TOKEN_SECRET:", e);
  }
} else {
  console.error(
    "ATENÇÃO: ACCESS_TOKEN_SECRET não está definido nas variáveis de ambiente!" +
    " O middleware de autenticação não funcionará corretamente."
  );
}

async function verifyAuthToken(tokenValue: string | undefined): Promise<boolean> {
  if (!tokenValue) {
    return false;
  }
  if (!secretKeyHS512) {
    console.error(
      "Middleware (verifyAuthToken): Chave secreta para HS512 não está configurada. " +
      "Verifique a variável de ambiente ACCESS_TOKEN_SECRET."
    );
    return false;
  }

  try {
    await jwtVerify(tokenValue, secretKeyHS512, {
      algorithms: ['HS512'], 
    });
    return true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.code === 'ERR_JWT_EXPIRED') {
    } else if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
      console.error(
        "Middleware: Assinatura do token inválida! " +
        "Verifique se o ACCESS_TOKEN_SECRET no .env.local é IDÊNTICO ao usado pelo backend para HS512."
      );
    }
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessTokenCookieName = 'access_token'; 
  const accessToken = request.cookies.get(accessTokenCookieName)?.value;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  if (pathname === '/login' || pathname.startsWith('/login/')) {
    return NextResponse.next();
  }

  const isAuthenticated = await verifyAuthToken(accessToken);

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};