import { MovieRepositoryType } from "src/domain/repositories/MovieRepository";
import { IMovie } from "src/domain/entities/IMovie";
import { ObjectMapper } from "json-object-mapper";
import { Movie } from "../entities/Movie";

export function makeMovieRepository(): MovieRepositoryType {
  const baseUrl = "https://api.themoviedb.org/3/";
  const apiKey = "1f54bd990f1cdfb230adb312546d765d";

  return {
    async upcoming(page: number): Promise<IMovie[]> {
      const url =
        baseUrl + "movie/upcoming?api_key=" + apiKey + "&page=" + page;
      const upcomingMovies = await fetch(url);
      return await upcomingMovies
        .json()
        .then(json => ObjectMapper.deserializeArray(Movie, json.results));
    }
  };
}
