'use client';
import { TMDBPersonDetail } from '@/types';
import { dateFixer } from '@/utils/dateFixer';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function PersonInformation({
  item,
}: {
  item: TMDBPersonDetail;
}) {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col gap-8 1.5xl:px-8">
      <div className="flex flex-row gap-4 h-full">
        <div className="~w-[8.875rem]/[18.75rem] ~h-[13.25rem]/[28.125rem] flex-shrink-0 border-2 border-gray-400 rounded-lg overflow-hidden 1.5xl:sticky 1.5xl:top-32">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
            alt={item.name}
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-4 1.5xl:pl-4">
          <h2 className="~text-lg/4xl font-bold">{item.name}</h2>
          {item.also_known_as.length > 0 && (
            <div className="flex flex-row gap-2">
              <p className="text-foreground/80 font-thin ~text-xs/sm">
                {item.also_known_as.join(', ')}
              </p>
            </div>
          )}
          <div className="flex flex-col 1.5xl:flex-row gap-2 ~text-sm/base">
            {item.place_of_birth && (
              <p className="text-foreground/80 font-semibold">
                {item.place_of_birth}
              </p>
            )}
            {item.birthday && (
              <p className="text-foreground/80">{dateFixer(item.birthday)}</p>
            )}
          </div>

          <div className="w-full ~text-sm/base hidden 1.5xl:block">
            <p className="text-foreground/80 text-justify">
              {item.biography
                ? item.biography
                : t('No biography available in your language')}
            </p>
          </div>
          {Object.keys(item.external_ids).length > 0 && (
            <div className="hidden 1.5xl:flex flex-row gap-6">
              <Link
                href={`https://www.imdb.com/name/nm${item.external_ids.imdb_id}`}
                target="_blank"
              >
                <Image src="/imdb.svg" alt="IMDB" width={50} height={50} />
              </Link>
              <Link
                href={`https://www.themoviedb.org/person/${item.id}`}
                target="_blank"
              >
                <Image src="/tmdb.svg" alt="TMDB" width={50} height={50} />
              </Link>
              {item.external_ids.facebook_id && (
                <Link
                  href={`https://www.facebook.com/${item.external_ids.facebook_id}`}
                  target="_blank"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={25}
                    height={25}
                  />
                </Link>
              )}
              {item.external_ids.instagram_id && (
                <Link
                  href={`https://www.instagram.com/${item.external_ids.instagram_id}`}
                  target="_blank"
                >
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={25}
                    height={25}
                  />
                </Link>
              )}
              {item.external_ids.twitter_id && (
                <Link
                  href={`https://www.twitter.com/${item.external_ids.twitter_id}`}
                  target="_blank"
                >
                  <Image
                    src={
                      document.documentElement.getAttribute('data-mode') ===
                      'dark'
                        ? '/twitter-white.png'
                        : '/twitter-black.png'
                    }
                    alt="Twitter"
                    width={25}
                    height={25}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full ~text-sm/base block 1.5xl:hidden">
        <p className="text-foreground/80 text-justify">
          {item.biography
            ? item.biography
            : t('No biography available in your language')}
        </p>
      </div>
      {Object.keys(item.external_ids).length > 0 && (
        <div className="flex 1.5xl:hidden flex-row gap-6">
          <Link
            href={`https://www.imdb.com/name/nm${item.external_ids.imdb_id}`}
            target="_blank"
          >
            <Image src="/imdb.svg" alt="IMDB" width={50} height={50} />
          </Link>
          <Link
            href={`https://www.themoviedb.org/person/${item.id}`}
            target="_blank"
          >
            <Image src="/tmdb.svg" alt="TMDB" width={50} height={50} />
          </Link>
          {item.external_ids.facebook_id && (
            <Link
              href={`https://www.facebook.com/${item.external_ids.facebook_id}`}
              target="_blank"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={25}
                height={25}
              />
            </Link>
          )}
          {item.external_ids.instagram_id && (
            <Link
              href={`https://www.instagram.com/${item.external_ids.instagram_id}`}
              target="_blank"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={25}
                height={25}
              />
            </Link>
          )}
          {item.external_ids.twitter_id && (
            <Link
              href={`https://www.twitter.com/${item.external_ids.twitter_id}`}
              target="_blank"
            >
              <Image
                src={
                  document.documentElement.getAttribute('data-mode') === 'dark'
                    ? '/twitter-white.png'
                    : '/twitter-black.png'
                }
                alt="Twitter"
                width={25}
                height={25}
              />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
