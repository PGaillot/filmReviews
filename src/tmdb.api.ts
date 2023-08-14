import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { API_KEY, environment } from './environments/environment';
import { Movie } from './models/movie.model';
import * as formatData from 'src/helpers/formatData.helper';
import { MovieDetails } from './models/movieDetails.model';
import { FavoriteHttpResult } from './models/favorite.model';
import { convertDataToMovie } from 'src/helpers/formatData.helper';

@Injectable({ providedIn: 'root' })
export class TMDBApi {

    constructor(private http: HttpClient) { }

    params: HttpParams = new HttpParams()
        .set('api_key', API_KEY)
        .set('language', 'fr-FR')

    /**
     * Get Movie by Id.
     * -
     * return a movie model.
     * 
     * @param id 
     * @returns movie (observable)
     */
    getMovie(id: number): Observable<Movie> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_URL + '/' + id, { params: this.params }).pipe(
            map((res: any) => {
                return formatData.convertDataToMovie(res);
            })
        );
    }


    /**
     * Get Movie by Id.
     * -
     * return a movie model.
     * 
     * @param id 
     * @returns movie (observable)
     */
    getMovieDetails(id: number): Observable<MovieDetails> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_URL + '/' + id, { params: this.params }).pipe(
            map((res: any) => {
                return formatData.convertDataToMovieDetails(res);
            })
        );
    }

    getMovieGenre(): Observable<any> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_GENRE, { params: this.params }).pipe(
            map((res: any) => {
                return res.genres
            })
        )
    }

    getMovieImages(filmId: string): Observable<any> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_URL + '/' + filmId + '/images').pipe(
            map((res: any) => res)
        )
    }

    /**
     * Get Movie a movie array.
     * -
     * return an Observable first page of movie array.
     * 
     * @param include_video (false by default)
     * @param include_adult (false by default)
     * @returns movie[] (observable)
     */
    getDiscover(with_genres: string, include_video: boolean = false, include_adult: boolean = false): Observable<Movie[]> {
        let discParams: HttpParams = this.params
            .set('include_video', include_video)
            .set('include_adult', include_adult)
            .set('with_genres', with_genres);

        return this.http.get(environment.api.discover.TMDB_DISC_MOVIE_URL, { params: discParams }).pipe(
            map((res: any) => {
                return res.results.map((data: any) => formatData.convertDataToMovie(data))
            })
        );
    }


    searchMovie(query: string, page: number): Observable<any> {
        let searchParams: HttpParams = this.params
            .set('page', page)
            .set('query', query);

        return this.http.get(environment.api.search.TMDB_MOVIE_SEARCH, { params: searchParams }).pipe(
            map((res: any) => {
                console.log(res)
                return res
            })
        )
    }

    getCreditByMovie(movieId: number): Observable<any> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_URL + '/' + movieId + '/credits', { params: this.params }).pipe(
            map(res => res)
        )
    }

    getWatchProviders(movieId: number): Observable<any> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_URL + '/' + movieId + '/watch/providers', { params: this.params }).pipe(
            map(res => res)
        )
    }

    getConfiguration(): Observable<any> {
        return this.http.get(environment.api.configuration)
    }

    getCollection(page: number = 1): Observable<FavoriteHttpResult> {
        this.params = this.params
            .set('sort_by', 'created_at.asc')
            .set('page', page);
        return this.http.get(environment.api.favorite.TMDB_FAV_MOVIE_URL, { params: this.params }).pipe(
            map((res: any) => {
                const favoriteResult: FavoriteHttpResult = {
                    films: [...res.results],
                    page: res.page,
                    total_pages: res.total_pages,
                    total_results: res.total_results,
                };
                return favoriteResult;
            }
            )
        )
    }
}
