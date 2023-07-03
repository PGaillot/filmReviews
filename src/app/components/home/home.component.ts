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
  films: Movie[] = [];
  isLoaded: boolean = false;


  genreSelected(e: any) {
    console.log(e)

  }

  ngOnInit(): void {
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
