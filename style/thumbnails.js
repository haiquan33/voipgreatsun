import {StyleSheet} from 'react-native';
import config from "../config/app.js";

export default StyleSheet.create({
  container: {
    position: "absolute",
    //borderWidth: 1, borderColor: "red",
    height: config.thumbnailHeight,
    width: config.screenWidth,
    top: 0,
    right: 0
  },
  thumbnailContainer: {
    //borderWidth: 1, borderColor: "green"
    paddingRight: 5,
    paddingTop: 5
  },
  thumbnail: {
    width: 200,
    height: config.thumbnailHeight
  },
  activeThumbnail: {
    borderColor: "#CCC", borderWidth: 2
  }
});
