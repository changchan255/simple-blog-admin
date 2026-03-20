import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlProxy = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
});

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/");
  const locale = segments[1];

  const isPostRoute = pathname.startsWith(`/${locale}/posts`);

  // auth
  if (isPostRoute && !token) {
    return NextResponse.redirect(
      new URL(`/${locale}/login`, req.url)
    );
  }

  // i18n
  return intlProxy(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
