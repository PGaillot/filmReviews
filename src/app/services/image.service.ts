import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { API_IMG_URL } from 'src/environments/environment';
import { TMDBApi } from 'src/tmdb.api';
import { TmdbConfigService } from './tmdb-config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  // poster_sizes:string[] = this.config.configuration.getValue().images.poster_sizes;
  private imgUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private api: TMDBApi,
    private config: TmdbConfigService,
  ) {
  }
  
  poster_sizes:string[] =  this.config.getPosterSizes();
  imgBaseUrl:string = this.config.getImgBaseUrl();

  getImgUrl(poster_path:string, size:number = 4):string{
    return this.imgBaseUrl + this.poster_sizes[size] + poster_path;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
