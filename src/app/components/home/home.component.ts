import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Movie } from 'src/models/movie.model';
// import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private gameService: GameService,
  ) { }

  isLoaded: boolean = false;


  genreSelected(e: any) {
    console.log(e);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('game/' + this.gameService.getFilmOfDay());
    }, 1000)

  }

}
