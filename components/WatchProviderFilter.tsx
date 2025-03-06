import { useTMDBFetcher } from '@/hooks/useTMDB';
import { useUserCountry } from '@/hooks/useUserCountry';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppCombobox from './AppCombobox';

export default function WatchProviderFilter({
  value,
  onChange,
  isActive,
}: {
  value: string;
  onChange: (value: string) => void;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  const country = useUserCountry();
  const { data, loading } = useTMDBFetcher([
    `/watch/providers/tv/${country}?`,
    `/watch/providers/movie/${country}?`,
  ]);

  return (
    <AppCombobox
      options={data[0]}
      placeholder="Escolha um provedor"
      onChange={onChange}
    />
  );
}
