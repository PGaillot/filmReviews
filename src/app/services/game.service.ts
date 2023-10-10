import { Injectable } from '@angular/core';
import { Keyword } from '../models/keyword.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private staringDate: Date = new Date('2023-10-10');
  private now: Date = new Date();
  private startingDay: number = this.staringDate.getDay();
  private nowDay: number = this.now.getDay();

  private films: number[] = [13, 120, 9354, 603, 2899];

  private minScore: number = 2;
  private minLenght: number = 3;


  getDay(): number {
    return this.nowDay - this.startingDay;
  }

  getFilmOfDay() {
    return this.films[this.getDay()];
  }

  getWordScore(word: string): number {
    let bonus: number = 0;
    if (word.length > this.minLenght) {
      bonus = (word.length - this.minLenght - 1) * 0.2;
      return this.minScore + bonus;
    } else {
      return 0;
    }
  }

  generateWordsArray(text: string): string[] {
    return text.split(/[ .,…!,?,;:)'’"(]/).filter(Boolean);
  }

  generateKeywordsArray(wordsArray: string[]): Keyword[] {
    let keywordsArrays: Keyword[] = [];
    wordsArray.forEach(word => {
      const score: number = this.getWordScore(word);
      const keyword: Keyword = {
        keyword: word,
        score: score,
        available: word.length <= this.minLenght && score === 0 ? false : true,
      }

      if (keyword.available) {
        keyword.childrens = [];
      }
      keywordsArrays = [...keywordsArrays, keyword]
    })

    console.log(keywordsArrays);

    return keywordsArrays;
  }

  checkAccentMarks(keyword: Keyword): Keyword {
        const kw: Keyword = {
          keyword: keyword.keyword.toLocaleLowerCase(),
          score: keyword.score - 0.2,
          message: '-0.2 pts / Erreur de majuscule',
          available: true,
          isChild: true,
        }
        keyword.childrens?.push(kw)
    return keyword;
  }

}
