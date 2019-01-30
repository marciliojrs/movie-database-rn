import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { IMovie } from "../../../domain/entities/IMovie";
import CardBackground from "../../widget/CardBackground";
import CloseButton from "../../widget/CloseButton";
import ReleaseDateLabel from "../../widget/ReleaseDateLabel";

interface Props {
  movie: IMovie;
  close: () => void;
}
interface State {}

export default class MovieDetail extends React.Component<Props, State> {
  public render() {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <CardBackground movie={this.props.movie} />
        <SafeAreaView
          style={{ position: "absolute", height: "100%", width: "100%" }}
        >
          <ScrollView>
            <Text style={styles.title}>{this.props.movie.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                margin: 8,
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
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  closeButton: {
    marginTop: Platform.OS === "ios" ? getStatusBarHeight() : 0,
  },
  title: {
    flex: 1,
    color: "white",
    marginLeft: 8,
    marginTop: 8,
    marginRight: 60,
    fontSize: Platform.OS === "ios" ? 26 : 32,
    fontWeight: "bold",
  },
  overview: {
    color: "white",
    margin: 8,
  },
});
