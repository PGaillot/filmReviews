import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortSessionComponent } from './components/sort-session/sort-session.component';

const routes: Routes = [
  {
    path: '',
    component: SortSessionComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/sort-session/sort-session.component').then((m) => m.SortSessionComponent),
        data: {
          banner: true,
          permanentBanner: true,
        },
      },

      // {
      //   path: 'watch/:videoId',
      //   loadChildren: () =>
      //     import('./pages/watch/watch.module').then((m) => m.WatchModule),
      // },

      // {
      //   path: 'search/:term',
      //   loadChildren: () =>
      //     import('./pages/search/search.module').then((m) => m.SearchModule),
      //   data: {
      //     permanentBanner: true,
      //   },
      // },
      // { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
