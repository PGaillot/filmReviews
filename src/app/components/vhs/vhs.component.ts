import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-vhs',
  templateUrl: './vhs.component.html',
  styleUrls: ['./vhs.component.scss']
})
export class VHSComponent implements OnInit {

  constructor() { }
  randomVhsType: number = 1;

  emptyMovie: Movie = {
    id: 0,
    title: '',
    original_title: '',
    original_language: '',
    poster_path: '',
    backdrop_path: '',
    overview: '',
    adult: false,
    release_date: '',
    genre_ids: [],
    popularity: 0,
    vote_count: 0,
    video: 0,
    vote_average: 0
  };

  // @Input() movie:BehaviorSubject<Movie> = new BehaviorSubject<Movie>(this.emptyMovie);
  @Input() movie!: Movie;

  vhsModelNames: string[] = [
    '',
    'VHX-2000',
    'VIDEO CASSETTE',
    'High Quality',
  ]

  brandModels: string[] = [
    '',
    'MEGA VISION',
    'HQ',
    'E-240',
  ]

  bottomTexts: string[] = [
    '',
    'VHS',
    'colors',
    'VHS',
  ]

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
    this.randomVhsType = this.getRandomNumber(1, 3);
    console.log(this.randomVhsType)
  }

}


