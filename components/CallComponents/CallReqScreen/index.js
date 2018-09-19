import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal } from 'react-native'
import CallScreen from '../../../CallScreen';
const webRTCServices = require("../../../lib/services");
import s from './styles'

export default class CallReqScreen extends Component {
  constructor(props){
    super(props);
   
    this.onDeclinePress=this.onDeclinePress.bind(this);
    this.state={
      accepted:false,
      decline:false,
      roomName:''
    }
    this.WaitingforReply=this.WaitingforReply.bind(this);
  }
  WaitingforReply(){
    webRTCServices.CallAccepted((data)=>{
      this.setState({accepted:true,
                      roomName:data.roomName})
    
  })
  }
  onDeclinePress(){
    this.setState({decline:true})
  }
  render() {
    this.WaitingforReply();
    return (
      <View
        animationType={"fade"}
        transparent
        visible
        onRequestClose={this.onDeclinePress}
        style={s.container}
      >
          <CallScreen thisIsMyCallReq={true} roomName={this.state.roomName} myPhoneNumber={this.props.navigation.getParam('phoneNumber', 'NA')} reqPhoneNumber={this.props.navigation.getParam('reqPhoneNumber', 'NA')} Callaccepted={this.state.accepted} Calldecline={this.state.decline} />
          <View style={s.contentBackground}>
            <View style={s.titleContainer}>
              <Text style={s.titleText}> {this.props.navigation.getParam('incomingPhoneNumer', 'NA')} is calling</Text>
            </View>

          

            <TouchableOpacity onPress={this.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
              <Text style={s.actionText}>Decline</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    )
  }
}


