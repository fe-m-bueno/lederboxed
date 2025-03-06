'use client';
import { TMDBWatchProvider } from '@/types';
import { useState } from 'react';
import AppCombobox from './AppCombobox';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
interface WatchProviderComboboxProps {
  providers: Record<string, TMDBWatchProvider>;
}

export default function WatchProviderCombobox({
  providers,
}: WatchProviderComboboxProps) {
  const countryOptions = Object.keys(providers || {}).map((countryCode) => ({
    value: countryCode,
    label:
      new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) ||
      countryCode,
  }));
  const { t } = useTranslation();

  const [selectedCountry, setSelectedCountry] = useState(
    countryOptions[0]?.value || 'EN'
  );
  const countryData = providers[selectedCountry];

  return (
    <div className="flex flex-col gap-2">
      <AppCombobox
        options={countryOptions}
        placeholder={t('Select Country')}
        onChange={setSelectedCountry}
      />
      {countryData ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-400">
            <span>{t('Available in')} </span>
            {selectedCountry}:
          </p>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(countryData.flatrate) &&
              countryData.flatrate.map((service) => (
                <div
                  key={service.provider_id}
                  className="flex flex-col items-center"
                >
                  <Link
                    href={countryData.link}
                    target="_blank"
                    className="text-blue-400 text-sm"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w45${service.logo_path}`}
                      alt={service.provider_name}
                      className="rounded-md w-10 h-10"
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-sm">
          {t('No information available for this country')}
        </p>
      )}
    </div>
  );
}
