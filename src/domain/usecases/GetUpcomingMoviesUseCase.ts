import { IMovie } from "../entities/IMovie";
import { MovieRepositoryType } from "../repositories/MovieRepository";

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
