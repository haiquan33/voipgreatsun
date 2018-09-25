import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ListView, Image, TextInput, Dimensions, Button, Modal, AsyncStorage } from 'react-native';


const webRTCServices = require("../../../lib/services.js");
import Keypad from '../Keypad/index'
import KeypadInputText from '../KeypadInputText/index'
import styles, { inputStyle, textStyle, keyUnderlayColor } from "./style.js";

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store_User_contact_list } from '../../../lib/redux/basicAction'

class DialScreen extends Component {



    static navigationOptions = {
        tabBarLabel: 'Gọi',
        tabBarIcon: ({ tintColor }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image
                    source={require('../../../assets/images/call/action-park.png')}
                    style={{ width: 20, height: 20, tintColor: tintColor, }}
                />
                <Text style={{ color: '#fff', marginLeft: 10 }}> Gọi</Text>
            </View>
        ),

    };


    constructor(props) {
        super(props)

        const { height, width } = Dimensions.get('window')
        const ratio = height / width

        this.state = {
            value: '',
            addContactName: '',
            actionSize: false,
            heightRatio: ratio * ratio,
            showAddContactModal: false,
        }

        this._onClearPress = this.onClearPress.bind(this)
        this._onBackspacePress = this.onBackspacePress.bind(this)
        this._onKeyPress = this.onKeyPress.bind(this)
        this._onDefineKeySize = this.onDefineKeySize.bind(this)
        this._startCall = this.startCall.bind(this);
        this._showAddContact = this.showAddContact.bind(this);
        this.cancelAddContact = this.cancelAddContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.renderAddContactModal = this.renderAddContactModal.bind(this);

    }


    showAddContact() {
        this.setState({ showAddContactModal: true })
    }
    addContact() {
        let item = {
            familyName: this.state.addContactName,
            phoneNumbers: [{ number: this.state.value }]
        }
        let temp_contactlist = this.props.user_contact_list;
        if (temp_contactlist) {

            temp_contactlist.push(item);
            this.props.store_User_contact_list(temp_contactlist);
            AsyncStorage.setItem('userContactList', JSON.stringify(temp_contactlist), () => {

            })
        }
        this.setState({ showAddContactModal: false })



    }
    cancelAddContact() {
        this.setState({ showAddContactModal: false })
    }
    startCall() {
        webRTCServices.requestCall(this.state.value);
        this.props.navigation.navigate('ReqCall', { reqPhoneNumber: this.state.value })
    }
    onBackspacePress() {
        this.setState({
            value: this.state.value.substr(0, this.state.value.length - 1)
        })
    }

    onClearPress() {
        this.setState({
            value: ''
        })
    }
    onDefineKeySize({ width }) {
        this.setState({ actionSize: width })
    }
    onKeyPress(key) {
        this.setState({
            value: this.state.value + key
        })
    }
    componentDidMount() {

        webRTCServices.registerPhone(this.props.navigation.getParam('phoneNumber', 'NA'));
    }


    renderAddContactModal() {
        return (
            <View style={{ marginTop: 50 }}>
                <View style={styles.modalWrapper}>
                    <Image source={require('../../../assets/images/call/contact.png')} style={{ width: 160, height: 160, resizeMode: "contain" }} />
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={(addContactName) => this.setState({ addContactName })}
                        placeholder="Họ và Tên"
                        value={this.state.addContactName}

                    />
                    <TextInput
                        style={styles.modalInput}
                        onChangeText={(value) => this.setState({ value })}
                        value={this.state.value}
                        placeholder="Số điện thoại"
                        keyboardType='number-pad'
                    />
                    <View style={styles.modalActionWrapper}>
                        <TouchableHighlight

                            onPress={() => {
                                this.addContact();
                            }}>
                            <Image style={styles.modalButton} source={require('../../../assets/images/call/checked.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.modalButton}
                            onPress={() => {
                                this.cancelAddContact();
                            }}>
                            <Image style={styles.modalButton} source={require('../../../assets/images/call/multiply.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        iconCall = require('../../../assets/images/keypad/call-icon2.png')


        return (<View style={styles.container}>

            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showAddContactModal}
                onRequestClose={() => {

                }}>
                {this.renderAddContactModal()}
            </Modal>
            <KeypadInputText


                value={this.state.value}
                onBackspacePress={this._onBackspacePress}
                onClearPress={this._onClearPress}
                showAddContact={this._showAddContact}
            />
            <Keypad style={{ flex: 0.75, marginTop: 20 }} onKeyPress={this._onKeyPress}
                onDefineKeySize={this._onDefineKeySize} />
            <View style={styles.CallActioncontainer}>
                <TouchableOpacity onPress={this._startCall} style={styles.actionTouchable}  >
                    <Image  style={{width:50,height:50,resizeMode:'contain'}} source={iconCall} />
                </TouchableOpacity>
            </View>
        </View>)
    }
}



const mapDispatchToProps = dispatch => (
    bindActionCreators({
        store_User_contact_list
    }, dispatch)
);


const mapStateToProps = state => ({
    user_phone_no: state.user_phone_no,
    user_contact_list: state.user_contact_list
});

export default connect(mapStateToProps, mapDispatchToProps)(DialScreen)