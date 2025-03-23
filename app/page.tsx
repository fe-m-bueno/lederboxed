"use client";

import { useTMDBFetcher } from "@/hooks/useTMDB";
import Carousel from "@/components/TitleCarousel";
import HeroItem from "@/components/HeroItem";
import TitleItem from "@/components/TitleItem";
import { Skeleton } from "@/components/ui/skeleton";
import Top10TitleItem from "@/components/Top10TitleItem";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const today = new Date().toISOString().split("T")[0];
const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
  .toISOString()
  .split("T")[0];
const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2))
  .toISOString()
  .split("T")[0];
const oneMonthFromNow = new Date(new Date().setMonth(new Date().getMonth() + 1))
  .toISOString()
  .split("T")[0];
const twoDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 2))
  .toISOString()
  .split("T")[0];

export default function HomePage() {
  const [HeroHeight, setHeroHeight] = useState("43rem");
  const [Top10Height, setTop10Height] = useState("800px");
  const [CarouselHeight, setCarouselHeight] = useState("500px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setHeroHeight("25rem");
        setTop10Height("450px");
        setCarouselHeight("400px");
      } else if (window.innerWidth < 768) {
        setHeroHeight("30rem");
        setTop10Height("500px");
        setCarouselHeight("400px");
      } else if (window.innerWidth < 1024) {
        setHeroHeight("35rem");
        setTop10Height("600px");
        setCarouselHeight("400px");
      } else if (window.innerWidth < 1280) {
        setHeroHeight("40rem");
        setTop10Height("800px");
        setCarouselHeight("400px");
      } else {
        setHeroHeight("52rem");
        setTop10Height("900px");
        setCarouselHeight("500px");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { t } = useTranslation();
  const carouselsConfig = [
    {
      dataIndex: 2,
      title: t("Top Rated Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=vote_average.desc&vote_count.gte=600",
      type: "movie",
    },
    {
      dataIndex: 3,
      title: t("Upcoming Movies"),
      exploreLink: `/discover?type=movie&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${twoMonthsAgo}&release_date.lte=${today}`,
      type: "movie",
    },
    {
      dataIndex: 4,
      title: t("Now Playing Movies"),
      exploreLink: `/discover?type=movie&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${twoDaysFromNow}&release_date.lte=${oneMonthFromNow}`,
      type: "movie",
    },
    {
      dataIndex: 5,
      title: t("Popular TV Shows"),
      exploreLink:
        "/discover?type=tv&sort_by=popularity.desc&vote_count.gte=600",
      type: "tv",
    },
    {
      dataIndex: 6,
      title: t("TV Shows Airing Today"),
      exploreLink: `/discover?type=tv&sort_by=popularity.desc&air_date.gte=${today}&air_date.lte=${tomorrow}`,
      type: "tv",
    },
    {
      dataIndex: 7,
      title: t("TV Shows On The Air"),
      exploreLink: `/discover?type=tv&sort_by=popularity.desc&air_date.gte=${twoDaysFromNow}&air_date.lte=${oneMonthFromNow}`,
      type: "tv",
    },
    {
      dataIndex: 8,
      title: t("Top Rated TV Shows"),
      exploreLink:
        "/discover?type=tv&sort_by=vote_average.desc&vote_count.gte=200",
      type: "tv",
    },
    {
      dataIndex: 9,
      title: t("Action Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=28",
      type: "movie",
    },
    {
      dataIndex: 10,
      title: t("Adventure Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=12",
      type: "movie",
    },
    {
      dataIndex: 11,
      title: t("Animation Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=16",
      type: "movie",
    },
    {
      dataIndex: 12,
      title: t("Comedy Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=35",
      type: "movie",
    },
    {
      dataIndex: 13,
      title: t("Crime Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=80",
      type: "movie",
    },
    {
      dataIndex: 14,
      title: t("Documentaries"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=99",
      type: "movie",
    },
    {
      dataIndex: 15,
      title: t("Drama Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=18",
      type: "movie",
    },
    {
      dataIndex: 16,
      title: t("Romance Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=10749",
      type: "movie",
    },
    {
      dataIndex: 17,
      title: t("Science Fiction Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=878",
      type: "movie",
    },
    {
      dataIndex: 18,
      title: t("Thriller Movies"),
      exploreLink:
        "/discover?type=movie&sort_by=popularity.desc&with_genres=53",
      type: "movie",
    },
  ];

  const { data, loading } = useTMDBFetcher([
    "/movie/popular?",
    "/trending/movie/week?",
    "/movie/top_rated?",
    "/movie/upcoming?",
    "/movie/now_playing?",
    "/discover/tv?include_adult=false&vote_count.gte=200&sort_by=popularity.desc&",
    "/tv/airing_today?vote_count.gte=200&",
    "/tv/on_the_air?vote_count.gte=200&",
    "/tv/top_rated?vote_count.gte=200&",
    "/discover/movie?with_genres=28&vote_count.gte=200&",
    "/discover/movie?with_genres=12&vote_count.gte=200&",
    "/discover/movie?with_genres=16&vote_count.gte=200&",
    "/discover/movie?with_genres=35&vote_count.gte=200&",
    "/discover/movie?with_genres=80&vote_count.gte=200&",
    "/discover/movie?with_genres=99&vote_count.gte=200&",
    "/discover/movie?with_genres=18&vote_count.gte=200&",
    "/discover/movie?with_genres=10749&vote_count.gte=200&",
    "/discover/movie?with_genres=878&vote_count.gte=200&",
    "/discover/movie?with_genres=53&vote_count.gte=200&",
  ]);

  return (
    <div className="p-6 flex flex-col gap-10 items-center justify-center mx-auto -z-10 mt-16">
      <Carousel
        items={loading ? Array(5).fill(null) : data[0].results.slice(0, 5)}
        renderItem={
          loading
            ? () => <Skeleton className="w-full ~h-[25rem]/[52rem]" />
            : (movie) => <HeroItem movie={movie} />
        }
        slideSize="100%"
        slideHeight={HeroHeight}
        autoplay={true}
        loop={true}
        className="mb-10"
        isHero={true}
      />

      <Carousel
        items={loading ? Array(10).fill(null) : data[1].results.slice(0, 10)}
        renderItem={
          loading
            ? () => <Skeleton className="w-full ~h-[28.125rem]/[56.25rem]" />
            : (movie, index) => <Top10TitleItem movie={movie} index={index} />
        }
        slideHeight={Top10Height}
        title={t("Top 10 Movies")}
        dragFree={true}
        loop={false}
        isHero={true}
      />
      {carouselsConfig.map(({ dataIndex, title, exploreLink, type }) => (
        <Carousel
          key={title}
          items={loading ? Array(20).fill({}) : data[dataIndex]?.results}
          renderItem={
            loading
              ? () => <Skeleton className="w-full ~h-[25rem]/[31.25rem]" />
              : (item) =>
                  item && (
                    <TitleItem item={item} type={type as "movie" | "tv"} />
                  )
          }
          slideHeight={CarouselHeight}
          title={title}
          exploreLink={exploreLink}
          loop={true}
          dragFree={true}
        />
      ))}
    </div>
  );
}
