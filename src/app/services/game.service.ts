import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private staringDate: Date = new Date('2023-07-10');
  private now: Date = new Date();
  private startingDay: number = this.staringDate.getDay();
  private nowDay: number = this.now.getDay();

  private films: number[] = [13, 120, 9354, 603, 2899];


  getDay(): number {
    return this.nowDay - this.startingDay;
  }

  getFilmOfDay() {
    return this.films[this.getDay()];
  }

}
