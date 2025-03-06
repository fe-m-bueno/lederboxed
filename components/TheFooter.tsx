'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function TheFooter() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-slate-950 text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 justify-start md:justify-center items-start md:items-center ~text-xs/base text-wrap">
            <span className="hidden md:block">{t('Data provided by:')}</span>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Image
                src="/tmdb.svg"
                alt="TMDB"
                width={100}
                height={100}
                className="~w-16/24"
              />
              <Image
                src="/JW.svg"
                alt="JustWatch"
                width={100}
                height={100}
                className="~w-16/24"
              />
            </div>
          </div>
          <span className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ~text-sm/base">
            ©2025 <Link href="https://www.felipe-bueno.com/">Felipe Bueno</Link>
          </span>
          <div className="flex flex-col gap-2 text-sm ">
            <Link href="/" className="text-white/50 hover:text-white underline">
              {t('Home')}
            </Link>
            <Link
              href="/movies"
              className="text-white/50 hover:text-white underline"
            >
              {t('Movies')}
            </Link>
            <Link
              href="/tv"
              className="text-white/50 hover:text-white underline"
            >
              {t('TV Shows')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
