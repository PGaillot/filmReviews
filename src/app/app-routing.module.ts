import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortSessionComponent } from './components/sort-session/sort-session.component';
import { MoviesListSelectionComponent } from './components/movies-list-selection/movies-list-selection.component';

const routes: Routes = [
  {
    path: 'session/:genreId',
    component: SortSessionComponent,
    
  },
  {
    path: 'genre-select',
    component: MoviesListSelectionComponent
  },
  {
    path:'**',
    redirectTo:'genre-select'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
