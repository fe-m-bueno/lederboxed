import { TMDBTVDetail, TMDBMovieDetail } from '@/types';
import TitleItem from './TitleItem';
import TitleCarousel from './TitleCarousel';
import { Skeleton } from './ui/skeleton';

export default function SimilarCarousel({
  item,
  title,
  type,
}: {
  item: TMDBMovieDetail | TMDBTVDetail;
  title: string;
  type: 'movie' | 'tv';
}) {
  const unduplicatedItems = item.similar?.results.filter(
    (result, index, self) => index === self.findIndex((t) => t.id === result.id)
  );
  console.log(unduplicatedItems);
  return (
    <div className="flex flex-col gap-4">
      <TitleCarousel
        items={unduplicatedItems || []}
        renderItem={(item) => <TitleItem type={type} item={item} />}
        slideHeight="500px"
        title={title}
        isHero={true}
        dragFree={true}
        autoplay={false}
        loop={true}
      />
    </div>
  );
}
