"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TMDBMovieDetail, TMDBTVDetail } from "@/types";
import TitleStars from "./TitleStars";
import { timeFixer } from "@/utils/timeFixer";
import WatchProviderCombobox from "./WatchProviderCombobox";
import SeasonsCollapsible from "./SeasonsCollapsible";
import { Badge } from "./ui/badge";
import { dateFixer } from "@/utils/dateFixer";
import { languageFixer } from "@/utils/languageFixer";
import { moneyFixer } from "@/utils/moneyFixer";
import { useTranslation } from "react-i18next";
interface ItemInformationProps {
  item: TMDBMovieDetail | TMDBTVDetail;
  isTV?: boolean;
}

export default function ItemInformation({ item, isTV }: ItemInformationProps) {
  const { t } = useTranslation();
  const watchProviders = item["watch/providers"]?.results || {};
  return (
    <section className="flex flex-col gap-8 px-0 1.5xl:px-8">
      <div className="flex flex-col 1.5xl:flex-row justify-center items-center 1.5xl:items-start 1.5xl:justify-between gap-6 1.5xl:gap-4 h-full">
        <div className="flex flex-row gap-4 w-full items-start justify-start">
          <div className="~w-[8.875rem]/[18.75rem] ~h-[13.25rem]/[28.125rem] flex-shrink-0 border-2 border-gray-400 rounded-lg overflow-hidden 1.5xl:sticky 1.5xl:top-32">
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={
                (item as TMDBMovieDetail).title || (item as TMDBTVDetail).name
              }
              className="w-full h-full rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col ~gap-2/4 pl-4 1.5xl:min-w-[700px] ">
            <h2 className="~text-lg/4xl font-bold">
              {(item as TMDBMovieDetail).title || (item as TMDBTVDetail).name}
            </h2>

            {item.tagline && (
              <h3 className="~text-sm/lg font-semibold">
                {(item as TMDBMovieDetail).tagline ||
                  (item as TMDBTVDetail).tagline}
              </h3>
            )}

            <div className="flex flex-col 1.5xl:flex-row gap-1 1.5xl:gap-8 ~text-sm/base">
              <div className="flex flex-row gap-2">
                <p className="text-foreground/80">{t("Release date")}</p>
                <p className="text-foreground/80">
                  {dateFixer(
                    (item as TMDBMovieDetail).release_date ||
                      (item as TMDBTVDetail).first_air_date
                  )}
                </p>
              </div>
              {((item as TMDBMovieDetail).runtime ||
                (isTV && (item as TMDBTVDetail).episode_run_time[0])) && (
                <p>
                  {timeFixer(
                    (item as TMDBMovieDetail).runtime ||
                      (item as TMDBTVDetail).episode_run_time[0]
                  )}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {item.genres.map((genre) => (
                <Link
                  href={`/discover?type=${isTV ? "tv" : "movie"}&with_genres=${
                    genre.id
                  }`}
                  key={genre.id}
                >
                  <Badge key={genre.id}>{genre.name}</Badge>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <TitleStars rating={item.vote_average} />
              <span className="~text-sm/lg">
                {item.vote_average.toFixed(1)}
              </span>
            </div>

            <div className="hidden 1.5xl:block w-full">
              <p className="~text-sm/base text-balance font-semibold">
                {item.overview}
              </p>
            </div>

            {item.production_companies && (
              <div className="hidden 1.5xl:flex flex-wrap gap-2 ">
                <span className="text-foreground/80 ~text-sm/base">
                  {t("Producer")}
                </span>
                {item.production_companies?.map((company) => (
                  <Link
                    href={`/discover?with_companies=${company.id}`}
                    key={company.id}
                  >
                    <Badge key={company.id}>{company.name}</Badge>
                  </Link>
                ))}
              </div>
            )}
            {item.networks && (
              <div className="hidden 1.5xl:flex flex-wrap gap-2 ">
                <span className="text-foreground/80 ~text-sm/base">
                  {t("Network")}
                </span>
                {item.networks?.map((network) =>
                  isTV ? (
                    <Link
                      href={`/discover?type=tv&with_networks=${network.id}`}
                      key={network.id}
                    >
                      <Badge key={network.id}>{network.name}</Badge>
                    </Link>
                  ) : (
                    <Badge key={network.id}>{network.name}</Badge>
                  )
                )}
              </div>
            )}

            <div className="hidden 1.5xl:flex flex-row gap-2">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Original language")}
              </span>
              <Badge variant="outline" className="capitalize">
                {languageFixer(item.original_language)}
              </Badge>
            </div>

            {typeof item.budget === "number" && item.budget !== null && (
              <div className="hidden 1.5xl:flex flex-row gap-2">
                <span className="text-foreground/80 ~text-sm/base">
                  {t("Budget")}
                </span>
                <Badge variant="outline">{moneyFixer(item.budget)}</Badge>
              </div>
            )}

            <div className="hidden 1.5xl:flex flex-row gap-2">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Status")}
              </span>
              <Badge variant="outline">{item.status}</Badge>
            </div>
            {item.keywords && (
              <div className="hidden 1.5xl:flex flex-wrap gap-2">
                <span className="text-foreground/80 ~text-sm/base">
                  {t("Keywords")}
                </span>
                {isTV
                  ? (item as TMDBTVDetail).keywords?.results
                      ?.slice(0, 15)
                      .map((keyword) => (
                        <Badge
                          key={keyword.id}
                          variant="outline"
                          className="capitalize"
                        >
                          {keyword.name}
                        </Badge>
                      ))
                  : (item as TMDBMovieDetail).keywords?.keywords
                      ?.slice(0, 15)
                      .map((keyword) => (
                        <Badge
                          key={keyword.id}
                          variant="outline"
                          className="capitalize"
                        >
                          {keyword.name}
                        </Badge>
                      ))}
              </div>
            )}

            <div className="hidden 1.5xl:flex gap-8 justify-start items-center mt-4">
              {item.homepage && (
                <Link href={item.homepage} target="_blank">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Globe className="w-5 h-5" /> {t("Official site")}
                  </Button>
                </Link>
              )}
              {item.external_ids?.imdb_id && (
                <>
                  <Link
                    href={`https://www.imdb.com/title/${item.external_ids?.imdb_id}`}
                    target="_blank"
                    className="text-blue-400"
                  >
                    <Image src="/imdb.svg" alt="IMDB" width={50} height={50} />
                  </Link>

                  <Link
                    href={`https://www.themoviedb.org/movie/${item.id}`}
                    target="_blank"
                    className="text-blue-400"
                  >
                    <Image src="/tmdb.svg" alt="TMDB" width={50} height={50} />
                  </Link>
                  {isTV ?? (
                    <Link
                      href={`https://www.letterboxd.com/imdb/${item.external_ids?.imdb_id}`}
                      target="_blank"
                      className="text-blue-400"
                    >
                      <Image
                        src={
                          document.documentElement.getAttribute("data-mode") ===
                          "dark"
                            ? "/letterboxd-dark.svg"
                            : "/letterboxd-light.svg"
                        }
                        alt="Letterboxd"
                        width={25}
                        height={25}
                      />
                    </Link>
                  )}
                </>
              )}
            </div>

            {isTV && (
              <div className="hidden 1.5xl:flex w-full">
                <SeasonsCollapsible item={item as TMDBTVDetail} />
              </div>
            )}
          </div>
        </div>
        <div className="block 1.5xl:hidden w-full">
          <p className="~text-sm/base text-balance font-semibold">
            {item.overview}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-4">
          {item.production_companies && (
            <div className="1.5xl:hidden flex flex-wrap gap-2 ">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Producer")}
              </span>
              {item.production_companies?.map((company) => (
                <Link
                  href={`/discover?with_companies=${company.id}`}
                  key={company.id}
                >
                  <Badge key={company.id}>{company.name}</Badge>
                </Link>
              ))}
            </div>
          )}
          {item.networks && (
            <div className="1.5xl:hidden flex flex-wrap gap-2 ">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Network")}
              </span>
              {item.networks?.map((network) =>
                isTV ? (
                  <Link
                    href={`/discover?type=tv&with_networks=${network.id}`}
                    key={network.id}
                  >
                    <Badge key={network.id}>{network.name}</Badge>
                  </Link>
                ) : (
                  <Badge key={network.id}>{network.name}</Badge>
                )
              )}
            </div>
          )}

          <div className="1.5xl:hidden flex flex-row gap-2">
            <span className="text-foreground/80 ~text-sm/base">
              {t("Original language")}
            </span>
            <Badge variant="outline" className="capitalize">
              {languageFixer(item.original_language)}
            </Badge>
          </div>

          {typeof item.budget === "number" && item.budget !== null && (
            <div className="1.5xl:hidden flex flex-row gap-2">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Budget")}
              </span>
              <Badge variant="outline">{moneyFixer(item.budget)}</Badge>
            </div>
          )}

          <div className="1.5xl:hidden flex flex-row gap-2">
            <span className="text-foreground/80 ~text-sm/base">
              {t("Status")}
            </span>
            <Badge variant="outline">{item.status}</Badge>
          </div>
          {item.keywords && (
            <div className="1.5xl:hidden flex flex-wrap gap-2">
              <span className="text-foreground/80 ~text-sm/base">
                {t("Keywords")}
              </span>
              {isTV
                ? (item as TMDBTVDetail).keywords?.results
                    ?.slice(0, 15)
                    .map((keyword) => (
                      <Badge
                        key={keyword.id}
                        variant="outline"
                        className="capitalize"
                      >
                        {keyword.name}
                      </Badge>
                    ))
                : (item as TMDBMovieDetail).keywords?.keywords
                    ?.slice(0, 15)
                    .map((keyword) => (
                      <Badge
                        key={keyword.id}
                        variant="outline"
                        className="capitalize"
                      >
                        {keyword.name}
                      </Badge>
                    ))}
            </div>
          )}

          <div className="1.5xl:hidden flex gap-8 justify-start items-center mt-4">
            {item.homepage && (
              <Link href={item.homepage} target="_blank">
                <Button variant="outline" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" /> {t("Official site")}
                </Button>
              </Link>
            )}
            {item.external_ids?.imdb_id && (
              <>
                <Link
                  href={`https://www.imdb.com/title/${item.external_ids?.imdb_id}`}
                  target="_blank"
                  className="text-blue-400"
                >
                  <Image src="/imdb.svg" alt="IMDB" width={50} height={50} />
                </Link>

                <Link
                  href={`https://www.themoviedb.org/movie/${item.id}`}
                  target="_blank"
                  className="text-blue-400"
                >
                  <Image src="/tmdb.svg" alt="TMDB" width={50} height={50} />
                </Link>
                {isTV ?? (
                  <Link
                    href={`https://www.letterboxd.com/imdb/${item.external_ids?.imdb_id}`}
                    target="_blank"
                    className="text-blue-400"
                  >
                    <Image
                      src={
                        document.documentElement.getAttribute("data-mode") ===
                        "dark"
                          ? "/letterboxd-dark.svg"
                          : "/letterboxd-light.svg"
                      }
                      alt="Letterboxd"
                      width={25}
                      height={25}
                    />
                  </Link>
                )}
              </>
            )}
          </div>

          {isTV && (
            <div className="flex w-full 1.5xl:hidden">
              <SeasonsCollapsible item={item as TMDBTVDetail} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 mt-8 1.5xl:mt-0">
          <Image src="/JW.svg" alt="JW" width={100} height={100} />
          <span className="text-foreground font-semibold">
            {t("Available in")}
          </span>

          <WatchProviderCombobox providers={watchProviders} />
        </div>
      </div>
    </section>
  );
}
