import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ListView, Image, TextInput, Dimensions } from 'react-native';


const webRTCServices = require("../../../lib/services.js");
import Keypad from '../Keypad/index'
import KeypadInputText from '../KeypadInputText/index'
import styles, { inputStyle, textStyle, keyUnderlayColor } from "./style.js";

//redux
import { connect } from 'react-redux';

 class DialScreen extends Component {
    constructor(props) {
        super(props)

        const { height, width } = Dimensions.get('window')
        const ratio = height / width

        this.state = {
            value: '',
            actionSize: false,
            heightRatio: ratio * ratio
        }

        this._onClearPress = this.onClearPress.bind(this)
        this._onBackspacePress = this.onBackspacePress.bind(this)
        this._onKeyPress = this.onKeyPress.bind(this)
        this._onDefineKeySize = this.onDefineKeySize.bind(this)
        this._startCall = this.startCall.bind(this);
    }
    startCall() {
        webRTCServices.requestCall(this.state.value);
        this.props.navigation.navigate('ReqCall',{reqPhoneNumber:this.state.value})
    }
    onBackspacePress() {
        this.setState({
            value: this.state.value.substr(0, this.state.value.length - 1)
        })
    }

    onClearPress() {
        this.setState({
            value: ''
        })
    }
    onDefineKeySize({ width }) {
        this.setState({ actionSize: width })
    }
    onKeyPress(key) {
        this.setState({
            value: this.state.value + key
        })
    }
    componentDidMount(){
        alert(this.props.user_phone_no)
        webRTCServices.registerPhone(this.props.navigation.getParam('phoneNumber', 'NA'));
    }

    render() {
        iconCall = require('../../../assets/images/keypad/call-icon.png')
        return (<View style={styles.container}>
            <KeypadInputText


                value={this.state.value}
                onBackspacePress={this._onBackspacePress}
                onClearPress={this._onClearPress}
            />
            <Keypad style={{ flex: 0.75 }} onKeyPress={this._onKeyPress}
                onDefineKeySize={this._onDefineKeySize} />
            <View style={styles.CallActioncontainer}>
                <TouchableOpacity onPress={this._startCall} style={styles.actionTouchable}  >
                    <Image source={iconCall} />
                </TouchableOpacity>
            </View>
        </View>)
    }
}


const mapStateToProps = state=> ({
        user_phone_no:state.user_phone_no
  });
  
export default connect(mapStateToProps)(DialScreen)