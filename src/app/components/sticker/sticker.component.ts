import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

enum TitleSize {
  'xSmall' = '70%',
  'small' = '90%',
  'medium' = '120%',
  'large' = '150%',
  'xlarge' = '180%'
}

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss', './templates/sticker-t1.scss', './templates/sticker-t2.scss']
})
export class StickerComponent implements OnInit {

  constructor() { }

  rotation: number = 0;
  verticalPosition: number = 0;
  style: number = 0;


  @Input() title!: string;

  @ViewChild('titleElement', { static: true }) titleRef!: ElementRef;
  @ViewChild('sticker', {static:true}) stickerRef!: ElementRef;

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
    this.style = this.getRandomNumber(1, 2);
    this.rotation = this.getRandomNumber(-86, -94)
    this.verticalPosition = this.getRandomNumber(10, 0)

    console.log('sticker style : ' + this.style);


    if (this.title.length > 45) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.xSmall;
    } else if (this.title.length > 30) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.small;
    } else if (this.title.length > 20) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.medium;
      //change la taille (largeur) de mon sticker en fonction du nombre de lettres du titre.
      this.stickerRef.nativeElement.style.width = '90%'
    } else if (this.title.length > 15) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.large;
      this.stickerRef.nativeElement.style.width = '80%'
    } else if (this.title.length > 6) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.xlarge;
      this.stickerRef.nativeElement.style.width = '70%'
    
    }
  }
}
