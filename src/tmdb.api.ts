import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { API_KEY, environment } from './environments/environment';
import { Movie } from './models/movie.model';
import * as formatData from 'src/helpers/formatData.helper';

@Injectable({ providedIn: 'root' })
export class TMDBApi {

    constructor(private http: HttpClient) { }

    private params: HttpParams = new HttpParams()
        .set('api_key', API_KEY)
        .set('language', 'fr')


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

    getMovieGenre(): Observable<any> {
        return this.http.get(environment.api.movie.TMDB_MOVIE_GENRE, { params: this.params }).pipe(
            map((res: any) => {
                return res.genres
            })
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
    //const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=%2C18';
    getDiscover(include_video: boolean = false, include_adult: boolean = false, with_genres: string = ''): Observable<any> {
        this.params
            .set('include_video', include_video)
            .set('include_adult', include_adult);
        if (with_genres !== '') this.params.set('with_genres', include_adult);

        return this.http.get(environment.api.discover.TMDB_DISC_MOVIE_URL, { params: this.params }).pipe(
            map(res => {
                return res
            })
        );
    }


    getConfiguration(): Observable<any> {
        return this.http.get(environment.api.configuration)
    }

}