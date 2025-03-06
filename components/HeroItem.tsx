'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { TMDBMovie } from '@/types';
import { useTranslation } from 'react-i18next';
interface HeroItemProps {
  movie: TMDBMovie;
}

export default function HeroItem({ movie }: HeroItemProps) {
  const { t } = useTranslation();
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none shadow-lg dark:shadow-white/10">
        <div className="absolute bottom-6 left-6 md:w-1/2 w-full flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-4 pr-16 md:pr-0 ">
          <h2 className="~text-lg/4xl font-bold text-white">{movie.title}</h2>
          <p className="~text-sm/base text-white text-pretty hidden md:block">
            {movie.overview}
          </p>
          <Link href={`/movie/${movie.id}`}>
            <Button className="bg-white text-black pointer-events-auto hover:bg-gray-200 ~text-sm/base">
              {t('See more')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
