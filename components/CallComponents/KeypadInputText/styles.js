import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    height:40
  },
  text: {
    marginLeft: 48,
    flex: 1,
    textAlign: 'center',
    fontSize: correctFontSizeForScreen(30)
  },
  textNotEditable: {
    marginLeft: 10,
    marginRight: 10
  },
  clearTouchable: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  addTouchable: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16
  }
})

export default styles
