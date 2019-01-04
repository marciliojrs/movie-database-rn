import React from "react";
import { IMovie } from "src/domain/entities/IMovie";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageBackground,
  Text,
  TouchableOpacity,
  Animated
} from "react-native";

export interface Props {
  movie: IMovie;
  isLast: boolean;
  index: number;
}

interface State {
  cardScale: Animated.Value;
}

export class MovieItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log(props.movie);
    this.state = { cardScale: new Animated.Value(1) };
    this.tapFeedback = this.tapFeedback.bind(this);
  }

  private getItemStyle(): StyleProp<ViewStyle> {
    let itemStyles: StyleProp<ViewStyle>[] = [styles.item];
    if (this.props.index % 2 == 0) {
      itemStyles.push(styles.leftItem);
    } else {
      itemStyles.push(styles.rightItem);
    }

    if (this.props.isLast) {
      itemStyles.push({ marginBottom: 8 });
    }

    return itemStyles;
  }

  private tapFeedback() {
    this.setState(() => {
      Animated.sequence([
        Animated.timing(this.state.cardScale, {
          toValue: 0.95,
          duration: 100
        }),
        Animated.timing(this.state.cardScale, {
          toValue: 1,
          duration: 100
        })
      ]).start();
    });
  }

  render() {
    if (this.props.movie.id == 0) {
      return <View style={[styles.item, styles.itemEmpty]} />;
    }

    return (
      <Animated.View
        style={[
          this.getItemStyle(),
          {
            transform: [
              {
                scale: this.state.cardScale
              }
            ]
          }
        ]}
      >
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: this.props.movie.backdropPath
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ flex: 1 }}
            onPress={this.tapFeedback}
          >
            <View style={styles.overlay} />
            <Text style={styles.title}>{this.props.movie.title}</Text>

            <Text style={styles.releaseDate}>
              {this.props.movie.releaseDate.toDateString()}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </Animated.View>
    );
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
    overflow: "hidden",
    marginTop: 8,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 8
  },
  title: {
    color: "white",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold"
  },
  releaseDate: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    alignSelf: "center",
    bottom: 8,
    fontSize: 9,
    color: "white",
    padding: 4,
    borderRadius: 8,
    overflow: "hidden"
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
