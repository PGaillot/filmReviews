import { Movie } from "./movie.model";

export interface MovieDetails extends Movie{
    belongs_to_collection:any,
    budget:any;
    genres:any;
    homepage:string;
    imdb_id:string;
    production_companies:any;
    production_countries:any;
    revenue:number;
    runtime:number;
    spoken_languages:any;
    status:string;
    tagline:string;
}