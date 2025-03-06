'use client';

import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import { useTranslation } from 'react-i18next';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

interface CarouselProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  slideSize?: string;
  loop?: boolean;
  dragFree?: boolean;
  autoplay?: boolean;
  className?: string;
  slideHeight?: string;
  exploreLink?: string;
  queryParams?: string;
  title?: string;
  isHero?: boolean;
}

export default function TitleCarousel({
  items,
  renderItem,
  slideSize,
  loop = true,
  dragFree = false,
  autoplay = false,
  slideHeight = '300px',
  className = '',
  title,
  exploreLink,
  queryParams,
  isHero = false,
}: CarouselProps) {
  const { t } = useTranslation();
  return (
    <div className={`${isHero ? 'w-full' : 'w-[80%]'}`}>
      {(title || exploreLink) && (
        <div className="flex justify-between items-center mb-4 px-2">
          {title && (
            <h2 className="~text-base/xl font-bold">{t(`${title}`)}</h2>
          )}
          {exploreLink && (
            <Link
              href={`${exploreLink}?${queryParams || 'page'}=1`}
              className="~text-xs/sm text-nowrap text-blue-400 hover:underline"
            >
              {t('Explore more')} →
            </Link>
          )}
        </div>
      )}

      <ShadCarousel
        opts={{
          loop,
          dragFree,
        }}
        plugins={
          autoplay
            ? [
                Autoplay({
                  delay: 8000,
                  stopOnMouseEnter: true,
                  stopOnInteraction: false,
                }),
              ]
            : []
        }
        className={`w-full ${className} h-full`}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={item?.id || index}
              className={`${slideSize ? `basis-${slideSize}` : 'basis-auto'}`}
              style={{ height: `${slideHeight}` }}
            >
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={`${isHero ? 'absolute top-1/2 left-4' : ''}`}
        />
        <CarouselNext
          className={`${isHero ? 'absolute top-1/2 right-4' : ''}`}
        />
      </ShadCarousel>
    </div>
  );
}
