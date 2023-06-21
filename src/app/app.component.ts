import { Component, OnInit } from '@angular/core';
import { TmdbConfigService } from './services/tmdb-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'filmReviews';

  constructor(private tmdbConfigService: TmdbConfigService) { }


  ngOnInit(): void {
    this.tmdbConfigService.fetchConfiguration().subscribe();
  }

}
