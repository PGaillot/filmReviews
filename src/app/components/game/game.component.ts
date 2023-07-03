import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  subscriptions: Subscription[] = [];
  movieId: any = null;
  film: any;
  keywords: any[] = []
  constructor(
    private api: TMDBApi,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.paramMap.get('query');
    this.subscriptions = [
      this.api.getMovie(this.movieId).subscribe(res => {
        this.film = res;
        this.prepareKeywords(this.film.overview);
      })
    ]
  }

  prepareKeywords(overview: string) {

    // const originalOverview: string = overview;
    let rawWordsArray: string[] = overview.split(/[ .,…!,?,;:'’"]/);
    let wordsArray: string[] = rawWordsArray.filter(word => word.length > 3);

    for (let i = 0; i < wordsArray.length; i++) {
      const bonusPoints: number = wordsArray[i].length > 4 ? ((wordsArray[i].length - 4) * 0.1) : 0;
      let keyword:any = {
        'keyword': wordsArray[i].toLocaleLowerCase(),
        'score': 2 + bonusPoints
      }

      if (!this.keywords.some((kw) => kw.keyword === wordsArray[i].toLocaleLowerCase())) {
        this.keywords.push(keyword)
            } else{
        // keyword.score -= 1;
        // update this.keywords
        console.log(wordsArray[i])
      }
      
    }

    console.log(this.keywords);

  }
}
