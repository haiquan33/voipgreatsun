import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal, Image } from 'react-native'
import CallScreen from '../../../CallScreen';
const webRTCServices = require("../../../lib/services");
import s from './styles'
import NavigationService from '../../NavigationService';


const callHangUpIco = require('../../../assets/images/call/action-hangup.png')


export default class CallReqScreen extends Component {
  static navigationOptions = {
    header: null // !!! Hide Header
  }
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
    this.WaitingforDecline = this.WaitingforDecline.bind(this);
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
        <View style={{ backgroundColor: '#05146E', width: '100%', justifyContent: 'center', alignItems: 'center', height: 50 }}>
          <Text style={s.titleText}> Đang gọi {this.props.navigation.getParam('reqPhoneNumber', 'NA')}</Text>
        </View>

        <CallScreen thisIsMyCallReq={true} roomName={this.state.roomName} myPhoneNumber={this.props.navigation.getParam('phoneNumber', 'NA')} reqPhoneNumber={this.props.navigation.getParam('reqPhoneNumber', 'NA')} Callaccepted={this.state.accepted} Calldecline={this.state.decline} Callhangup={this.state.hangup} />


        <View style={s.contentBackground}>


          {this.state.accepted ?
            <TouchableOpacity onPress={this.onHangUpPress} style={[s.actionTouchable, s.actionRed]}>
              <Image source={callHangUpIco} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={this.onDeclinePress} style={[s.actionTouchable, s.actionRed]}>
              <Image source={callHangUpIco} />
            </TouchableOpacity>}

        </View>

      </View>
    )
  }
}


