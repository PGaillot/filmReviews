import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-vhs-collection',
  templateUrl: './vhs-collection.component.html',
  styleUrls: ['./vhs-collection.component.scss']
})
export class VhsCollectionComponent implements OnInit, OnDestroy{
 
constructor(
    private tmdbApi:TMDBApi,
  ) { }


  subscriptions:Subscription[] = [];
  movieList:BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([])


  ngOnInit(): void {
    this.subscriptions = [
      this.tmdbApi.getCollection().subscribe(res => 
        this.movieList.next(res.films))
    ]
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
