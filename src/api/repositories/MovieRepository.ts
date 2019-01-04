import { MovieRepositoryType } from "src/domain/repositories/MovieRepository";
import { IMovie } from "src/domain/entities/IMovie";
import { ObjectMapper } from "json-object-mapper";
import { Movie } from "../entities/Movie";
import { callApi } from "../moviedb.api";

export function makeMovieRepository(): MovieRepositoryType {
  return {
    async upcoming(page: number): Promise<IMovie[]> {
      const upcomingMovies = await callApi("movie/upcoming", {
        page: page.toString()
      });
      return ObjectMapper.deserializeArray(Movie, upcomingMovies.results);
    }
  };
}
