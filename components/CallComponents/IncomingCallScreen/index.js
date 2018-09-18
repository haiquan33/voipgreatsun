import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal } from 'react-native'
import CallScreen from '../../../CallScreen';
const webRTCServices = require("../../../lib/services");
import s from './styles'

export default class IncomingCallScreen extends Component {
  constructor(props){
    super(props);
    this.onAnswerPress=this.onAnswerPress.bind(this);
    this.onDeclinePress=this.onDeclinePress.bind(this);
    this.state={
      accepted:false,
      decline:false
    }
  }
  onAnswerPress(){
      webRTCServices.acceptCall();
      this.setState({accepted:true})
  }
  onDeclinePress(){
    this.setState({decline:true})
  }
  render() {
    return (
      <View
        animationType={"fade"}
        transparent
        visible
        onRequestClose={this.onDeclinePress}
        style={s.container}
      >
          <CallScreen thisIsMyCallReq={false} myPhoneNumber={this.props.navigation.getParam('phoneNumber', 'NA')} incomingPhoneNumber={this.props.navigation.getParam('incomingPhoneNumer', 'NA')} Callaccepted={this.state.accepted} Calldecline={this.state.decline} />
          <View style={s.contentBackground}>
            <View style={s.titleContainer}>
              <Text style={s.titleText}> {this.props.navigation.getParam('incomingPhoneNumer', 'NA')} is calling</Text>
            </View>

            <TouchableOpacity onPress={this.onAnswerPress} style={[s.actionTouchable, s.actionGreen]}>
              <Text style={s.actionText}>Answer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
              <Text style={s.actionText}>Decline</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    )
  }
}


