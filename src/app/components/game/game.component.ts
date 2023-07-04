import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { TMDBApi } from 'src/tmdb.api';

export interface Keyword {
  'keyword': string
  'score': number
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {

  subscriptions: Subscription[] = [];
  movieId: any = null;
  film: any;
  keywords: Keyword[] = []
  testedKw: Keyword[] = []
  score: number = 0;
  posterPath: string = "";
  TIMER: number = 120;
  timer: number = 0;
  timeProgress: number = 1;


  constructor(
    private api: TMDBApi,
    private activatedRoute: ActivatedRoute,
    private imgService: ImageService
  ) { }

  ngOnInit(): void {
    this.timer = this.TIMER;

    const timerInterval = setInterval(() => {
      this.timer -= 1;
      this.timeProgress = this.timer / this.TIMER;
      if (this.timer === 0) clearInterval(timerInterval);
    }, 1000)

    this.movieId = this.activatedRoute.snapshot.paramMap.get('query');
    this.subscriptions = [
      this.api.getMovie(this.movieId).subscribe(res => {
        this.film = res;
        this.prepareKeywords(this.film.overview);
        this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
      })
    ]
  }

  prepareKeywords(overview: string) {
    let rawWordsArray: string[] = overview.split(/[ .,…!,?,;:'’"-]/);
    let wordsArray: string[] = rawWordsArray.filter(word => word.length > 3);

    for (let i = 0; i < wordsArray.length; i++) {
      let bonusPoints: number = wordsArray[i].length > 4 ? ((wordsArray[i].length - 4) * 0.1) : 0;
      bonusPoints = Math.round(bonusPoints * 10) / 10;
      let keyword: Keyword = {
        'keyword': wordsArray[i].toLocaleLowerCase(),
        'score': 2 + bonusPoints
      }
      const wordsIndex: number = this.keywords.findIndex((kw) => kw.keyword === wordsArray[i].toLocaleLowerCase());
      if (wordsIndex === -1) {
        this.keywords.push(keyword)
      } else {

        try {
          if (this.keywords[wordsIndex].score > 2) {
            this.keywords[wordsIndex].score -= 0.5
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    console.log(this.keywords);
  }


  sendKeyword(value: string) {
    const keywordsInput = document.querySelector('#keyword-input') as HTMLInputElement;
    let index: number = this.keywords.findIndex((kw) => kw.keyword === value.toLocaleLowerCase());
    if (index !== -1) {
      this.score += this.keywords[index].score;
      this.testedKw = [...this.testedKw, this.keywords[index]]
    } else {
      {


        this.testedKw = [...this.testedKw, { 'keyword': value, 'score': 0 }]
      }
    }
    keywordsInput.value = '';
    console.log('score : ' + this.score)
  }
}
