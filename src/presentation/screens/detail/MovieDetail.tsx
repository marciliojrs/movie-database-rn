import React from "react";
import { IMovie } from "../../../domain/entities/IMovie";
import CardBackground from "../../widget/CardBackground";
import CloseButton from "../../widget/CloseButton";
import { StyleSheet, SafeAreaView } from "react-native";

interface Props {
  movie: IMovie;
  close: () => void;
}
interface State {}

export default class MovieDetail extends React.Component<Props, State> {
  render() {
    return (
      <CardBackground movie={this.props.movie}>
        <SafeAreaView>
          <CloseButton style={styles.closeButton} onTap={this.props.close} />
        </SafeAreaView>
      </CardBackground>
    );
  }
}

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 8,
    marginTop: 8
  }
});
