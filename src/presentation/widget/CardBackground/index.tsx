import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { IMovie } from "src/domain/entities/IMovie";

interface Props {
  movie: IMovie;
}

export default class CardBackground extends React.PureComponent<Props> {
  public render() {
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={{
          uri: this.props.movie.backdropPath,
        }}
      >
        <View style={styles.overlay} />
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
