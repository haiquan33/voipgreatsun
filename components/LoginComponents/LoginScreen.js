import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { get_User_phone_no } from '../../lib/redux/basicAction'
import { bindActionCreators } from 'redux'

class LoginScreen extends Component {
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
            <View>
                <TextInput
                    placeholder={"Enter your name"} placeholderTextColor={"#888"}
                    onChangeText={(phonenumber) => this.setState({ phonenumber })}
                    keyboardType='number-pad'
                    value={this.state.phonenumber} />
                <TouchableHighlight
                    onPress={this.handleEnterClick}>
                    <Text >Enter</Text>
                </TouchableHighlight>
            </View>
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