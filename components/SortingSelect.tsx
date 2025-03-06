'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUp } from 'lucide-react';
export default function SortingSelect({
  value,
  onChange,
  type,
}: {
  value: string;
  onChange: (value: string) => void;
  type: string;
}) {
  const { t } = useTranslation();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full min-w-[180px]">
        <SelectValue placeholder={t('Sort by')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popularity.desc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Popularity')}
            <ArrowDown className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem value="popularity.asc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Popularity')}
            <ArrowUp className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem
          value={`${
            type === 'movie' ? 'release_date.desc' : 'first_air_date.desc'
          }`}
        >
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Release date')}
            <ArrowDown className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem
          value={`${
            type === 'movie' ? 'release_date.asc' : 'first_air_date.asc'
          }`}
        >
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Release date')}
            <ArrowUp className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem value="vote_average.desc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('User Score')}
            <ArrowDown className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem value="vote_average.asc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('User Score')}
            <ArrowUp className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem value="revenue.desc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Revenue')}
            <ArrowDown className="w-4 h-4" />
          </div>
        </SelectItem>
        <SelectItem value="revenue.asc">
          <div className="flex flex-row justify-between gap-2 items-center">
            {t('Revenue')}
            <ArrowUp className="w-4 h-4" />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
