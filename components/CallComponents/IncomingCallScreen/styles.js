import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'
import config from "../../../config/app.js";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: config.screenWidth,
    height: config.screenHeight,
    //borderWidth: 1, borderColor: "red"
  },
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  contentBackground: {
    backgroundColor: "transparent",
    padding: 20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    color: "#fff",
    fontSize: correctFontSizeForScreen(22)
  },
  actionTouchable: {
    height:80,
    width:80,
    borderRadius: 100,
    borderBottomWidth: 1,
    backgroundColor: "#4CD964",
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  actionGreen: {
    backgroundColor: "#4CD964"
  },
  actionRed: {
    backgroundColor: "#FF3B30"
  },
  actionText: {
    textAlign: 'center',
    flex: 1,
    fontSize: correctFontSizeForScreen(18),
    color: "#FFF"
  }
})
