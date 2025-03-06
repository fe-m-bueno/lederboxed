'use client';
import AppFilter from '@/components/AppFilter';
import TitleItem from '@/components/TitleItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { useTMDBFetcher } from '@/hooks/useTMDB';
import { TMDBMovie, TMDBTV } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');

    const currentPage = Number(searchParams.get('page')) || 1;
    setPage(currentPage);
    setQuery(params.toString());
  }, [searchParams]);

  const withType = searchParams.get('type');
  const endpoints =
    withType === 'movie'
      ? [`/discover/movie?${query}&page=${page}&`]
      : withType === 'tv'
      ? [`/discover/tv?${query}&page=${page}&`]
      : [
          `/discover/movie?${query}&page=${page}&`,
          `/discover/tv?${query}&page=${page}&`,
        ];

  const { data, loading } = useTMDBFetcher(endpoints);
  const totalPages = data?.[0]?.total_pages || 1;
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');
    params.set('page', newPage.toString());

    router.push(`/discover?${params.toString()}`);
  };
  console.log(data);
  console.log(totalPages);

  return (
    <div className="p-6 flex flex-col gap-10 items-center justify-center mx-auto mt-10 1.5xl:mt-24">
      <AppFilter />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-10">
        {loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[380px] rounded-lg" />
          ))
        ) : (
          <>
            {withType === 'movie' &&
              data[0]?.results?.map((item: TMDBMovie) => (
                <TitleItem key={`movie-${item.id}`} item={item} type="movie" />
              ))}

            {withType === 'tv' &&
              data[0]?.results?.map((item: TMDBTV) => (
                <TitleItem key={`tv-${item.id}`} item={item} type="tv" />
              ))}
            {withType === null && (
              <>
                {data[0]?.results?.map((item: TMDBMovie) => (
                  <TitleItem
                    key={`movie-${item.id}`}
                    item={item}
                    type="movie"
                  />
                ))}
                {data[1]?.results?.map((item: TMDBTV) => (
                  <TitleItem key={`tv-${item.id}`} item={item} type="tv" />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page > 1 ? `/discover?${query}&page=${page - 1}` : '#'}
                onClick={() => page > 1 && changePage(page - 1)}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
                className="aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
              />
            </PaginationItem>
            {page > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/discover?${query}&page=${page - 1}`}
                  onClick={() => changePage(page - 1)}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={`/discover?${query}&page=${page}`} isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            {page < totalPages && (
              <PaginationItem>
                <PaginationLink
                  href={`/discover?${query}&page=${page + 1}`}
                  onClick={() => changePage(page + 1)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={
                  page < totalPages
                    ? `/discover?${query}&page=${page + 1}`
                    : '#'
                }
                onClick={() => page < totalPages && changePage(page + 1)}
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : 0}
                className="aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
