import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions, AsyncStorage } from 'react-native';

import styles from "./style.js";

import Contacts from 'react-native-contacts'
import Contactlist from './Contactlist'

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store_User_contact_list } from '../../../lib/redux/basicAction'
import { PermissionsAndroid } from 'react-native';

class ContactScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Danh bạ',

        tabBarIcon: ({ tintColor }) => (
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../../../assets/images/call/action-attendant-transfer-icon.png')}
                    style={{ width: 20, height: 20, tintColor: tintColor }}
                />
                <Text style={{ color: '#fff', marginLeft: 10 }}>Danh bạ</Text>
            </View>
        ),

    };
    constructor(props) {
        super(props)
        this._handleSearchResults = this.handleSearchResults.bind(this)
        this.state={user_contact_list:[]}
    }


    //     async function requestCameraPermission() {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //             {
    //                 'title': 'Cool Photo App Camera Permission',
    //                 'message': 'Cool Photo App needs access to your camera ' +
    //                     'so you can take awesome pictures.'
    //             }
    //         )
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             console.log("You can use contact")
    //         } else {
    //             console.log("contact permission denied")
    //         }
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // }


    handleSearchResults(results) {
            console.log("result",results)
            this.setState({user_contact_list:results})
    }

    componentDidMount() {

        //   requestCameraPermission();


        console.log("current contact list", this.props.user_contact_list);
        if (this.props.user_contact_list == null) {
            console.log("get contact list");

            //try to get saved contact list on local
            AsyncStorage.getItem('userContactList', (err, result) => {
                if (result == null) {

                    //if the user has never saved the contact list, get the contact list and save it
                    Contacts.getAll((err, contacts) => {
                        if (err) console.log("err contact list", err);
                        else (console.log("contact", contacts.length))

                        this.setState({user_contact_list:contacts})
                        // contacts returned
                        this.props.store_User_contact_list(contacts);
                        //save the contact list on local
                        AsyncStorage.setItem('userContactList', JSON.stringify(contacts), () => {
                               
                        })
                    })
                }
                else {
                    this.setState({user_contact_list:JSON.parse(result)})
                    this.props.store_User_contact_list(JSON.parse(result));

                }
            });



        }
    }

    render() {
        return (<View style={styles.container}>
            <View>
                
            </View>
            <Contactlist contactlist={this.state.user_contact_list} />
        </View>)
    }
}


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        store_User_contact_list,
    }, dispatch)
);

const mapStateToProps = state => ({
    user_contact_list: state.user_contact_list
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);