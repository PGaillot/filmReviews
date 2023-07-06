import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
// import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    // private tmdbApi: TMDBApi,
    private router: Router
  ) { }

  filmIndex: number = 0;
  subscriptions: Subscription[] = [];
  films: number[] = [13, 120, 603, 2899 ];
  randomFimlIndex: number = 0;
  isLoaded: boolean = false;


  genreSelected(e: any) {
    console.log(e)

  }

  ngOnInit(): void {
    this.randomFimlIndex = Math.floor(Math.random() * this.films.length);
    console.log(this.randomFimlIndex)
    this.subscriptions = [
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }


  onKey(value: string) {
    this.router.navigateByUrl('research/' + value );
  }

}
