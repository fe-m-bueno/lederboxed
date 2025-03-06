'use client';
import CastCarousel from '@/components/CastCarousel';
import ItemInformation from '@/components/ItemInformation';
import SimilarCarousel from '@/components/SimilarCarousel';
import SkeletonInformation from '@/components/SkeletonInformation';
import { Skeleton } from '@/components/ui/skeleton';
import { useTMDBFetcher } from '@/hooks/useTMDB';
import { TMDBTVDetail } from '@/types';
import { useTranslation } from 'react-i18next';

export default function TvPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { t } = useTranslation();
  const { data, loading }: { data: TMDBTVDetail[]; loading: boolean } =
    useTMDBFetcher([
      `/tv/${id}?append_to_response=credits,external_ids,images,alternative_titles,keywords,similar,release_dates,watch/providers&`,
    ]);

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton className="w-full ~h-[35rem]/[46rem] object-cover object-center" />
          <div className="w-10/12 mx-auto flex flex-col gap-8 mt-8">
            <SkeletonInformation />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
            alt={data[0].name}
            className="w-full ~h-[35rem]/[46rem] object-cover object-center"
            title={data[0].name}
          />
          <div className="w-10/12 mx-auto flex flex-col gap-8 mt-8">
            {(() => {
              const tvShow = data[0] as TMDBTVDetail;
              return (
                tvShow && (
                  <>
                    <ItemInformation item={tvShow} isTV={true} />
                    {tvShow.credits?.cast && tvShow.credits.cast.length > 0 && (
                      <CastCarousel item={tvShow} title={t('Cast')} />
                    )}
                    {tvShow.credits?.crew && tvShow.credits.crew.length > 0 && (
                      <CastCarousel
                        item={tvShow}
                        title={t('Crew')}
                        isCast={false}
                      />
                    )}
                    {tvShow.similar?.results &&
                      tvShow.similar.results.length > 0 && (
                        <SimilarCarousel
                          item={tvShow}
                          title={t('Similar')}
                          type="tv"
                        />
                      )}
                  </>
                )
              );
            })()}
          </div>
        </div>
      )}
      TvPage {id}
    </div>
  );
}
