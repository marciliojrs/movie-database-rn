import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  onTap: () => void;
}

export default class CloseButton extends React.PureComponent<Props> {
  public render() {
    return (
      <TouchableOpacity
        style={[
          this.props.style,
          {
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        activeOpacity={0.8}
        onPress={() => this.props.onTap()}
      >
        <View style={styles.closeButton}>
          <Image
            source={require("../../../images/close.png")}
            style={styles.closeImage}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  closeImage: {
    width: 16,
    height: 16,
  },
  closeButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
});
