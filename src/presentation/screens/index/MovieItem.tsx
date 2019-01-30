import React from "react";
import {
  Animated,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { IMovie } from "src/domain/entities/IMovie";
import CardBackground from "../../widget/CardBackground/index";
import ReleaseDateLabel from "../../widget/ReleaseDateLabel";

export interface Props {
  movie: IMovie;
  isLast: boolean;
  index: number;
  onPress: (movie: IMovie) => void;
}

interface State {
  cardScale: Animated.Value;
}

export class MovieItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { cardScale: new Animated.Value(1) };
    this.tapFeedback = this.tapFeedback.bind(this);
  }

  public render() {
    if (this.props.movie.id === 0) {
      return <View style={[styles.item, styles.itemEmpty]} />;
    }

    return (
      <Animated.View
        style={[
          this.getItemStyle(),
          { transform: [{ scale: this.state.cardScale }] },
        ]}
      >
        <CardBackground movie={this.props.movie} />
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          onPress={this.tapFeedback}
        >
          <Text style={styles.title}>{this.props.movie.title}</Text>

          <ReleaseDateLabel
            style={styles.releaseDate}
            date={this.props.movie.releaseDate}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  private getItemStyle(): StyleProp<ViewStyle> {
    const itemStyles: Array<StyleProp<ViewStyle>> = [styles.item];
    if (this.props.index % 2 === 0) {
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
          duration: 100,
        }),
        Animated.timing(this.state.cardScale, {
          toValue: 1,
          duration: 100,
        }),
      ]).start(() => {
        this.props.onPress(this.props.movie);
      });
    });
  }
}

const styles = EStyleSheet.create({
  leftItem: {
    marginLeft: 8,
    marginRight: 4,
  },
  rightItem: {
    marginLeft: 4,
    marginRight: 8,
  },
  item: {
    overflow: "hidden",
    marginTop: 8,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 8,
  },
  title: {
    color: "white",
    margin: 8,
    fontSize: Platform.OS === "ios" ? 16 : 22,
    fontWeight: "bold",
  },
  releaseDate: {
    position: "absolute",
    alignSelf: "center",
    bottom: 8,
  },
  itemEmpty: {
    backgroundColor: "transparent",
  },
});
