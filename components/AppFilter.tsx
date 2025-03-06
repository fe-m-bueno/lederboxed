'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import SortingSelect from './SortingSelect';
import ReleaseDateFilter from './ReleaseDateFilter';
import GenresFilter from './GenresFilter';
import UserScoreFilter from './UserScoreFilter';
import MinVotesFilter from './MinVotesFilter';
import RuntimeFilter from './RuntimeFilter';
import { Filter } from 'lucide-react';
import TypeSelect from './TypeSelect';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
export default function AppFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [filters, setFilters] = useState<{
    sorting: string;
    releaseFrom: string;
    releaseTo: string;
    genres: number[];
    userScore: number;
    minVotes: number;
    runtime: number;
    type: string;
    with_companies: number[];
    with_networks: number[];
    watch_region: string;
    watch_providers: string;
  }>({
    sorting: 'popularity.desc',
    releaseFrom: '',
    releaseTo: '',
    genres: [],
    userScore: 0,
    minVotes: 0,
    runtime: 0,
    type: 'all',
    with_companies: [],
    with_networks: [],
    watch_region: '',
    watch_providers: '',
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setFilters({
      sorting: searchParams.get('sort_by') || 'popularity.desc',
      releaseFrom: searchParams.get('primary_release_date.gte') || '',
      releaseTo: searchParams.get('primary_release_date.lte') || '',
      genres: searchParams.get('with_genres')?.split(',').map(Number) || [],
      userScore: Number(searchParams.get('vote_average.gte')) || 0,
      minVotes: Number(searchParams.get('vote_count.gte')) || 0,
      runtime: Number(searchParams.get('with_runtime.gte')) || 0,
      type: searchParams.get('type') || 'all',
      with_companies:
        searchParams.get('with_companies')?.split(',').map(Number) || [],
      with_networks:
        searchParams.get('with_networks')?.split(',').map(Number) || [],
      watch_region: searchParams.get('watch_region') || '',
      watch_providers: searchParams.get('with_watch_providers') || '',
    });
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams();

    params.set('sort_by', filters.sorting);

    if (filters.releaseFrom)
      params.set(
        filters.type === 'movie'
          ? 'primary_release_date.gte'
          : 'first_air_date.gte',
        filters.releaseFrom
      );
    if (filters.releaseTo)
      params.set(
        filters.type === 'movie'
          ? 'primary_release_date.lte'
          : 'first_air_date.lte',
        filters.releaseTo
      );

    if (filters.genres.length > 0) {
      params.set('with_genres', filters.genres.join('|'));
    }

    params.set('vote_average.gte', filters.userScore.toString());

    params.set('vote_count.gte', filters.minVotes.toString());

    params.set('with_runtime.gte', filters.runtime.toString());

    if (filters.with_companies.length > 0) {
      params.set('with_companies', filters.with_companies.join('|'));
    }
    if (filters.with_networks.length > 0) {
      params.set('with_networks', filters.with_networks.join('|'));
    }

    if (filters.type !== 'all') {
      params.set('type', filters.type);
    }

    if (filters.watch_region) {
      params.set('watch_region', filters.watch_region);
    }

    if (filters.watch_providers) {
      params.set('with_watch_providers', filters.watch_providers);
    }
    params.set('include_adult', 'false');

    router.push(`/discover?${params.toString()}`);
  };
  const hasFilters =
    filters.releaseFrom ||
    filters.releaseTo ||
    filters.genres.length > 0 ||
    filters.userScore > 0 ||
    filters.minVotes > 0 ||
    filters.runtime > 0 ||
    filters.with_companies.length > 0;

  const resetFilters = () => {
    router.push('/discover');
  };
  return (
    <>
      <div className="hidden 1.5xl:flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 items-center">
          {t('Filters')}
          <Filter className="w-4 h-4" />
        </div>
        <SortingSelect
          value={filters.sorting}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, sorting: value }))
          }
          type={filters.type}
        />
        <TypeSelect
          value={filters.type}
          onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
          isActive={Boolean(filters.type)}
        />
        <ReleaseDateFilter
          releaseFrom={filters.releaseFrom}
          releaseTo={filters.releaseTo}
          isActive={Boolean(filters.releaseFrom || filters.releaseTo)}
          onChange={(releaseFrom: string, releaseTo: string) =>
            setFilters((prev) => ({ ...prev, releaseFrom, releaseTo }))
          }
        />
        <GenresFilter
          selectedGenres={filters.genres}
          isActive={filters.genres.length > 0}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, genres: value }))
          }
        />
        <UserScoreFilter
          value={filters.userScore}
          isActive={Boolean(filters.userScore)}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, userScore: value }))
          }
        />
        <MinVotesFilter
          value={filters.minVotes}
          isActive={Boolean(filters.minVotes)}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, minVotes: value }))
          }
        />
        <RuntimeFilter
          value={filters.runtime}
          isActive={Boolean(filters.runtime)}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, runtime: value }))
          }
        />
        <Button onClick={applyFilters}>{t('Apply')}</Button>
        <Button
          onClick={resetFilters}
          variant={hasFilters ? 'destructive' : 'ghost'}
          aria-disabled={!hasFilters}
          disabled={!hasFilters}
        >
          {t('Clear')}
        </Button>
      </div>
      <div className="flex flex-row gap-4 items-center 1.5xl:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant="outline">
              <div className="flex flex-row gap-2 items-center">
                {t('Filters')}
                <Filter className="w-4 h-4" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="m-auto rounded-lg">
            <DialogHeader>
              <DialogTitle>{t('Filters')}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <SortingSelect
                value={filters.sorting}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, sorting: value }))
                }
                type={filters.type}
              />
              <TypeSelect
                value={filters.type}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, type: value }))
                }
                isActive={Boolean(filters.type)}
              />
              <ReleaseDateFilter
                releaseFrom={filters.releaseFrom}
                releaseTo={filters.releaseTo}
                isActive={Boolean(filters.releaseFrom || filters.releaseTo)}
                onChange={(releaseFrom: string, releaseTo: string) =>
                  setFilters((prev) => ({ ...prev, releaseFrom, releaseTo }))
                }
              />
              <GenresFilter
                selectedGenres={filters.genres}
                isActive={filters.genres.length > 0}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, genres: value }))
                }
              />
              <UserScoreFilter
                value={filters.userScore}
                isActive={Boolean(filters.userScore)}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, userScore: value }))
                }
              />
              <MinVotesFilter
                value={filters.minVotes}
                isActive={Boolean(filters.minVotes)}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, minVotes: value }))
                }
              />
              <RuntimeFilter
                value={filters.runtime}
                isActive={Boolean(filters.runtime)}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, runtime: value }))
                }
              />
              <Button
                onClick={() => {
                  applyFilters();
                  setOpen(false);
                }}
              >
                {t('Apply')}
              </Button>
              <Button
                onClick={() => {
                  resetFilters();
                  setOpen(false);
                }}
                variant={hasFilters ? 'destructive' : 'ghost'}
                aria-disabled={!hasFilters}
                disabled={!hasFilters}
              >
                {t('Clear')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
