import { MovieRepositoryType } from "../repositories/MovieRepository";
import { IMovie } from "../entities/IMovie";

export interface GetUpcomingMoviesUseCaseType {
  execute(page: number): Promise<IMovie[]>;
}

export function makeGetUpcomingMoviesUseCase(
  movieRepository: MovieRepositoryType
): GetUpcomingMoviesUseCaseType {
  return {
    execute(page: number) {
      return movieRepository.upcoming(page);
    }
  };
}
