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


  /**
   * Check if a keyword have a capital letter,
   * and return a new keyword with a keyword children
   * without capital.
   *  
   * @param keyword 
   * @returns keyword
   */
  checkAccentsLetters(keyword: Keyword): Keyword {
    if (keyword.keyword.normalize('NFD') != keyword.keyword) {
      const charArray: string[] = Array.from(keyword.keyword);
      let i: number = 0;

      charArray.forEach((letter: string) => {
        if (letter.normalize('NFD') != letter) {
          let wordVariant: string = '';
          for (let l = 0; l < charArray.length; l++) {
            if (i === l) {
              const newChar: string = charArray[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
              wordVariant += newChar;
            } else {
              wordVariant += charArray[l];
            }
          }
          const kw: Keyword = {
            keyword: wordVariant,
            score: keyword.score - 0.2,
            message: '-0.2 pts / Erreur d\'accent.',
            available: keyword.available,
            isChild: true,
          }
          if (!keyword.childrens) keyword.childrens = [];
          keyword.childrens?.push(kw);
        }
        i++
      })

      if (i > 2) {
        const withoutAccents: string = keyword.keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const kw: Keyword = {
          keyword: withoutAccents,
          score: keyword.score - 0.2,
          message: '-0.2 pts / Erreur d\'accent.',
          available: keyword.available,
          isChild: true,
        }
        keyword.childrens?.push(kw);
      }

      return keyword;
    } else {
      return keyword;
    }
  }


  /**
   * Check if a keyword have a capital letter,
   * and return a new keyword with a keyword children
   * without capital.
   *  
   * @param keyword 
   * @returns keyword
   */
  checkCapitalLetters(keyword: Keyword): Keyword {

    function createNoCapsVariant(keyword: Keyword): Keyword {
      return {
        keyword: keyword.keyword.toLocaleLowerCase(),
        score: keyword.score - 0.2,
        message: '-0.2 pts / Erreur de majuscule',
        available: keyword.available,
        isChild: true,
      }
    }
    if (keyword.keyword.toLocaleLowerCase() != keyword.keyword) {
      if (keyword.childrens) {
        for (let index = 0; index < keyword.childrens.length; index++) {
          const children = keyword.childrens[index];
          if (children.keyword !== children.keyword.toLocaleLowerCase()) keyword.childrens.push(createNoCapsVariant(children))
        }
      } else {
        keyword.childrens = [];
      }
      keyword.childrens.push(createNoCapsVariant(keyword))
      return keyword;
    } else {
      return keyword;
    }
  }

  generateVariants(keyword:Keyword):Keyword{
    keyword = this.checkAccentsLetters(keyword);
    keyword = this.checkCapitalLetters(keyword);
    return keyword
  }

  /**
   * Create a Keywords list from synopis.
   * 
   * @param wordsArray 
   * @returns Keyword[]
   */
  generateKeywordsArray(synopis: string): Keyword[] {
    const wordsArray: string[] = this.generateWordsArray(synopis)
    let keywordsArrays: Keyword[] = [];
    wordsArray.forEach(word => {
      const score: number = this.getWordScore(word);
      let keyword: Keyword = {
        keyword: word,
        score: score,
        available: word.length <= this.minLenght && score === 0 ? false : true,
      }
      keywordsArrays = [...keywordsArrays, this.generateVariants(keyword)]
    })
    console.log(keywordsArrays);
    return keywordsArrays;
  }
}
