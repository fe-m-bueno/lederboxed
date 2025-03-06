'use client';

import { useTMDBFetcher } from '@/hooks/useTMDB';
import { Skeleton } from '@/components/ui/skeleton';
import PersonInformation from '@/components/PersonInformation';
import CreditsCarousel from '@/components/CreditsCarousel';
import SkeletonInformation from '@/components/SkeletonInformation';
import { useTranslation } from 'react-i18next';

export default function PeoplePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { t } = useTranslation();

  const { data, loading } = useTMDBFetcher([
    `/person/${id}?append_to_response=combined_credits,external_ids&`,
  ]);
  const { data: dataSecond, loading: loadingSecond } = useTMDBFetcher([
    `/search/person?query=${data[0]?.name}&`,
  ]);

  return (
    <div>
      {loading || loadingSecond ? (
        <div>
          <Skeleton className="w-full ~h-[35rem]/[46rem] object-cover object-center" />
          <div className="w-10/12 mx-auto flex flex-col gap-8 mt-8">
            <SkeletonInformation />
          </div>
        </div>
      ) : (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${dataSecond[0]?.results[0]?.known_for[0]?.backdrop_path}`}
            alt={dataSecond[0]?.name}
            className="w-full ~h-[35rem]/[46rem] object-cover object-center"
            title={dataSecond[0]?.name}
          />
          <div className="w-11/12 1.5xl:w-10/12 mx-auto flex flex-col gap-8 mt-8">
            <PersonInformation item={data[0]} />
            {data[0].combined_credits.cast.length > 0 && (
              <CreditsCarousel item={data[0]} title={t('Appeared in')} />
            )}
            {data[0].combined_credits.crew.length > 0 && (
              <CreditsCarousel
                item={data[0]}
                title={t('Crew in')}
                isCast={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
