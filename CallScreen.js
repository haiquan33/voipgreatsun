import React, { Component } from 'react';
import {StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import Thumbnails from "./components/Thumbnails.js";
import FullScreenVideo from "./components/FullScreenVideo.js";
import Commons from "./lib/commons.js";
import styles from "./style/app.js";
import config from "./config/app.js";

const sampleStreamURLs = [
  require("./image/sample-image-1.jpg"),
  require("./image/sample-image-2.jpg"),
  require("./image/sample-image-3.jpg")
]

const sampleFullScreenURL = require("./image/sample-image-2.jpg");
const backgroundImage= require("./image/IMG_0187.jpg");
const logo= require("./image/Garena_Logo.png");

const FRONT_CAMERA = true;
const webRTCServices = require("./lib/services.js");
const VIDEO_CONFERENCE_ROOM = "video_conference";

const SELF_STREAM_ID = "self_stream_id";






export default class CallScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStreamId: null,
      //streamURLs: sampleStreamURLs,
      streams: [], //list of (id, url: friend Stream URL). Id = socketId
      joinState: "ready", //joining, joined
      name: "aaa"
    }
    this.loadCamera=this.loadCamera.bind(this);
  }

  componentDidMount() {
    webRTCServices.getLocalStream(true, (stream) => {
      this.setState({
        activeStreamId: SELF_STREAM_ID,
        streams: [{
          id: SELF_STREAM_ID,
          url: stream.toURL()
        }]
      })
    });
  }

  loadCamera(stream)
  {
    
      this.setState({
        activeStreamId: SELF_STREAM_ID,
        streams: [{
          id: SELF_STREAM_ID,
          url: stream.toURL()
        }]
      })
    
  }

  render() {
    let activeStreamResult = this.state.streams.filter(stream => stream.id == this.state.activeStreamId);
    return <View style={styles.container}>
      <Image source={backgroundImage} blurRadius={3} style={styles.backgroundImage}/>
      <View style={styles.backgroundOverlay} />
      {
        this.state.joinState == "joined" ?
        <FullScreenVideo streamURL={activeStreamResult.length > 0 ? activeStreamResult[0].url : null} />
        :
        null
      }
      {
        this.state.joinState == "joined"?
        <Thumbnails streams={this.state.streams}
          setActive={this.handleSetActive.bind(this)}
          activeStreamId={this.state.activeStreamId}/>
        :
        null
      }
      {this.renderJoinContainer()}
     
    </View>
  }

  renderLogo() {
    return <Image source={logo} style={styles.logo} resizeMode={"contain"}/>;
  }

  renderJoinContainer() {
    if (this.props.Callaccepted){
        this.handleJoinClick();
    }
    if(this.state.joinState != "joined") {
      return <View style={styles.joinContainer}>
      
      </View>
    }
    return null;
  }

  handleSetActive(streamId) {
    this.setState({
      activeStreamId: streamId
    });
  }

  handleJoinClick() {
    let roomName='';
    let ownName='';
    if (!this.props.thisIsMyCallReq){
      roomName=this.props.incomingPhoneNumber+'_to_'+this.props.myPhoneNumber;
      ownName='IReceive'
    }
    else{
      roomName=this.props.myPhoneNumber+'_to_'+this.props.reqPhoneNumber;
  
      ownName='ICall'
    }
   
    if(this.state.name.length == 0 || this.state.joinState != "ready") {
      return;
    }
    //ELSE:
    this.setState({
      joinState: "joining"
    });
    let callbacks = {
      joined: this.handleJoined.bind(this),
      friendConnected: this.handleFriendConnected.bind(this),
      friendLeft: this.handleFriendLeft.bind(this),
      dataChannelMessage: this.handleDataChannelMessage.bind(this)
    }
    webRTCServices.loadLocalStream2(roomName, ownName, callbacks,this.loadCamera);
  }

  //----------------------------------------------------------------------------
  //  WebRTC service callbacks
  handleJoined() {
    console.log("Joined");
    this.setState({
      joinState: "joined"
    });
  }

  handleFriendLeft(socketId) {
    let newState = {
      streams: this.state.streams.filter(stream => stream.id != socketId)
    }
    if(this.state.activeStreamId == socketId) {
      newState.activeStreamId = newState.streams[0].id;
    }
    this.setState(newState);
  }

  handleFriendConnected(socketId, stream) {
    this.setState({
      streams: [
        ...this.state.streams,
        {
          id: socketId,
          url: stream.toURL()
        }
      ]
    })
  }

  handleDataChannelMessage(message) {

  }
}
