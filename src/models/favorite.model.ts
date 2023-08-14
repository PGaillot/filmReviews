import { Movie } from "./movie.model";


export class FavoriteHttpResult{
    films!: Movie[];
    page!:number;
    total_pages!:number;
    total_results!:number;
}