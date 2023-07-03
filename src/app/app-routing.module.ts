import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortSessionComponent } from './components/sort-session/sort-session.component';
import { MoviesListSelectionComponent } from './components/movies-list-selection/movies-list-selection.component';
import { HomeComponent } from './components/home/home.component';
import { MovieResearchListComponent } from './components/movie-research-list/movie-research-list.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'session/:genreId',
    component: SortSessionComponent
    
  },
  {
    path: 'genre-select',
    component: MoviesListSelectionComponent
  },
  {
    path: 'game/:query',
    component: GameComponent
  },
  {
    path: 'research/:query',
    component: MovieResearchListComponent
  },
  {
    path: 'movie/:query',
    component: FilmDetailsComponent
  },
  {
    path:'**',
    redirectTo:'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
