import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/models/movie.model';

export enum Side {
  'FRONT',
  'BACK',
  'SPINE-FRONT',
  'SPINE-BACK',
  'SPINE-TOP',
  'SPINE-BOTTOM',
}

@Component({
  selector: 'app-vhs',
  templateUrl: './vhs.component.html',
  styleUrls: ['./vhs.component.scss']
})
export class VHSComponent implements OnInit {

  @ViewChild('vhs', { static: true }) vhsRef!: ElementRef;
  @ViewChild('light', { static: true }) lightRef!: ElementRef;

  constructor() { }

  @Input() movie!: Movie;

  mostX: number = 10;
  mostY: number = 10;
  topLightPosition: string = '-50%'
  leftLightPosition: string = '-20%'

  //Sticker
  stickerVerticalPosition: number = 0;


  @HostListener('mousemove', ['$event'])
  onmousemove(e: any) {
    // init transition
    this.vhsRef.nativeElement.transition = 'none'

    const x: number = e.offsetX;
    const y: number = e.offsetY;

    //set the VHS z-index
    this.vhsRef.nativeElement.style.zIndex = '10'

    // Transform the VHS.
    const height: number = e.target.offsetHeight;
    const width: number = e.target.offsetWidth;
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const rotationY = ((x - halfWidth) / halfWidth) * this.mostX;
    const rotationX = ((y - halfHeight) / halfHeight) * this.mostY;

    this.vhsRef.nativeElement.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg) matrix(1.1, 0, 0, 1.1, 0, 0)`

    this.lightRef.nativeElement.style.left = `${(rotationX / this.mostX * 30) * -1}%`
    this.lightRef.nativeElement.style.top = `${(rotationY / this.mostY * 30) * -1}%`
  }

  @HostListener('mouseleave', ['$event'])
  onmouseleave(e: Event) {
    // this.vhsRef.nativeElement.style.transition = 'transform .5s ease-in-out';
    // this.lightRef.nativeElement.style.transition = 'left .5s ease-in-out, top .5s ease-in-out'

    // back to defaut position
    this.vhsRef.nativeElement.style.transform = 'rotate(0)';
    this.vhsRef.nativeElement.style.zIndex = '0';
    this.initLightPosition();
  }

  initLightPosition() {
    this.lightRef.nativeElement.style.top = this.topLightPosition;
    this.lightRef.nativeElement.style.left = this.leftLightPosition;
  }

  ngOnInit(): void {
    this.initLightPosition();
    this.stickerVerticalPosition = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
  }

}


