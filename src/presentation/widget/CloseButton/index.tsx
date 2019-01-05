import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  onTap: () => void;
}

export default class CloseButton extends React.PureComponent<Props> {
  render() {
    let myStyles = [this.props.style];
    myStyles.push(styles.closeButton);
    return (
      <TouchableOpacity
        style={myStyles}
        activeOpacity={0.8}
        onPress={() => this.props.onTap()}
      >
        <Image
          source={require("../../../images/close.png")}
          style={styles.closeImage}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  closeImage: {
    width: 16,
    height: 16
  },
  closeButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12
  }
});
