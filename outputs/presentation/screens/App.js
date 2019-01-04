import "reflect-metadata";
import React from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import { makeGetUpcomingMoviesUseCase } from "../../domain/usecases/GetUpcomingMoviesUseCase";
import { makeMovieRepository } from "../../api/repositories/MovieRepository";
import { Movie } from "../../api/entities/Movie";
const numOfColumns = 2;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._renderItem = ({}) => <View />;
        this.state = {
            movies: []
        };
    }
    async componentDidMount() {
        const repo = makeMovieRepository();
        const useCase = makeGetUpcomingMoviesUseCase(repo);
        const upcoming = await useCase.execute(1);
        this.setState({ movies: upcoming });
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
    render() {
        return (<SafeAreaView style={styles.safeArea}>
        <FlatList data={this.createRows(this.state.movies, numOfColumns)} keyExtractor={item => item.id.toString()} numColumns={numOfColumns} renderItem={this._renderItem}/>
      </SafeAreaView>);
    }
}
const styles = StyleSheet.create({
    leftItem: {
        marginLeft: 8,
        marginRight: 4
    },
    rightItem: {
        marginLeft: 4,
        marginRight: 8
    },
    item: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dcda48",
        flexGrow: 1,
        flexBasis: 0,
        borderRadius: 8
    },
    text: {
        color: "#333333"
    },
    itemEmpty: {
        backgroundColor: "transparent"
    },
    safeArea: {
        backgroundColor: "#000"
    }
});
//# sourceMappingURL=App.js.map