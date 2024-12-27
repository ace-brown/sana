import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import Main from "@/components/dashboard/main";

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Main>{children}</Main>
    </NextIntlClientProvider>
  );
}
