'use client';

import Stars from '@/components/TitleStars';
import Link from 'next/link';
import { TMDBMovie, TMDBTV } from '@/types';
import { Skeleton } from './ui/skeleton';

interface TitleItemProps {
  item: TMDBMovie | TMDBTV;
  type: 'movie' | 'tv';
}

export default function TitleItem({ item, type }: TitleItemProps) {
  if (!item) return null;
  return (
    <Link href={`/${type}/${item.id}`}>
      <div className="~w-[12rem]/[17.5rem] ~h-[22rem]/[28rem] rounded-lg overflow-hidden ">
        <div className="w-full ~h-[18.5rem]/[25rem] rounded-lg overflow-hidden shadow-lg dark:shadow-white/10 ">
          {item.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={(item as TMDBMovie).title || (item as TMDBTV).name}
              className="w-full ~h-[18.5rem]/[25rem] object-cover rounded-lg scale-100 transition-transform duration-500 ease-out hover:scale-105"
            />
          ) : (
            <Skeleton className="w-full ~h-[18.5rem]/[25rem] rounded-lg" />
          )}
        </div>
        <div className="mt-2">
          <h2 className="text-sm font-bold truncate">
            {(item as TMDBMovie).title || (item as TMDBTV).name}
          </h2>
          <div className="flex flex-row items-center justify-start gap-2">
            <Stars rating={item.vote_average} />
            <p className="text-sm text-gray-500">
              {Math.round(item.vote_average * 10) / 10}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
