import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from "./style/mainapp.js";
import { Home } from './components/CallComponents/Home/Home'
import LoginScreen from './components/LoginComponents/LoginScreen'
import IncomingCallScreen from './components/CallComponents/IncomingCallScreen/index'
import CallReqScreen from './components/CallComponents/CallReqScreen/index'
import MessSendScreen from './components/CallComponents/MessSendScreen/MessSendScreen'

const webRTCServices = require("./lib/services.js");
import { createStackNavigator } from 'react-navigation';
import NavigationService from './components/NavigationService';




//redux 
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import basicReducer from './lib/redux/basicReducer'
import basicAction from './lib/redux/basicAction'

const store = createStore(basicReducer)
const iconLogOut = require('./assets/images/common/signout.png')


  

export default class MainApp extends Component {




    constructor(props) {
        super(props)

        this.showCallingPromt = this.showCallingPromt.bind(this);
    }

    showCallingPromt(data) {
        NavigationService.navigate('IncCall', { incomingPhoneNumer: data.phoneNumber });
    }
    componentDidMount() {
        webRTCServices.waitforCall(this.showCallingPromt);


    }


    LogOut() {
        webRTCServices.unregisterPhone();
        AsyncStorage.removeItem('userPhoneNumber', () => {
            NavigationService.navigate('Login')
        })


    }

    render() {
        const MainStack = createStackNavigator(
            {
                Login: {
                    screen: LoginScreen,

                },
                Main: {
                    screen: Home,
                    navigationOptions: {
                        headerLeft:null,
                        headerStyle: {
                            backgroundColor: '#D8DCDC',
                        },
                        headerTintColor: '#fff',
                        headerRight: (
                            <TouchableOpacity
                                onPress={this.LogOut}
                                style={styles.headerButton}
                            >
                                <Image style={styles.headerButton} source={iconLogOut}></Image>
                            </TouchableOpacity>
                        ),
                        
                    }
                },
                IncCall: IncomingCallScreen,
                ReqCall: CallReqScreen,
                Chat: MessSendScreen
            },
            {
                initialRouteName: 'Login',
                headerMode: 'screen'
            }
        );
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <MainStack
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                </View>
            </Provider>)
    }
}