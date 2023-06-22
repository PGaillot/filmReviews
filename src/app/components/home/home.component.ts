import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { Review } from 'src/models/review.model';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private tmdbApi: TMDBApi) { }

  filmIndex: number = 0;
  subscriptions: Subscription[] = [];
  films: Movie[] = [];
  reviews: Review[] = [];
  isLoaded:boolean = false;


  btnClick(e: any) {
    let review: Review = { movie_id: this.films[this.filmIndex].id, score: 0 }
    switch (e) {
      case 'approuved':
        review.score = 1;
        break;
      case 'idk':
        review.score = 0;
        break;
      case 'disapproved':
        review.score = -1;
        break;
      default:
        review.score = 0
        break;
    }
    this.reviews = [...this.reviews, review]
    this.filmIndex ++;
    console.log(this.reviews)
  }

  genreSelected(e:any){
    console.log(e)
    
  }



  ngOnInit(): void {
    this.subscriptions = [
      // this.tmdbApi.getMovie(419704).subscribe(res => {
      //   console.log(res)
      //   this.films = [...this.films, res]
      // }),

      this.tmdbApi.getDiscover('18',false, false ).subscribe(res => {
        console.log(res.results)
        res.results.forEach((movie: Movie) =>
          this.films = [...this.films, movie]
        )
        this.isLoaded = true;
      })

      
    ]
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
