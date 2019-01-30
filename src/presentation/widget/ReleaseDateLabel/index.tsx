import moment from "moment";
import React from "react";
import { Platform, StyleProp, Text, ViewStyle } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

interface Props {
  date: Date;
  style?: StyleProp<ViewStyle>;
}
export default class ReleaseDateLabel extends React.PureComponent<Props> {
  public render() {
    return (
      <Text style={[styles.releaseDate, this.props.style]}>
        {moment(this.props.date).format("MM-DD-YYYY")}
      </Text>
    );
  }
}

const styles = EStyleSheet.create({
  releaseDate: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontSize: Platform.OS === "ios" ? 9 : 11,
    color: "white",
    padding: 4,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "auto",
  },
});
