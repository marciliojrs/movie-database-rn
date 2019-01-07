import { AppRegistry } from "react-native";
// import App from "./outputs/App";
import MovieIndex from "./outputs/presentation/screens/index/MovieIndex";
import { name as appName } from "./app.json";
import ESStyleSheet from "react-native-extended-stylesheet";

AppRegistry.registerComponent(appName, () => MovieIndex);
ESStyleSheet.build();
