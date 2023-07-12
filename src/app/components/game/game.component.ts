import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, interval, timer } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
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

export class GameComponent implements OnInit, AfterViewInit {


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
  // subscribeTimer: Observable<number> = new Observable<number>();
  kwFindingScore:BehaviorSubject<number>;
  timeFinished: boolean = false;
 

  @ViewChild('keywordInput', { static: true }) keywordInput!: ElementRef;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  @ViewChild('bar', { static: true }) bar!: ElementRef;
  @ViewChild('bottomContent', { static: true }) bottomContent!: ElementRef;
  @ViewChild('bottomContainer', { static: true }) bottomContainer!: ElementRef;

  constructor(
    private api: TMDBApi,
    private activatedRoute: ActivatedRoute,
    private imgService: ImageService,
    private gameService: GameService,
  ) {
    this.timer = new BehaviorSubject<number>(this.TIMER);
    this.kwFindingScore = new BehaviorSubject<number>(0);
  }

  prepareKeywords(overview: string) {
    let rawWordsArray: string[] = overview.split(/[ .,…!,?,;:)'’"(-]/);
    let wordsArray: string[] = rawWordsArray.filter(word => word.length > 3);
    for (let i = 0; i < wordsArray.length; i++) {
      let bonusPoints: number = wordsArray[i].length > 4 ? ((wordsArray[i].length - 4) * 0.1) : 0;
      bonusPoints = Math.round(bonusPoints * 10) / 10;
      let keyword: Keyword = {
        'keyword': wordsArray[i].toLocaleLowerCase(),
        'score': 2 + bonusPoints,
        'color': 'findable'
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
      let findedKeyword: Keyword = this.currentKws[index];
      findedKeyword.color = 'find';
      this.testedKw = [...this.testedKw, findedKeyword];
      this.currentKws.splice(index, 1)
      this.kwFindingScore.next(this.kwFindingScore.getValue() + 1);
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

  generateStyledText(inputPhrase: string): string {
    let styledText = inputPhrase;
    styledText = this.remplaceByKeywords(styledText, this.testedKw);
    styledText = this.remplaceByKeywords(styledText, this.currentKws);
    return styledText;
  }

  remplaceByKeywords(inputPhrase: string, keywords: Keyword[]) {
    const inputPhraseLC: string = inputPhrase.toLocaleLowerCase();
    keywords.forEach(kw => {
      if (inputPhrase.includes(kw.keyword)) {
        inputPhrase = inputPhrase.replace(kw.keyword, `<span class="${kw.color}">${kw.keyword}</span>`)
      } else if (inputPhraseLC.includes(kw.keyword)) {
        const kwS: string = kw.keyword.charAt(0).toUpperCase() + kw.keyword.slice(1);
        inputPhrase = inputPhrase.replace(kwS, `<span class="${kw.color}">${(kwS)}</span>`)
      }
    })
    return inputPhrase
  }

  timerLaunch(timerDuration: number) {
    const interval: number = 1000;

    this.bar.nativeElement.animate([
      { transform: 'translateX(-' + 100 + '%)' },
    ], {
      duration: timerDuration * interval,
    });

    const timerInterval = setInterval(() => {
      this.timer.next(this.timer.getValue() - 1);
      if (this.timer.getValue() < timerDuration / 4) {
        this.bar.nativeElement.style.backgroundColor = 'red';
      }
      this.timeProgress = this.timer.getValue() / timerDuration;
      if (this.timer.getValue() === 0) {
        clearInterval(timerInterval);
        this.bottomContainer.nativeElement.style.bottom = '-' + this.bottomContent.nativeElement.offsetHeight + 'px';
        this.progressBar.nativeElement.style.display = 'none'
        this.timeFinished = true;
      };
    }, interval)
  }

  ngOnInit(): void {
    this.timerLaunch(this.TIMER);
    console.log(this.gameService.getDay());
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

  ngAfterViewInit(): void {
    this.keywordInput.nativeElement.focus()
  }
}
