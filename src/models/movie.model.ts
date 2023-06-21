
export interface Movie {
    id:number;
    title:string;
    original_title:string;
    original_language:string;
    poster_path:string;
    backdrop_path:string;
    overview:string;
    adult:boolean;
    release_date:string;
    genre_ids:number[];
    popularity:number;
    vote_count:number;
    video:number;
    vote_average:number;
}