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
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit {

  constructor() { }

  rotation: number = 0;
  verticalPosition:number = 0;

  @Input() title!: string;

  @ViewChild('titleElement', { static: true }) titleRef!: ElementRef;

  ngOnInit(): void {
    this.rotation = Math.floor(Math.random() * (-94 - -86 + 1)) + -86;
    this.verticalPosition = Math.floor(Math.random() * (10 - 0 + 1)) + 0;    

    if (this.title.length > 30) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.xSmall;
      //TODO : changer la taille (largeur) de mon sticker (de facon aléatoire) on fonction du nombre de lettre du titre.
    } else if (this.title.length > 25) { 
      this.titleRef.nativeElement.style.fontSize = TitleSize.small;
    } else if (this.title.length > 20) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.medium;
    } else if (this.title.length > 10) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.large;
    } else if (this.title.length > 6) {
      this.titleRef.nativeElement.style.fontSize = TitleSize.xlarge;
    }
  }
}
