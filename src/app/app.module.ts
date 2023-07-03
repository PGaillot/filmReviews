import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UatInterceptor } from 'src/helpers/uat.interceptior';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { MoviesListSelectionComponent } from './components/movies-list-selection/movies-list-selection.component';
import { SortSessionComponent } from './components/sort-session/sort-session.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { MovieResearchListComponent } from './components/movie-research-list/movie-research-list.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmCardComponent,
    MoviesListSelectionComponent,
    SortSessionComponent,
    FilmDetailsComponent,
    MovieResearchListComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UatInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
