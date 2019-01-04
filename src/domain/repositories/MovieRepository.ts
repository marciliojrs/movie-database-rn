import { IMovie } from "../entities/IMovie";

export interface MovieRepositoryType {
  upcoming(page: number): Promise<IMovie[]>;
}
