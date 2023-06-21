import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UatInterceptor } from 'src/helpers/uat.interceptior';
import { FilmCardComponent } from './components/film-card/film-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmCardComponent
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
