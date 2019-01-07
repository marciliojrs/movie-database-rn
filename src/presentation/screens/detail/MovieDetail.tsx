import React from "react";
import { IMovie } from "../../../domain/entities/IMovie";
import CardBackground from "../../widget/CardBackground";
import CloseButton from "../../widget/CloseButton";
import ReleaseDateLabel from "../../widget/ReleaseDateLabel";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StatusBar,
  Platform
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import EStyleSheet from "react-native-extended-stylesheet";

interface Props {
  movie: IMovie;
  close: () => void;
}
interface State {}

export default class MovieDetail extends React.Component<Props, State> {
  render() {
    return (
      <CardBackground movie={this.props.movie}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <Text style={styles.title}>{this.props.movie.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                margin: 8
              }}
            >
              <ReleaseDateLabel date={this.props.movie.releaseDate} />
            </View>

            <Text style={styles.overview}>{this.props.movie.overview}</Text>
          </ScrollView>
        </SafeAreaView>
        <View style={{ alignSelf: "flex-end", position: "absolute" }}>
          <CloseButton style={styles.closeButton} onTap={this.props.close} />
        </View>
      </CardBackground>
    );
  }
}

const styles = EStyleSheet.create({
  closeButton: {
    marginTop: Platform.OS === "ios" ? getStatusBarHeight() : 0
  },
  title: {
    flex: 1,
    color: "white",
    marginLeft: 8,
    marginTop: 8,
    marginRight: 60,
    fontSize: Platform.OS === "ios" ? 26 : 32,
    fontWeight: "bold"
  },
  overview: {
    color: "white",
    margin: 8
  }
});
