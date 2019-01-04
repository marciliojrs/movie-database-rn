export function makeGetUpcomingMoviesUseCase(movieRepository) {
    return {
        execute(page) {
            return movieRepository.upcoming(page);
        }
    };
}
//# sourceMappingURL=GetUpcomingMoviesUseCase.js.map