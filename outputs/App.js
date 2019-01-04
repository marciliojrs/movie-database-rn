import "reflect-metadata";
import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { makeGetUpcomingMoviesUseCase } from "./domain/usecases/GetUpcomingMoviesUseCase";
import { makeMovieRepository } from "./api/repositories/MovieRepository";
import { Movie } from "./api/entities/Movie";
import { MovieItem } from "./presentation/screens/index/MovieItem";
const numOfColumns = 2;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.repo = makeMovieRepository();
        this.useCase = makeGetUpcomingMoviesUseCase(this.repo);
        this._renderItem = ({ item, index }) => (<MovieItem movie={item} isLast={index == this.state.movies.length - 1} index={index}/>);
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
    async loadMovies() {
        const upcoming = await this.useCase.execute(this.state.page);
        this.setState({ movies: [...this.state.movies, ...upcoming] });
    }
    createRows(data, columns) {
        const rows = Math.floor(data.length / columns);
        let lastRowElements = data.length - rows * columns;
        while (lastRowElements !== columns && lastRowElements != 0) {
            data.push(new Movie());
            lastRowElements += 1;
        }
        return data;
    }
    handleLoadMore() {
        console.log("handleLoadMore");
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.loadMovies();
        });
    }
    render() {
        return (<SafeAreaView style={styles.safeArea}>
        <FlatList data={this.createRows(this.state.movies, numOfColumns)} keyExtractor={item => item.id.toString()} numColumns={numOfColumns} renderItem={this._renderItem} onEndReached={this.handleLoadMore} onEndReachedThreshold={0.5}/>
      </SafeAreaView>);
    }
}
const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#000"
    }
});
//# sourceMappingURL=App.js.map