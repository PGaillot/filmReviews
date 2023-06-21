import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbConfigService {

  configuration: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  poster_sizes:string[] = [];
  backdrop_sizes:string[] = [];


  constructor(private http: HttpClient) { }

  fetchConfiguration() {
    return this.http.get(environment.api.configuration).pipe(
      tap((config) => {
        console.log('this.fetchConfiguration()')
        this.configuration.next(config);
        this.configuration.complete();
      })
    );
  }

  getImgBaseUrl(){
    if(this.configuration === null){
      this.fetchConfiguration().subscribe()
    } 
    return this.configuration.getValue().images.base_url;
  }

  getPosterSizes():string[]{
    if(this.configuration === null){
      this.fetchConfiguration().subscribe()
    } 
    return this.configuration.getValue().images.poster_sizes;
  }


}
