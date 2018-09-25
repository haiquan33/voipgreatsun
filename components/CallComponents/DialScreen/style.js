import {StyleSheet} from 'react-native';
import config from "../../../config/app.js";
import {correctFontSizeForScreen} from '../../../utils/scale'


export function inputStyle (ratio, theme) {
  return {
    flex: 0.08 * ratio,
    backgroundColor: theme === 'dark' ? "#3c4b51" : undefined
  }
}

export function textStyle (theme) {
  return {
    color: theme === 'dark' ? "#FFF" : undefined
  }
}

export function keyUnderlayColor (theme) {
  return {
    color: theme === 'dark' ? "#566971" : undefined
  }
}

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: config.screenWidth,
    height: config.screenHeight,
    //borderWidth: 1, borderColor: "red"
  },
  CallActioncontainer: {
    flex: 0.2,
    justifyContent: 'center',
    flexDirection:'row'
  },
  actionsWrapper: {
    flex: 0.281,
    flexDirection: "row"
  },
  action: {
    flex: 0.202,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  actionTouchable: {
    width:'50%',
    height:'50%',
    backgroundColor: "#05146E",
    justifyContent: 'center',
    borderRadius: 128,
    alignItems: 'center'
  },
  actionDarkTouchable: {
    backgroundColor: "#59696f"
  },
  actionGreenTouchable: {
    backgroundColor: "#4cd964"
  },
  actionText: {
    fontSize: correctFontSizeForScreen(9),
    color: "#000",
    fontWeight: '200',
    textAlign: "center",
    paddingTop: 5
  },
  actionDarkText: {
    color: "#FFF"
  },
  modalWrapper:{
    justifyContent:'center',
    alignItems:'center'
  },
  modalInput:{
    height: 50,
    width:'70%', 
    borderBottomColor:'black',
    borderBottomWidth:2,
    fontSize:18,
    marginTop:15
  },
  modalActionWrapper:{
    flexDirection:'row',
    width:'100%',
    justifyContent: 'space-around',
    marginTop:100,
  },
  modalButton:{
      width:40,
      height:40,
    
      resizeMode:'stretch'
  }
})

