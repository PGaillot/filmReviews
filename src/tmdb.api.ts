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

    /**
     * Get Movie a movie array.
     * -
     * return an Observable first page of movie array.
     * 
     * @param include_video (false by default)
     * @param include_adult (false by default)
     * @returns movie[] (observable)
     */
    getDiscover(include_video: boolean = false, include_adult: boolean = false): Observable<any> {
        this.params
            .set('include_video', include_video)
            .set('include_adult', include_adult);
        return this.http.get(environment.api.discover.TMDB_DISC_MOVIE_URL, { params: this.params }).pipe(
            map(res => {
                return res
            })
        );
    }


    getConfiguration():Observable<any>{
        return this.http.get(environment.api.configuration)
    }

}