import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Movie } from 'src/models/movie.model';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  posterPath:string = '';

  constructor(private imgService: ImageService) { }

  @Input() film!: Movie;
  @Output() choiseEvent:EventEmitter<string> = new EventEmitter<string>();

  btnClick(res:string){
    this.choiseEvent.emit(res)
    this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes){
      console.log(changes)
      this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
    }
    
  }

}
