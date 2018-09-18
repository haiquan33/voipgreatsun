import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput } from 'react-native';


export default class LoginScreen extends Component {
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
            this.props.navigation.navigate('Main', {
                phoneNumber: this.state.phonenumber
            });
        }

    }
    render() {
        return (
            <View>
                <TextInput
                    placeholder={"Enter your name"} placeholderTextColor={"#888"}
                    onChangeText={(phonenumber) => this.setState({ phonenumber })}
                    keyboardType='number-pad'
                    value={this.state.phonenumber} />
                <TouchableHighlight
                    onPress={this.handleEnterClick.bind(this)}>
                    <Text >Enter</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


//nho check phonenumber null hoac ko phai so