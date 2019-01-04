import { AppRegistry } from "react-native";
// import App from "./outputs/App";
import MovieIndex from "./outputs/presentation/screens/index/MovieIndex";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => MovieIndex);
