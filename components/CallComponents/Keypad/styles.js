import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

export default styles = StyleSheet.create({
  row: {
    flex: 0.5,
    flexDirection: "row"
  },
  outerLineOffset: {
    flex: 0.206
  },
  innerLineOffset: {
    flex: 0.309
  },
  keyWrapper: {
    flex: 0.802,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  
   
   
  },
  keyTouchable: {
    borderRadius: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop:20,
    marginBottom:20,
    width:10,
    
  },
  keyDigitText: {
    fontSize: correctFontSizeForScreen(28),
    color: "#000",
    fontWeight: '200',
    textAlign: "center"
  },
  keyLettersText: {
    fontSize: correctFontSizeForScreen(9),
    color: "#000",
    fontWeight: '100',
    textAlign: "center"
  },
  keyDigitWrapper: {
    backgroundColor: '#D8DCDC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    
  }
})

