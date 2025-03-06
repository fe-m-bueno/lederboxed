'use client';

import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Stars from './TitleStars';

interface Top10TitleItemProps {
  movie: any;
  index: number;
}

export default function Top10TitleItem({ movie, index }: Top10TitleItemProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={`/movie/${movie.id}`}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 bg-gradient-to-br from-black/100 via-black/10 to-black/0 w-full h-full z-10" />
                <div className="absolute top-0 ~left-1/5 w-fit h-fit bg-gradient-to-br from-violet-200 via-indigo-600 to-sky-400 bg-clip-text text-transparent z-10">
                  <p className="~text-7xl/9xl font-bold">{index + 1}</p>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover scale-100 transition-transform duration-500 ease-out hover:scale-105"
                />
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{movie.title}</p>
          <div className="flex flex-row items-center justify-start gap-2">
            <Stars rating={movie.vote_average} />
            <p>{Math.round(movie.vote_average * 10) / 10}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
