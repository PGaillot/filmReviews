import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { TMDBApi } from 'src/tmdb.api';

export interface Keyword {
  'keyword': string
  'score': number
  'color'?: string;
  'message'?: string;
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
  keywords: Keyword[] = [];
  testedKw: Keyword[] = [];
  currentKws: any[] = [];
  score: number = 0;
  posterPath: string = "";
  TIMER: number = 30;
  timer: BehaviorSubject<number>;
  timeProgress: number = 1;
  styledText: SafeHtml = ''


  constructor(
    private api: TMDBApi,
    private activatedRoute: ActivatedRoute,
    private imgService: ImageService,
    private sanitizer: DomSanitizer
  ) {
    this.timer = new BehaviorSubject<number>(this.TIMER)
  }

  ngOnInit(): void {
    const timerInterval = setInterval(() => {
      this.timer.next(this.timer.getValue() - 1);
      this.timeProgress = this.timer.getValue() / this.TIMER;
      if (this.timer.getValue() === 0) clearInterval(timerInterval);
    }, 1000)

    this.movieId = this.activatedRoute.snapshot.paramMap.get('query');
    this.subscriptions = [
      this.api.getMovie(this.movieId).subscribe(res => {
        this.film = res;
        this.prepareKeywords(this.film.overview);
        this.posterPath = this.imgService.getImgUrl(this.film.poster_path);
        this.currentKws = this.keywords;
      })
    ]
  }

  prepareKeywords(overview: string) {
    let rawWordsArray: string[] = overview.split(/[ .,…!,?,;:)'’"(-]/);
    let wordsArray: string[] = rawWordsArray.filter(word => word.length > 3);

    for (let i = 0; i < wordsArray.length; i++) {
      let bonusPoints: number = wordsArray[i].length > 4 ? ((wordsArray[i].length - 4) * 0.1) : 0;
      bonusPoints = Math.round(bonusPoints * 10) / 10;
      let keyword: Keyword = {
        'keyword': wordsArray[i].toLocaleLowerCase(),
        'score': 2 + bonusPoints
      }
      const wordsIndex: number = this.keywords.findIndex((kw) => kw.keyword === wordsArray[i].toLocaleLowerCase());
      // if the keyword is not in the list.
      if (wordsIndex === -1) {
        this.keywords.push(keyword)
      } else {
        if (this.keywords[wordsIndex].score > 2) {
          this.keywords[wordsIndex].score -= 0.5
        }
      }
    }
    console.log(this.keywords);
    console.log(this.keywords.length);
  }

  removeAccents(message: string): string {
    const banChar: any[] = [['é', 'e'], ['è', 'e'], ['ç', 'c'], ['ù', 'u'], ['à', 'a'], ['â', 'a']];
    banChar.forEach(ban => message = message.replace(ban[0], ban[1]))
    return message
  }


  sendKeyword(value: string) {
    const keywordsInput = document.querySelector('#keyword-input') as HTMLInputElement;
    let index: number = this.currentKws.findIndex((kw) => kw.keyword === value.toLocaleLowerCase())
    let indexUnaccented: number = this.currentKws.findIndex((kw) => this.removeAccents(kw.keyword) === this.removeAccents(value.toLocaleLowerCase()))

    if (index !== -1) {
      this.score += this.currentKws[index].score;
      this.testedKw = [...this.testedKw, this.currentKws[index]];
      this.currentKws.splice(index, 1)

    } else if (indexUnaccented !== -1) {
      // test without accents
      this.currentKws[indexUnaccented].score -= 0.5;
      this.currentKws[indexUnaccented].color = 'accent-error';
      this.currentKws[indexUnaccented].message = '(-0.5)';
      this.score += this.currentKws[indexUnaccented].score;
      this.testedKw = [...this.testedKw, this.currentKws[indexUnaccented]];
      this.currentKws.splice(indexUnaccented, 1)
    } else {
      { this.testedKw = [...this.testedKw, { 'keyword': value, 'score': 0 }] }
    }
    console.log(this.currentKws);
    keywordsInput.value = '';
    console.log('score : ' + this.score)
  }


  generateStyledText(inputPhrase: string,): string {
    let styledText = '';
    const words = inputPhrase.split(' ');

    words.forEach(word => {
      let spanClass: string = '';
      const testedkeyword = this.testedKw.find(kw => kw.keyword === (word).toLowerCase());
      const currentkeyword = this.currentKws.find(kw => kw.keyword === (word).toLowerCase());
      console.log(word + ' => testedkeyword: ' + testedkeyword + ' / currentkeyword: ' + currentkeyword)

      testedkeyword !== undefined ? spanClass = 'find' : '' ;
      currentkeyword !== undefined ? spanClass = 'findable' : '' ;


      styledText += `<span class="${spanClass} syn-word">${word}</span> `;
    })

    return styledText.trim();
  }
}
