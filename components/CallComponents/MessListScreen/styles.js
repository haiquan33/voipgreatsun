import {StyleSheet} from 'react-native';
import config from "../../../config/app.js";
import {correctFontSizeForScreen} from '../../../utils/scale'


export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      width: config.screenWidth,
      height: config.screenHeight,
      //borderWidth: 1, borderColor: "red"
    },
   
  })
  
  