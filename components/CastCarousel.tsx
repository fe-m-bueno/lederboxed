import { TMDBTVDetail } from '@/types';
import { TMDBMovieDetail } from '@/types';
import TitleCarousel from './TitleCarousel';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CastCarousel({
  item,
  isCast = true,
  title,
}: {
  item: TMDBMovieDetail | TMDBTVDetail;
  isCast?: boolean;
  title: string;
}) {
  const unduplicatedItems = isCast
    ? item.credits?.cast.filter(
        (cast, index, self) => index === self.findIndex((t) => t.id === cast.id)
      )
    : item.credits?.crew.filter(
        (crew, index, self) => index === self.findIndex((t) => t.id === crew.id)
      );

  const [size, setSize] = useState('500px');
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSize('350px');
    } else {
      setSize('500px');
    }
  }, [window.innerWidth]);

  return (
    <div className="flex flex-col gap-4">
      <TitleCarousel
        items={unduplicatedItems || []}
        renderItem={(item) => (
          <div
            key={item.id}
            className="flex flex-col items-start justify-start gap-2 pl-4"
          >
            <Link href={`/person/${item.id}`}>
              {item.profile_path ? (
                <div className="relative ~w-[12rem]/[17.5rem] ~h-[18rem]/[25rem] overflow-hidden rounded-lg border-2 border-gray-400">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt={item.name}
                    className="w-full h-full rounded-lg object-cover  transition-all duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              ) : (
                <img
                  src={'/person_placeholder.webp'}
                  alt={item.name}
                  className="w-full ~h-[18rem]/[25rem] rounded-lg object-cover border-2 border-gray-400"
                />
              )}
            </Link>
            <div className="flex flex-col">
              <div>{item.name}</div>
              {isCast ? (
                <div className="text-sm">{item.character}</div>
              ) : (
                <div className="text-sm">{item.job}</div>
              )}
            </div>
          </div>
        )}
        loop={false}
        slideHeight={size}
        dragFree={true}
        autoplay={false}
        isHero={true}
        title={title}
      />
    </div>
  );
}
