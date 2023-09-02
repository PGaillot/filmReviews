import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { VhsSide } from './vhs-side.enum';

@Component({
  selector: 'app-vhs-spine',
  templateUrl: './vhs-spine.component.html',
  styleUrls: ['./vhs-spine.component.scss', '../vhs-spine/style-templates/t1.scss',  '../vhs-spine/style-templates/t2.scss', '../vhs-spine/style-templates/t3.scss']
})
export class VhsSpineComponent implements OnInit, AfterViewInit {
  
  constructor(
  ) { }
  
  randomVhsType: number = 1;
  randomVhsSide: VhsSide = VhsSide.Front;
  stickerRotation:number = 0;
  stickerHeightPosition:number = 0;
  
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
  
  @Input() movie!: Movie;
  
  vhsModelNames: string[] = [
    '',
    'VHX-2000',
    'VIDEO CASSETTE',
    'High Quality',
  ]
  
  brandModels:string[] = [
    '',
    'MEGA VISION',
    'HQ',
    'E-240',
  ]
  
  bottomTexts:string[] = [
    '',
    'VHS',
    'colors',
    'VHS',
  ]
  
  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.randomVhsType = this.getRandomNumber(1, 3);
    this.randomVhsSide = Math.random() < 0.75 ? VhsSide.Front : VhsSide.Back;
    this.stickerRotation = this.getRandomNumber(-87, -93);
    this.stickerHeightPosition = this.getRandomNumber(30, 50);
  }
  
}
