import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing'; 

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  console.log("Locale nhận được:", locale);
  
  if (!locale || !['en', 'vi'].includes(locale)) {
    locale = 'vi';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
