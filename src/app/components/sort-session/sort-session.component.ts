import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { Review } from 'src/models/review.model';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-sort-session',
  templateUrl: './sort-session.component.html',
  styleUrls: ['./sort-session.component.scss']
})
export class SortSessionComponent implements OnInit, OnDestroy {

  constructor(
    private api: TMDBApi,
    private activatedRoute: ActivatedRoute,
    private router:Router,
  ) { }

  genreId: any = 12;
  isLoaded: boolean = false;
  films: Movie[] = [];
  reviews: Review[] = [];
  filmIndex: number = 0;
  scoreAvr: number = 0;

  subscripions: Subscription[] = [];

  ngOnInit(): void {
    this.genreId = this.activatedRoute.snapshot.paramMap.get('genreId');
    this.subscripions = [

      this.api.getDiscover(1 ,this.genreId).subscribe((res: any[]) => {
        res.forEach(movie => {
          this.films = [...this.films, movie]
        });

        setTimeout(() => {
          this.isLoaded = true;
        }, 1000)
      }),
    ]
  }


  btnClick(e: any) {
    let review: Review = { movie_id: this.films[this.filmIndex].id, score: e }

    this.reviews = [...this.reviews, review]
    this.filmIndex++;
    this.scoreAvr = this.calculateAverageScore()
    if(this.reviews.length >= 20){
      console.log(this.reviews)
      setTimeout(() => {
        this.router.navigate(['/genre-select'])
      }, 5000)
    }
  }

  private calculateAverageScore(): number {
    if (this.reviews.length === 0) {
      return 0;
    }
    let accumulator:number = 0
    this.reviews.forEach(rv => {
      accumulator += rv.score; 
    });
    const averageScore = accumulator / this.reviews.length;
    return averageScore;
  }

  ngOnDestroy(): void {
    this.subscripions.forEach(subscripions => subscripions.unsubscribe())
  }
}
