'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import useTMDBSearch from '@/hooks/useTMDBSearch';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
export default function AppSearchbar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data, loading } = useTMDBSearch<{ results: any[] }>({
    endpoint: '/search/multi',
    params: { query: `${query}&` },
    debounceDelay: 500,
  });
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = query.length > 2 ? data?.results || [] : [];
  console.log(results);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center gap-2 rounded-lg">
        <Search className="absolute right-6 w-5 h-5 text-foreground/50" />
        <Input
          placeholder={t('Search')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 2);
          }}
          className="focus:outline-none"
          onFocus={() => setIsOpen(query.length > 2)}
        />
      </div>

      {results.length > 0 && isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border border-foreground/20 rounded-lg shadow-lg p-2">
          {loading && <p>{t('Loading...')}</p>}
          {!loading &&
            results.slice(0, 5).map((result) => (
              <Link
                key={result.id}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                href={
                  result.media_type === 'movie'
                    ? `/movie/${result.id}`
                    : result.media_type === 'tv'
                    ? `/tv/${result.id}`
                    : `/person/${result.id}`
                }
              >
                <div className="p-2 hover:bg-background/20 rounded-lg cursor-pointer flex flex-row items-center justify-start gap-4">
                  {result.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                      alt={result.title || result.name}
                      className="w-[75px] h-[100px] rounded-lg"
                    />
                  ) : (
                    <Skeleton className="min-w-[75px] h-[100px] rounded-lg" />
                  )}{' '}
                  <span>{result.title || result.name}</span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
