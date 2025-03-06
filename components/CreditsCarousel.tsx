'use client';
import { TMDBPersonDetail } from '@/types';
import TitleItem from './TitleItem';
import TitleCarousel from './TitleCarousel';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useState } from 'react';
export default function CreditsCarousel({
  item,
  title,
  isCast = true,
}: {
  item: TMDBPersonDetail;
  title: string;
  isCast?: boolean;
}) {
  const { t } = useTranslation();
  const unduplicatedItems = isCast
    ? item.combined_credits.cast.filter(
        (cast, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === cast.id && t.media_type === cast.media_type
          )
      )
    : item.combined_credits.crew.filter(
        (crew, index, self) =>
          index ===
          self.findIndex(
            (t) => t.id === crew.id && t.media_type === crew.media_type
          )
      );
  const [size, setSize] = useState('525px');
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSize('400px');
    } else {
      setSize('525px');
    }
  }, [window.innerWidth]);
  return (
    <div className="flex flex-col gap-4">
      <TitleCarousel
        items={unduplicatedItems}
        renderItem={(item) => (
          <>
            <TitleItem
              type={
                isCast
                  ? (item.media_type as 'movie' | 'tv')
                  : (item.media_type as 'movie' | 'tv')
              }
              item={item}
            />
            <div>
              {isCast && <p>{`${t('as')} ${item.character}`}</p>}
              {!isCast && <p>{`${t('as')} ${item.job}`}</p>}
            </div>
          </>
        )}
        slideHeight={size}
        title={title}
        isHero={true}
        dragFree={true}
        autoplay={false}
        loop={true}
      />
    </div>
  );
}
