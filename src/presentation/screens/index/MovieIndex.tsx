import React from "react";
import "reflect-metadata";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { makeMovieRepository } from "../../../api/repositories/MovieRepository";
import { makeGetUpcomingMoviesUseCase } from "../../../domain/usecases/GetUpcomingMoviesUseCase";
import { IMovie } from "../../../domain/entities/IMovie";
import { Movie } from "../../../api/entities/Movie";
import { MovieItem } from "./MovieItem";

interface Props {}
interface State {
  movies: IMovie[];
  page: number;
}

const numOfColumns = 2;
export default class MovieIndex extends React.Component<Props, State> {
  repo = makeMovieRepository();
  useCase = makeGetUpcomingMoviesUseCase(this.repo);

  constructor(props: Props) {
    super(props);

    this.state = {
      movies: [],
      page: 1
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    console.log(this.state.page);
    this.loadMovies();
  }

  private async loadMovies() {
    const upcoming = await this.useCase.execute(this.state.page);
    this.setState({ movies: [...this.state.movies, ...upcoming] });
  }

  private createRows(data: IMovie[], columns: number) {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns && lastRowElements != 0) {
      data.push(new Movie());
      lastRowElements += 1;
    }
    return data;
  }

  private handleLoadMore() {
    console.log("handleLoadMore");
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.loadMovies();
      }
    );
  }

  _renderItem = ({ item, index }: { item: IMovie; index: number }) => (
    <MovieItem
      movie={item}
      isLast={index == this.state.movies.length - 1}
      index={index}
    />
  );

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={this.createRows(this.state.movies, numOfColumns)}
          keyExtractor={item => item.id.toString()}
          numColumns={numOfColumns}
          renderItem={this._renderItem}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000"
  }
});
