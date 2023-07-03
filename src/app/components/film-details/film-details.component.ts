import { AfterViewInit, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "src/app/services/image.service";
import { Movie } from "src/models/movie.model";
import { MovieDetails } from "src/models/movieDetails.model";
import { TMDBApi } from "src/tmdb.api";

@Component({
    selector: 'app-film-details',
    templateUrl: './film-details.component.html',
    styleUrls: ['./film-details.component.scss']
})

export class FilmDetailsComponent implements OnInit, AfterViewInit , OnDestroy{

    movieId: any = '';
    film: any = undefined
    subscriptions:Subscription[] = [];
    images:any[] = [];

    constructor(
        private api: TMDBApi,
        private activatedRoute: ActivatedRoute,
        private imgService:ImageService
    ) { }
    
    ngOnInit(): void {
        this.movieId = this.activatedRoute.snapshot.paramMap.get('query');
        
        this.subscriptions = [
            this.api.getMovieDetails(this.movieId).subscribe((mov: MovieDetails) => {
                this.film = mov;
                console.log(this.film)
            }),
            this.api.getMovieImages(this.movieId).subscribe(res => this.images = res.backdrops)
        ]
        
        
        
    }
    
    
    ngAfterViewInit(): void {
        
    }
    
    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
    
    getPoster(poster_path:string) {
        return this.imgService.getImgUrl(poster_path, 3);
    }

}