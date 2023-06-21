// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

import { tmdbConfig } from "./config";

// The list of file replacements can be found in `angular.json`.
export const API_KEY = tmdbConfig.apiKey;
// export const API_URL = "http://localhost:3000/api";
export const API_URL = "https://api.themoviedb.org/3";
export const BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTExYzYyNGExMjYzODNmOTY0YmIxYmM2Yzc2ZjMwMiIsInN1YiI6IjY0OTFmN2IzYzJmZjNkMDBmZmJkNzQwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aD853wFvqIyrdPLxHPDzTFEjgQ_X-Hz3gFE770lzUBE'
export const API_IMG_URL = 'https://image.tmdb.org/t/p/'

export const environment = {
  production: false,
  api: {
    configuration: API_URL + '/configuration',
    movie: {
      TMDB_MOVIE_URL: API_URL + '/movie',

    },
    discover: {
      TMDB_DISC_MOVIE_URL: API_URL + '/discover/movie'
    }
  },
  configuration: {
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "logo_sizes": [
      "w45",
      "w92",
      "w154",
      "w185",
      "w300",
      "w500",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ],
    "profile_sizes": [
      "w45",
      "w185",
      "h632",
      "original"
    ],
    "still_sizes": [
      "w92",
      "w185",
      "w300",
      "original"
    ]
  },
  "change_keys": [
    "adult",
    "air_date",
    "also_known_as",
    "alternative_titles",
    "biography",
    "birthday",
    "budget",
    "cast",
    "certifications",
    "character_names",
    "created_by",
    "crew",
    "deathday",
    "episode",
    "episode_number",
    "episode_run_time",
    "freebase_id",
    "freebase_mid",
    "general",
    "genres",
    "guest_stars",
    "homepage",
    "images",
    "imdb_id",
    "languages",
    "name",
    "network",
    "origin_country",
    "original_name",
    "original_title",
    "overview",
    "parts",
    "place_of_birth",
    "plot_keywords",
    "production_code",
    "production_companies",
    "production_countries",
    "releases",
    "revenue",
    "runtime",
    "season",
    "season_number",
    "season_regular",
    "spoken_languages",
    "status",
    "tagline",
    "title",
    "translations",
    "tvdb_id",
    "tvrage_id",
    "type",
    "video",
    "videos"
  ]
};





/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
