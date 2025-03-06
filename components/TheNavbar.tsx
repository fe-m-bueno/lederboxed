'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import AppSearchbar from './AppSearchbar';
import MenuHoverDropdown from './MenuHoverDropdown';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserCountry } from '@/hooks/useUserCountry';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
export default function TheNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2))
    .toISOString()
    .split('T')[0];

  const country = useUserCountry();

  return (
    <nav
      className={`fixed top-0 left-0 1.5xl:left-0 right-0 z-50 flex flex-row justify-between items-center py-4 px-6 1.5xl:px-12 w-[95%] mx-auto rounded-b-3xl transition-all duration-200 ease-out ${
        isScrolled && !isOpen
          ? ' bg-background/65 backdrop-blur-lg shadow-lg'
          : 'shadow-none'
      }`}
    >
      <div className="flex flex-row items-center gap-6">
        <Link
          href="/"
          className="text-2xl font-hand font-bold mr-12 1.5xl:mr-24"
        >
          <span className="text-orange-500 ">leder</span>
          <span className="text-green-500 ">box</span>
          <span className="text-cyan-500">ed</span>
        </Link>
        <div className="hidden 1.5xl:flex flex-row items-center gap-6">
          <MenuHoverDropdown
            title={t('Movies')}
            items={[
              {
                label: t('Popular'),
                href: '/discover?type=movie&sort_by=popularity.desc&vote_count.gte=300',
              },
              {
                label: t('Top Rated'),
                href: '/discover?type=movie&sort_by=vote_average.desc&vote_count.gte=600',
              },
              {
                label: t('In Theaters'),
                href: `/discover?type=movie&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${twoMonthsAgo}&release_date.lte=${today}`,
              },
            ]}
          />
          <MenuHoverDropdown
            title={t('TV Shows')}
            items={[
              {
                label: t('Popular'),
                href: '/discover?type=tv&sort_by=popularity.desc&vote_count.gte=100',
              },
              {
                label: t('Top Rated'),
                href: '/discover?type=tv&sort_by=vote_average.desc&vote_count.gte=600',
              },
              {
                label: t('On The Air'),
                href: '/discover?type=tv&sort_by=first_air_date.desc&first_air_date.gte=2024-01-01&first_air_date.lte=2024-12-31',
              },
            ]}
          />
          <MenuHoverDropdown
            title={t('Genres')}
            items={[
              { label: t('Action'), href: '/discover?with_genres=28' },
              {
                label: t('Comedy'),
                href: '/discover?with_genres=35',
              },
              {
                label: t('Drama'),
                href: '/discover?with_genres=18',
              },
              {
                label: t('Adventure'),
                href: '/discover?with_genres=12',
              },
              {
                label: t('Horror'),
                href: '/discover?with_genres=27',
              },
              {
                label: t('Crime'),
                href: '/discover?with_genres=80',
              },
              {
                label: t('Science Fiction'),
                href: '/discover?with_genres=878',
              },
              {
                label: t('Animation'),
                href: '/discover?with_genres=16',
              },
              {
                label: t('Family'),
                href: '/discover?with_genres=10751',
              },
              {
                label: t('Mystery'),
                href: '/discover?with_genres=9648',
              },
              {
                label: t('Romance'),
                href: '/discover?with_genres=10749',
              },
              {
                label: t('History'),
                href: '/discover?with_genres=36',
              },
              {
                label: t('Suspense'),
                href: '/discover?with_genres=53',
              },
              {
                label: t('Documentary'),
                href: '/discover?with_genres=99',
              },
              {
                label: t('Musical'),
                href: '/discover?with_genres=10402',
              },
            ]}
          />
          {country && (
            <MenuHoverDropdown
              title="Streamings"
              items={[
                {
                  label: 'Netflix',
                  href: `/discover?with_watch_providers=8&watch_region=${country}`,
                },
                {
                  label: 'Prime Video',
                  href: `/discover?with_watch_providers=119&watch_region=${country}`,
                },
                {
                  label: 'Disney Plus',
                  href: `/discover?with_watch_providers=337&watch_region=${country}`,
                },
                {
                  label: 'Apple TV+',
                  href: `/discover?with_watch_providers=350&watch_region=${country}`,
                },
                {
                  label: 'Max',
                  href: `/discover?with_watch_providers=1899&watch_region=${country}`,
                },
                {
                  label: 'Crunchyroll',
                  href: `/discover?with_watch_providers=283&watch_region=${country}`,
                },
              ]}
            />
          )}
        </div>
      </div>
      <div className="hidden 1.5xl:flex flex-row items-center gap-8">
        <div className="~w-44/96">
          <AppSearchbar />
        </div>
        <LanguageSelector />
        <ThemeToggle />
      </div>
      <div className="1.5xl:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <div
        className={`fixed top-0 -left-6 w-full max-w-2xl h-full bg-background shadow-lg transform transition-transform z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } 1.5xl:hidden`}
      >
        <div className="flex flex-col p-12 gap-6 justify-between">
          <div className="flex flex-row justify-between">
            <Link
              href="/"
              className="text-2xl font-hand font-bold"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-orange-500">leder</span>
              <span className="text-green-500">box</span>
              <span className="text-cyan-500">ed</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="self-end"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="w-full z-50">
            <AppSearchbar />
          </div>

          <div className="flex flex-col justify-around gap-4">
            <div className="z-40">
              <MenuHoverDropdown
                title={t('Movies')}
                items={[
                  {
                    label: t('Popular'),
                    href: '/discover?type=movie&sort_by=popularity.desc&vote_count.gte=300',
                  },
                  {
                    label: t('Top Rated'),
                    href: '/discover?type=movie&sort_by=vote_average.desc&vote_count.gte=600',
                  },
                  {
                    label: t('In Theaters'),
                    href: `/discover?type=movie&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${twoMonthsAgo}&release_date.lte=${today}`,
                  },
                ]}
              />
            </div>
            <div className="z-30">
              <MenuHoverDropdown
                title={t('TV Shows')}
                items={[
                  {
                    label: t('Popular'),
                    href: '/discover?type=tv&sort_by=popularity.desc&vote_count.gte=100',
                  },
                  {
                    label: t('Top Rated'),
                    href: '/discover?type=tv&sort_by=vote_average.desc&vote_count.gte=600',
                  },
                  {
                    label: t('On The Air'),
                    href: '/discover?type=tv&sort_by=first_air_date.desc&first_air_date.gte=2024-01-01&first_air_date.lte=2024-12-31',
                  },
                ]}
              />
            </div>
            <div className="z-20">
              <MenuHoverDropdown
                title={t('Genres')}
                items={[
                  { label: t('Action'), href: '/discover?with_genres=28' },
                  {
                    label: t('Comedy'),
                    href: '/discover?with_genres=35',
                  },
                  {
                    label: t('Drama'),
                    href: '/discover?with_genres=18',
                  },
                  {
                    label: t('Explore'),
                    href: '/discover',
                  },
                ]}
              />
            </div>
            <div className="z-10">
              {country && (
                <MenuHoverDropdown
                  title="Streamings"
                  items={[
                    {
                      label: 'Netflix',
                      href: `/discover?with_watch_providers=8&watch_region=${country}`,
                    },
                    {
                      label: 'Prime Video',
                      href: `/discover?with_watch_providers=119&watch_region=${country}`,
                    },
                    {
                      label: 'Disney Plus',
                      href: `/discover?with_watch_providers=337&watch_region=${country}`,
                    },
                    {
                      label: 'Apple TV+',
                      href: `/discover?with_watch_providers=350&watch_region=${country}`,
                    },
                    {
                      label: 'Max',
                      href: `/discover?with_watch_providers=1899&watch_region=${country}`,
                    },
                    {
                      label: 'Crunchyroll',
                      href: `/discover?with_watch_providers=283&watch_region=${country}`,
                    },
                  ]}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-between">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
