import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions } from 'react-native';
import styles from "./style/mainapp.js";
import {Home} from './components/CallComponents/Home/Home'
import LoginScreen from './components/LoginComponents/LoginScreen'
import IncomingCallScreen from './components/CallComponents/IncomingCallScreen/index'
import CallReqScreen from './components/CallComponents/CallReqScreen/index'
const webRTCServices = require("./lib/services.js");
import { createStackNavigator } from 'react-navigation';
import NavigationService from './components/NavigationService';

const MainStack=createStackNavigator(
    {
        Login:LoginScreen,
        Main:Home,
        IncCall:IncomingCallScreen,
        ReqCall: CallReqScreen
    },
    {
        initialRouteName:'Login',
    }
);

export default class MainApp extends Component {
    constructor(props) {
        super(props)

      this.showCallingPromt=this.showCallingPromt.bind(this);
    }

    showCallingPromt(data){
            NavigationService.navigate('IncCall',{incomingPhoneNumer:data.phoneNumber});
    }
    componentDidMount(){
        webRTCServices.waitforCall(this.showCallingPromt);
        
    }
    render() {
        return (<View style={styles.container}>
            <MainStack
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                  }}
            />
        </View>)
    }
}