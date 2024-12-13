import { Pathnames } from "next-intl/routing";

export const locales = ["fa", "en"] as const;

export const defaultLocale = "fa";

export const pathnames = {
  "/": "/",
  "/pathnames": {
    fa: "/pathnames",
    en: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
