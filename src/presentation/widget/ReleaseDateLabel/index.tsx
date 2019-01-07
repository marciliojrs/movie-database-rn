import React from "react";
import { StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import moment from "moment";

interface Props {
  date: Date;
  style?: StyleProp<ViewStyle>;
}
export default class ReleaseDateLabel extends React.PureComponent<Props> {
  render() {
    return (
      <Text style={[styles.releaseDate, this.props.style]}>
        {moment(this.props.date).format("MM-DD-YYYY")}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  releaseDate: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontSize: 9,
    color: "white",
    padding: 4,
    borderRadius: 8,
    overflow: "hidden",
    alignSelf: "auto"
  }
});
