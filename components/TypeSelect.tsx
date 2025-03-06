'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export default function TypeSelect({
  value,
  onChange,
  isActive,
}: {
  value: string | null;
  onChange: (value: string) => void;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Select value={value || ''} onValueChange={onChange}>
      <SelectTrigger
        className={`w-full min-w-[180px] ${
          isActive ? 'bg-primary/20 border-primary' : ''
        }`}
      >
        <SelectValue placeholder={t('Type')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{t('All')}</SelectItem>
        <SelectItem value="movie">{t('Movies')}</SelectItem>
        <SelectItem value="tv">{t('TV Shows')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
