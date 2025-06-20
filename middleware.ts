// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const response = I18nMiddleware(request);
  const searchParams = request.nextUrl.searchParams.toString();

  response.headers.set("searchParams", searchParams);

  if (request.nextUrl.pathname.includes("/dashboard")) {
    const session = getSessionCookie(request);

    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|static|_next|manifest.json|scripts/pixel.js|favicon.ico|robots.txt|service-worker\\.js|images|icons|sitemap.xml).*)"],
};
