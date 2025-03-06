import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronDownIcon } from 'lucide-react';
import { TMDBTVDetail, TMDBTVSeason } from '@/types';
import { useTMDBFetcher } from '@/hooks/useTMDB';
import { useState } from 'react';
import { dateFixer } from '@/utils/dateFixer';
import { useTranslation } from 'react-i18next';
interface SeasonsCollapsibleProps {
  item: TMDBTVDetail;
}
export default function SeasonsCollapsible({ item }: SeasonsCollapsibleProps) {
  const { t } = useTranslation();
  const [openSeason, setOpenSeason] = useState<number | null>(null);
  const { data, loading } = useTMDBFetcher(
    item.seasons.map(
      (season) => `/tv/${item.id}/season/${season.season_number}?`
    )
  );

  return (
    <div className="space-y-4 w-full">
      {item.seasons.map((season, index) => {
        const isOpen = openSeason === season.season_number;
        const seasonData = data[index];
        const episodes = seasonData?.episodes || [];
        return (
          <Collapsible
            key={season.id}
            open={isOpen}
            onOpenChange={() =>
              setOpenSeason((prev) =>
                prev === season.season_number ? null : season.season_number
              )
            }
          >
            <CollapsibleTrigger className="flex items-center  justify-between gap-4 w-full p-4 bg-secondary border-2 rounded-md shadow-sm">
              <div className="flex items-center gap-4">
                {season.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${season.poster_path}`}
                    alt={season.name}
                    className="rounded-md w-[60px] h-[90px]"
                  />
                )}
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h3 className="text-lg font-semibold">{season.name}</h3>
                  <p className="text-sm text-gray-400">
                    {season.air_date?.split('-')[0] || '???'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {season.episode_count} {t('Episodes')}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              {loading ? (
                <p className="text-sm">{t('Loading episodes...')}</p>
              ) : episodes.length > 0 ? (
                <ul className="space-y-3 mt-4">
                  {episodes.map((episode: any) => (
                    <li
                      key={episode.id}
                      className="flex items-center gap-4 p-2 bg-background border-2 rounded-md shadow-sm"
                    >
                      {episode.still_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${episode.still_path}`}
                          alt={episode.name}
                          className="rounded-md w-full h-full"
                        />
                      ) : (
                        <div className="w-[240px] h-[135px] bg-gray-700 rounded-md" />
                      )}
                      <div>
                        <h4 className="~text-sm/lg font-medium">
                          {episode.episode_number}. {episode.name}
                        </h4>
                        <p className="text-sm text-accent-foreground/50">
                          {dateFixer(episode.air_date) || 'Sem data'}
                        </p>
                        <p className="~text-xs/sm text-accent-foreground/75">
                          {episode.overview}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">
                  {t('No episodes found.')}
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}
