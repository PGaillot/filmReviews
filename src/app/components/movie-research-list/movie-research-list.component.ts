import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ImageService } from "src/app/services/image.service";
import { Movie } from "src/models/movie.model";
import { TMDBApi } from "src/tmdb.api";

@Component({
    selector: 'app-movie-research-list',
    templateUrl: './movie-research-list.component.html',
    styleUrls: ['./movie-research-list.component.scss']
})

export class MovieResearchListComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private api: TMDBApi,
        private imgService: ImageService,
        private router: Router
    ) { }


    query: any = ''
    subscriptions: Subscription[] = [];
    films: Movie[] = [];
    pageIndex: number = 1;
    resultCount: number = 0;
    pageResults: number = 0;
    totalPages: number = 0;

    ngOnInit(): void {
        this.query = this.activatedRoute.snapshot.paramMap.get('query');
        this.subscriptions = [
            this.api.searchMovie(this.query, this.pageIndex).subscribe(
                res => {
                    console.log(res);
                    console.log(res.total_results);
                    console.log(res.page);
                    this.films = res.results;
                    this.resultCount = res.total_results;
                    this.pageResults = res.page;
                    this.totalPages = res.total_pages;
                }
            )
        ]
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }

    moreClick() {
        this.pageIndex++;
        const moreSub: Subscription = this.api.searchMovie(this.query, this.pageIndex).subscribe(res => {
            this.films = [...this.films, ...res.results];
            this.pageResults = res.page
        });
        this.subscriptions = [...this.subscriptions, moreSub]
    }

    getMoviePoster(poster_path: string) {
        return this.imgService.getImgUrl(poster_path, 3)
    }

    onKey(value: string) {
        this.router.navigateByUrl('research/' + value);
    }

}