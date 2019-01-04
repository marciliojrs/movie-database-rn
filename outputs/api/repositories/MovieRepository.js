import { ObjectMapper } from "json-object-mapper";
import { Movie } from "../entities/Movie";
import { callApi } from "../moviedb.api";
export function makeMovieRepository() {
    return {
        async upcoming(page) {
            const upcomingMovies = await callApi("movie/upcoming", {
                page: page.toString()
            });
            return ObjectMapper.deserializeArray(Movie, upcomingMovies.results);
        }
    };
}
//# sourceMappingURL=MovieRepository.js.map