import { tmdbConfig } from "./config";

export const API_KEY = tmdbConfig.apiKey;
export const BEARER = tmdbConfig.bearer;
export const API_URL = "https://api.themoviedb.org/3";
export const API_IMG_URL = 'https://image.tmdb.org/t/p/'

export const environment = {
  production: false,
  api: {
    configuration: API_URL + '/configuration',
    movie: {
      TMDB_MOVIE_URL: API_URL + '/movie',
      TMDB_MOVIE_GENRE: API_URL + '/genre/movie/list',
    },
    search:{
      TMDB_MOVIE_SEARCH: API_URL + '/search/movie'
    },
    discover: {
      TMDB_DISC_MOVIE_URL: API_URL + '/discover/movie'
    }
  },
};

