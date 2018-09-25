import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, AsyncStorage, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { connect } from 'react-redux';
import { get_User_phone_no } from '../../lib/redux/basicAction'
import { bindActionCreators } from 'redux'

import styles from './styles';


const logo=require('../../assets/images/common/logoMain.png')

class LoginScreen extends Component {
    static navigationOptions = {
        header:null // !!! Hide Header
      }
    constructor(props) {
        super(props);
        this.state = {
            phonenumber: ""
        }
        this.handleEnterClick = this.handleEnterClick.bind(this);
    }

    handleEnterClick() {
        if (this.state.phonenumber == '') {
            alert("không được để trống!")

        }
        else {
            AsyncStorage.setItem('userPhoneNumber', this.state.phonenumber, () => {
                this.props.get_User_phone_no(this.state.phonenumber)
                this.props.navigation.navigate('Main', {
                    phoneNumber: this.state.phonenumber
                });
            })

        }

    }

    componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp()
            return true
        }.bind(this))

        AsyncStorage.getItem('userPhoneNumber', (err, result) => {
            if (result != null) {
                this.props.get_User_phone_no(result)
                this.props.navigation.navigate('Main', {
                    phoneNumber: result
                });
            }
        });
    }

    render() {
        return (
            <LinearGradient colors={['#051365', '#061988', '#4256D7']} style={styles.containerGradient}>
            <View>
                <Image source={logo} style={styles.logo}></Image>
                <TextInput
                    placeholder={"Nhập số điện thoại"} placeholderTextColor={"#fff"}
                    onChangeText={(phonenumber) => this.setState({ phonenumber })}
                    keyboardType='number-pad'
                    value={this.state.phonenumber} 
                    style={styles.input}
                    />
                <TouchableHighlight
                    onPress={this.handleEnterClick} style={styles.loginButton}>
                    <Text style={styles.loginText} >ĐĂNG NHẬP</Text>
                </TouchableHighlight>
            </View>
            </LinearGradient>
        )
    }
}

//const mapStateToProps=state=>({})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        get_User_phone_no,
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(LoginScreen)


//nho check phonenumber null hoac ko phai so