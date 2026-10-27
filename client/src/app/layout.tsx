import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import NavBar from "@/components/navigation/nav-bar";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Khayam Sana",
  description:
    "From validation to execution, we give you the tools, guidance and community you need to build, launch and grow your business.",
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={rubik.variable}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
