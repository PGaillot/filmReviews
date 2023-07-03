import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { Movie } from 'src/models/movie.model';
import { TMDBApi } from 'src/tmdb.api';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  
  posterPath: string = '';
  isClicking: boolean = false;
  intervalId: any;
  watchProviders: any[] = [];
  
  constructor(
    private imgService: ImageService,
    private api: TMDBApi
    ) { }

  @Input() film!: Movie;
  @Output() choiseEvent: EventEmitter<any> = new EventEmitter<string>();
  subsriptions: Subscription[] = []
  score: number = 0;
  cast: any[] = [];
  details:boolean = false;
  
  startClicking(btnClass: string) {
    this.isClicking = true;
    this.startIconAnimation(btnClass);
  }
  
  stopClicking() {
    this.isClicking = false;
    if (this.intervalId && this.score !== 0) {
      clearInterval(this.intervalId);
      this.emitScore(this.score)
      this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
      this.score = 0;
    }
  }
  
  startIconAnimation(btnClass: string) {
    const iconElement = document.querySelector('.' + btnClass);
    let facor: number = 0;
    switch (btnClass) {
      case 'approuved':
        facor = 25;
        break;
      case 'idk':
        facor = 0;
        break;
        case 'disapproved':
          facor = -25;
          break;
          default:
            facor = 0;
            break;
          }
          
          
          this.intervalId = setInterval(() => {
            this.score += facor
            console.log(this.score);
            if (this.score >= 1000 || this.score <= -1000) {
              clearInterval(this.intervalId)
              if (this.score !== 0) { this.emitScore(this.score) };
              this.score = 0;
            }
          }, 25);
        }
        
        ngOnInit(): void {
          
        }
        
        emitScore(score: number) {
          this.choiseEvent.emit(score)
        }

        truncateText(text: string, maxLength: number): string {
          if (text.length <= maxLength) {
            return text;
          } else {
            return text.substring(0, maxLength) + " ...";
    }
  }
  
    
  moreClick() {
    this.details = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes) {
      this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
      this.details = false;
      this.subsriptions = [
        ...this.subsriptions,
        this.api.getCreditByMovie(this.film.id).subscribe((res: any) => {
          const cast: any[] = res.cast;
          this.cast = cast.filter(actor => actor.order < 5)
          // console.log(this.cast)
        }),
        this.api.getWatchProviders(this.film.id).subscribe((res: any) => {
          this.watchProviders = (res.results['FR'].flatrate) === undefined ? [] : res.results['FR'].flatrate;
          this.watchProviders.forEach(wp => {
            const logo_path =  wp.logo_path;
            wp.logo_path = this.imgService.getImgUrl(logo_path);
          })
        })
      ]
    }

  }

}
