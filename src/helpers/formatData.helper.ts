import { Movie } from "src/models/movie.model"
import { MovieDetails } from "src/models/movieDetails.model"

export const convertDataToMovie = (data: any): Movie => {
    
    return {
        adult: data.adult,
        backdrop_path: data.backdrop_path,
        genre_ids: data.genre_ids,
        id: data.id,
        original_language: data.original_language,
        original_title: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        poster_path: data.poster_path,
        release_date: data.release_date,
        title: data.title,
        video: data.video,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
    }
}

export const convertDataToMovieDetails = (data: any): MovieDetails => {

    return{
    belongs_to_collection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres,
    homepage: data.homepage,
    imdb_id: data.imdb_id,
    production_companies: data.production_companies,
    production_countries: data.production_countries,
    revenue: data.revenue,
    runtime: data.runtime,
    spoken_languages: data.spoken_languages,
    status: data.status,
    tagline: data.tagline,
    ...convertDataToMovie(data)
    }
}
