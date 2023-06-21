import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { API_IMG_URL } from 'src/environments/environment';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  posterPath:string = '';
  subscriptions: Subscription[] = [];

  constructor(private imgService: ImageService) { }

  @Input() film!: Movie;

  ngOnInit(): void {
    
    this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
    this.subscriptions = [
     
    ]
  }

}
