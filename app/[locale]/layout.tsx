import { NextIntlClientProvider } from 'next-intl';
import Providers from '../providers';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
