export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TMDBMovieDetail extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  videos: { key: string; site: string }[];
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  credits?: {
    cast: {
      id: number;
      name: string;
      character?: string;
      profile_path?: string;
    }[];
    crew: {
      id: number;
      name: string;
      job?: string;
      department?: string;
      profile_path?: string;
    }[];
  };
  external_ids?: {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  };
  images?: {
    backdrops: { file_path: string; width: number; height: number }[];
    posters: { file_path: string; width: number; height: number }[];
  };
  alternate_titles?: {
    title: string;
    iso_3166_1: string;
  }[];
  keywords?: {
    keywords: { id: number; name: string }[];
  };
  similar?: {
    results: {
      id: number;
      title: string;
      backdrop_path?: string;
      poster_path?: string;
      vote_average: number;
    }[];
  };
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
        release_date: string;
        type: number;
      }[];
    }[];
  };
  ['watch/providers']?: {
    results: {
      [countryCode: string]: {
        link: string;
        flatrate?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
        rent?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
        buy?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
      };
    };
  };
}

export interface TMDBTV {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface TMDBTVDetail extends TMDBTV {
  genres: { id: number; name: string }[];
  created_by: {
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  last_air_date: string | null;
  budget: number;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  };
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
  homepage: string | null;
  imdb_id: string | null;
  videos: { key: string; site: string }[];
  type: string;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];

  credits?: {
    cast: {
      id: number;
      name: string;
      character?: string;
      profile_path?: string;
    }[];
    crew: {
      id: number;
      name: string;
      job?: string;
      department?: string;
      profile_path?: string;
    }[];
  };
  external_ids?: {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  };
  images?: {
    backdrops: { file_path: string; width: number; height: number }[];
    posters: { file_path: string; width: number; height: number }[];
  };
  alternate_titles?: {
    title: string;
    iso_3166_1: string;
  }[];
  keywords?: {
    results: { id: number; name: string }[];
  };
  similar?: {
    results: {
      id: number;
      name: string;
      backdrop_path?: string;
      poster_path?: string;
      vote_average: number;
    }[];
  };
  release_dates?: {
    results: {
      iso_3166_1: string;
      release_dates: {
        certification: string;
        release_date: string;
        type: number;
      }[];
    }[];
  };
  ['watch/providers']?: {
    results: {
      [countryCode: string]: {
        link: string;
        flatrate?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
        rent?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
        buy?: {
          provider_id: number;
          provider_name: string;
          logo_path: string;
        }[];
      };
    };
  };
}

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  popularity: number;
}

export interface TMDBPersonDetail extends TMDBPerson {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  known_for_department: string;
  imdb_id: string;
  homepage: string | null;
  place_of_birth: string | null;
  combined_credits: {
    cast: {
      backdrop_path: string | null;
      id: number;
      title: string;
      media_type: 'movie' | 'tv';
    }[];
    crew: {
      backdrop_path: string | null;
      id: number;
      title: string;
      media_type: 'movie' | 'tv';
    }[];
  };
  external_ids: {
    imdb_id: string;
    wikidata_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };
}

export interface TMDBImages {
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
}

export interface TMDBImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  iso_639_1?: string;
  vote_average: number;
  vote_count: number;
}

export interface TMDBWatchProvider {
  link: string;
  flatrate?: Array<{
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }>;
  rent?: Array<{
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }>;
  buy?: Array<{
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }>;
}

export interface TMDBTVSeason {
  id: number;
  air_date: string;
  episodes: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
    crew: {
      credit_id: string;
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
    }[];
    guest_stars: {
      character: string;
      credit_id: string;
      order: number;
      id: number;
      name: string;
      profile_path: string | null;
    }[];
    name: string;
    overview: string;
    season_number: number;
    poster_path: string | null;
  }[];
}
