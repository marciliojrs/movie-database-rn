import { ObjectMapper } from "json-object-mapper";
import { IMovie } from "src/domain/entities/IMovie";
import { MovieRepositoryType } from "src/domain/repositories/MovieRepository";
import { Movie } from "../entities/Movie";
import { callApi } from "../moviedb.api";

let totalPages: number | null;

export function makeMovieRepository(): MovieRepositoryType {
  return {
    async upcoming(page: number): Promise<IMovie[]> {
      if (totalPages && page > totalPages) {
        return Promise.reject();
      }
      const upcomingMovies = await callApi("movie/upcoming", {
        page: page.toString()
      });

      totalPages = upcomingMovies.total_pages;
      return ObjectMapper.deserializeArray(Movie, upcomingMovies.results);
    }
  };
}
