'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

export default function GenresFilter({
  selectedGenres,
  onChange,
  isActive,
}: {
  selectedGenres: number[];
  onChange: (genres: number[]) => void;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  const GENRES = [
    { id: 28, name: t('Action') },
    { id: 12, name: t('Adventure') },
    { id: 16, name: t('Animation') },
    { id: 35, name: t('Comedy') },
    { id: 80, name: t('Crime') },
    { id: 99, name: t('Documentary') },
    { id: 18, name: t('Drama') },
    { id: 10751, name: t('Family') },
    { id: 14, name: t('Fantasy') },
    { id: 36, name: t('History') },
    { id: 27, name: t('Horror') },
    { id: 10402, name: t('Music') },
    { id: 9648, name: t('Mystery') },
    { id: 10749, name: t('Romance') },
    { id: 878, name: t('Science Fiction') },
    { id: 10770, name: t('TV Movie') },
    { id: 53, name: t('Thriller') },
    { id: 10752, name: t('War') },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex gap-2 ${
            isActive ? 'bg-primary/20 border-primary' : ''
          }`}
        >
          {selectedGenres.length > 0 ? (
            <>
              {t('Selected')}{' '}
              <Badge variant="default" className="ml-2">
                {` ${GENRES.find((g) => g.id === selectedGenres[0])?.name} + ${
                  selectedGenres.length - 1
                }`}
              </Badge>
            </>
          ) : (
            t('Select Genre')
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <Badge
              key={genre.id}
              className={`cursor-pointer transition-all duration-100 active:scale-95 ${
                selectedGenres.includes(genre.id)
                  ? 'bg-blue-500 text-white hover:bg-blue-600 '
                  : ''
              }`}
              onClick={() =>
                onChange(
                  selectedGenres.includes(genre.id)
                    ? selectedGenres.filter((g) => g !== genre.id)
                    : [...selectedGenres, genre.id]
                )
              }
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
