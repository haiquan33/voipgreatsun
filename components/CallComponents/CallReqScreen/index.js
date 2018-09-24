import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal } from 'react-native'
import CallScreen from '../../../CallScreen';
const webRTCServices = require("../../../lib/services");
import s from './styles'
import NavigationService from '../../NavigationService';

export default class CallReqScreen extends Component {
  constructor(props) {
    super(props);

    this.onDeclinePress = this.onDeclinePress.bind(this);
    this.onHangUpPress = this.onHangUpPress.bind(this);
    this.state = {
      accepted: false,
      decline: false,
      hangup: false,
      roomName: ''
    }

    this.WaitingforHangUp = this.WaitingforHangUp.bind(this);
    this.WaitingforReply = this.WaitingforReply.bind(this);
    this.WaitingforDecline=this.WaitingforDecline.bind(this);
  }
  WaitingforReply() {
    webRTCServices.CallAccepted((data) => {
      if (!this.state.decline) {
        this.setState({
          accepted: true,
          roomName: data.roomName
        })
      }

    })
  }

  WaitingforDecline(){
    webRTCServices.ListenCallDecline(()=>{
      this.setState({
        accepted: false,
        decline: true,
        hangup: false,
        roomName: ''
      })
      NavigationService.navigate('Main');
    })
  }

  WaitingforHangUp() {
    webRTCServices.CallHangUp(() => {
      webRTCServices.HangUp();


      this.setState({
        accepted: false,
        decline: false,
        hangup: true,
        roomName: ''
      })
      NavigationService.navigate('Main');

    })
  }

  onDeclinePress() {
    
    this.setState({ decline: true });
    webRTCServices.CallDecline();
  }
  onHangUpPress() {
    this.setState({ hangup: true, accepted: false });
    // NavigationService.navigate('Main')
    webRTCServices.HangUp();
    NavigationService.navigate('Main');
  }
  componentDidMount() {
    this.WaitingforReply();
    this.WaitingforHangUp();
    this.WaitingforDecline();
  
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
        <CallScreen thisIsMyCallReq={true} roomName={this.state.roomName} myPhoneNumber={this.props.navigation.getParam('phoneNumber', 'NA')} reqPhoneNumber={this.props.navigation.getParam('reqPhoneNumber', 'NA')} Callaccepted={this.state.accepted} Calldecline={this.state.decline} Callhangup={this.state.hangup} />
        <View style={s.contentBackground}>
          <View style={s.titleContainer}>
            <Text style={s.titleText}> {this.props.navigation.getParam('incomingPhoneNumer', 'NA')} is calling</Text>
          </View>


          {this.state.accepted ?
            <TouchableOpacity onPress={this.onHangUpPress} style={[s.actionTouchable, s.actionRed]}>
              <Text style={s.actionText}>HangUp</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
              <Text style={s.actionText}>Decline</Text>
            </TouchableOpacity>}

        </View>

      </View>
    )
  }
}


