import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private tmdbApi: TMDBApi) { }

  subscriptions: Subscription[] = [];
  films: Movie[] = []

  ngOnInit(): void {

    this.subscriptions = [
      this.tmdbApi.getMovie(419704).subscribe(res => {
        console.log(res)
        this.films = [...this.films, res]
      }),

      // this.tmdbApi.getDiscover().subscribe(res => {
      //   console.log(res.results)
      //   res.results.forEach((movie: Movie) =>
      //     this.films = [...this.films, movie]
      //   )
      // })

    ]

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
