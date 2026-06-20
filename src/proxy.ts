import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n-config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );
  if (hasLocale) return;

  const accept = request.headers.get("accept-language") ?? "";
  const langs = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());

  let locale: Locale = defaultLocale;
  for (const code of langs) {
    if ((locales as readonly string[]).includes(code)) {
      locale = code as Locale;
      break;
    }
    const primary = code.split("-")[0];
    if ((locales as readonly string[]).includes(primary)) {
      locale = primary as Locale;
      break;
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
