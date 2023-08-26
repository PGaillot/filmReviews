import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { TMDBApi } from 'src/tmdb.api';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private tmdbAPI:TMDBApi,
  ) { }

  private staringDate: Date = new Date('2023-08-13');
  private now: Date = new Date();
  private startingDay: number = this.staringDate.getDay();
  private nowDay: number = this.now.getDay();

  private films: number[] = [0,0, 13, 2899, 120, 9354, 603];


  getDay(): number {
    return this.nowDay - this.startingDay;
  }

  getFilmOfDay() {
    return this.films[this.getDay()];
  }

  // getFavorites() :BehaviorSubject<Movie[]> {
  //   this.tmdbAPI.getCollection().subscribe(res => {
  //     let favorites:BehaviorSubject<Movie[]> =  new BehaviorSubject<Movie[]>([]);
  //     favorites.next(res.films)
  //     return favorites;
  //   })
  // }


}
