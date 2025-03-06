'use client';
import { useTMDBFetcher } from '@/hooks/useTMDB';
import { useTranslation } from 'react-i18next';
import ItemInformation from '@/components/ItemInformation';
import { TMDBMovieDetail } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import CastCarousel from '@/components/CastCarousel';
import SimilarCarousel from '@/components/SimilarCarousel';
import SkeletonInformation from '@/components/SkeletonInformation';
export default function MoviePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { t } = useTranslation();
  const { data, loading }: { data: TMDBMovieDetail[]; loading: boolean } =
    useTMDBFetcher([
      `/movie/${id}?append_to_response=credits,external_ids,images,alternative_titles,keywords,similar,release_dates,watch/providers&`,
    ]);

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton className="w-full ~h-[35rem]/[46rem] object-cover object-center" />
          <div className="w-full md:w-10/12 mx-auto flex flex-col gap-8 mt-8">
            <SkeletonInformation />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
            alt={data[0].title}
            className="w-full ~h-[35rem]/[46rem] object-cover object-center"
            title={data[0].title}
          />
          <div className="w-11/12 md:w-10/12 mx-auto flex flex-col gap-8 mt-8">
            {(() => {
              const movie = data[0] as TMDBMovieDetail;
              return (
                movie && (
                  <>
                    <ItemInformation item={movie} />
                    {movie.credits?.cast && movie.credits.cast.length > 0 && (
                      <CastCarousel item={movie} title={t('Cast')} />
                    )}
                    {movie.credits?.crew && movie.credits.crew.length > 0 && (
                      <CastCarousel
                        item={movie}
                        title={t('Crew')}
                        isCast={false}
                      />
                    )}
                    {movie.similar?.results &&
                      movie.similar.results.length > 0 && (
                        <SimilarCarousel
                          item={movie}
                          title={t('Similar')}
                          type="movie"
                        />
                      )}
                  </>
                )
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
