import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-movies-list-selection',
  templateUrl: './movies-list-selection.component.html',
  styleUrls: ['./movies-list-selection.component.scss']
})
export class MoviesListSelectionComponent implements OnInit {

  constructor(private tmdbApi:TMDBApi) { }
  genres:any[] = [];
  @Output() genreSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.tmdbApi.getMovieGenre().subscribe((res:any[]) => {
      this.genres = res;
    })
  }

  onItemClick(genre:any){
    this.genreSelected.emit(genre)
  }

  

}
