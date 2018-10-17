import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal,Image } from 'react-native'
import CallScreen from '../../../CallScreen';
const webRTCServices = require("../../../lib/services");
import s from './styles'
import NavigationService from '../../NavigationService';

const callAnswerIco=require('../../../assets/images/call/action-answer.png')

const callHangUpIco=require('../../../assets/images/call/action-hangup.png')

export default class IncomingCallScreen extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  }
  constructor(props) {
    super(props);
    this.onAnswerPress = this.onAnswerPress.bind(this);
    this.onDeclinePress = this.onDeclinePress.bind(this);
    this.onHangUpPress = this.onHangUpPress.bind(this);
    this.state = {
      accepted: false,
      decline: false,
      roomName: '',
    }


    this.WaitingforHangUp = this.WaitingforHangUp.bind(this);
    this.WaitingforDecline = this.WaitingforDecline.bind(this);
  }
  onAnswerPress() {
    webRTCServices.acceptCall();
    webRTCServices.CallAccepted((data) => {
      if (!this.state.decline) {
        this.setState({
          accepted: true,
          roomName: data.roomName
        })
      }
    })
  }
  onDeclinePress() {
    webRTCServices.CallDecline();
    this.setState({ decline: true })
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


  WaitingforDecline() {
    webRTCServices.ListenCallDecline(() => {
      this.setState({
        accepted: false,
        decline: true,
        hangup: false,
        roomName: ''
      })
      NavigationService.navigate('Main');
    })
  }

  onHangUpPress() {
    this.setState({ hangup: true, accepted: false });
    // NavigationService.navigate('Main')
    webRTCServices.HangUp();
    NavigationService.navigate('Main');
  }

  componentDidMount() {
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
        <View style={{ backgroundColor: '#05146E',width:'100%', justifyContent:'center',alignItems:'center',height:50}}>
          <Text style={s.titleText}> {this.props.navigation.getParam('incomingPhoneNumer', 'NA')} is calling</Text>
        </View>
        <CallScreen thisIsMyCallReq={false} roomName={this.state.roomName} myPhoneNumber={this.props.navigation.getParam('phoneNumber', 'NA')} incomingPhoneNumber={this.props.navigation.getParam('incomingPhoneNumer', 'NA')} Callaccepted={this.state.accepted} Calldecline={this.state.decline} Callhangup={this.state.hangup} />
        <View style={s.contentBackground}>

          {this.state.accepted ? null :
            <TouchableOpacity onPress={this.onAnswerPress} style={[s.actionTouchable, s.actionGreen]}>
              <Image source={callAnswerIco}/>
            </TouchableOpacity>


          }
          {this.state.accepted ?
            <TouchableOpacity onPress={this.onHangUpPress} style={[s.actionTouchable, s.actionRed]}>
               <Image source={callHangUpIco}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
               <Image source={callHangUpIco}/>
            </TouchableOpacity>}

        </View>

      </View>
    )
  }
}

