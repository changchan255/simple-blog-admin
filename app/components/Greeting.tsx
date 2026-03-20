'use client';

import { useTranslations } from 'next-intl';

export default function Greeting() {
  const t = useTranslations('Greeting');

  return <p className="text-lg">{t('text')}</p>;
}
