import Link from "next/link";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account"
            >
              Profile
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account/demo"
            >
              Account
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/account/appearance"
            >
              Appearance
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/notifications"
            >
              Notifications
            </Link>
            <Link
              className="inline-flex items-center gap-2 text-sm font-medium rounded-md py-2 px-4"
              href="/display"
            >
              Display
            </Link>
          </nav>
        </aside>

        <div>{children}</div>
      </div>
    </div>
  );
}
