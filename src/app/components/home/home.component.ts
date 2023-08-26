import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

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

  subscriptions:Subscription[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('game/' + this.gameService.getFilmOfDay());
    }, 1000)

    this.subscriptions = [
      // this.gameService.getFavorites()
    ]

  }

}
