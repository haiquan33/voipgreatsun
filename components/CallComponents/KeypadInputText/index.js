import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image } from 'react-native'

import s from './styles'

const KeypadInputText = ({ style, textStyle, value, editable, onBackspacePress, onClearPress,showAddContact }) => {
  return (
    <View style={[s.container, style]}>
      {
        !value || value.length === 0 || editable === false ? null :
          <TouchableOpacity
              onPress={showAddContact}
            style={s.addTouchable}
          >
            <Image source={require('../../../assets/images/call/action-add.png')} style={{width:25,height:25}} />
          </TouchableOpacity>
      }
      <Text
        numberOfLines={1}
        style={[s.text, (editable === false ? s.textNotEditable : null), textStyle]}
      >
        {value}
      </Text>

      {
        !value || value.length === 0 || editable === false ? null :
          <TouchableOpacity
            onPress={onBackspacePress}
            onLongPress={onClearPress}
            style={s.clearTouchable}
          >
            <Image source={require('../../../assets/images/keypad/input-back.png')} />
          </TouchableOpacity>
      }
    </View>
  )
}

KeypadInputText.propTypes = {
  //style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onBackspacePress: PropTypes.func,
  onClearPress: PropTypes.func
}

export default KeypadInputText
