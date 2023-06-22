import { Movie } from "src/models/movie.model"

export const convertDataToMovie = (data: any): Movie => {
    return {
        poster_path: data.poster_path,
        adult: data.adult,
        overview: data.overview,
        release_date: data.release_date,
        genre_ids: data.genre_ids,
        id: data.id,
        original_title: data.original_title,
        original_language: data.original_language,
        backdrop_path: data.backdrop_path,
        popularity: data.popularity,
        vote_count: data.vote_count,
        video: data.video,
        vote_average: data.vote_average,
        title: data.title,
    }
}
