import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/models/movie.model';
import { TMDBApi } from 'src/tmdb.api';

@Component({
  selector: 'app-sort-session',
  templateUrl: './sort-session.component.html',
  styleUrls: ['./sort-session.component.scss']
})
export class SortSessionComponent implements OnInit {

  constructor(
    private api:TMDBApi,
  ) { }


    subscripions:Subscription[] = [];

  ngOnInit(): void {

    this.subscripions = [
      this.api.getDiscover('18', false,  false).subscribe((res:Movie[]) => {
        console.log(res)
      }),
    
    ]
  }

}
