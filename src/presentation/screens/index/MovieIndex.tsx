import React from "react";
import "reflect-metadata";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  StatusBar,
  View,
  ActivityIndicator
} from "react-native";
import { makeMovieRepository } from "../../../api/repositories/MovieRepository";
import { makeGetUpcomingMoviesUseCase } from "../../../domain/usecases/GetUpcomingMoviesUseCase";
import { IMovie } from "../../../domain/entities/IMovie";
import { Movie } from "../../../api/entities/Movie";
import { MovieItem } from "./MovieItem";
import MovieDetail from "../detail/MovieDetail";

interface Props {}
interface State {
  movies: IMovie[];
  page: number;
  selectedMovie: IMovie;
  isModalVisible: boolean;
  isLoading: boolean;
}

const numOfColumns = 2;
export default class MovieIndex extends React.Component<Props, State> {
  repo = makeMovieRepository();
  useCase = makeGetUpcomingMoviesUseCase(this.repo);

  constructor(props: Props) {
    super(props);

    this.state = {
      movies: [],
      page: 1,
      selectedMovie: new Movie(),
      isModalVisible: false,
      isLoading: false
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this.loadMovies();
  }

  private async loadMovies() {
    this.setState({ isLoading: true });

    this.useCase
      .execute(this.state.page)
      .then(upcoming => {
        this.setState({
          movies: [...this.state.movies, ...upcoming],
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
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
      onPress={movie => {
        this.setState({ isModalVisible: true, selectedMovie: movie });
      }}
    />
  );

  _renderFooter = () => {
    return (
      <View
        style={{ height: 50, justifyContent: "center", alignSelf: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  };

  private closeModal() {
    this.setState({ isModalVisible: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.createRows(this.state.movies, numOfColumns)}
          keyExtractor={item => item.id.toString()}
          numColumns={numOfColumns}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={100}
        />
        <Modal
          visible={this.state.isModalVisible}
          animationType="fade"
          onRequestClose={() => this.closeModal()}
        >
          <MovieDetail
            movie={this.state.selectedMovie}
            close={() => {
              this.closeModal();
            }}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000"
  }
});
