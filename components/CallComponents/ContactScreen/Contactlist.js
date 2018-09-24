import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from "react-native";
import NavigationService from '../../NavigationService';
import Accordion from '@ercpereda/react-native-accordion';
const webRTCServices = require("../../../lib/services.js");





const iconCall = require('../../../assets/images/keypad/call-icon.png')

export default class Contactlist extends Component {


    constructor(props) {
        super(props);
        this.state = { contact_list: null }
        this.Process_contact_data = this.Process_contact_data.bind(this)
        this._startCall=this.startCall.bind(this);
    }

    startCall(phoneNumber){
        webRTCServices.requestCall(phoneNumber);
        NavigationService.navigate('ReqCall',{reqPhoneNumber:phoneNumber})

    }
    Process_contact_data() {


    }

    componentWillReceiveProps(nextProps) {
        if (this.state.contact_list == null) {
            
            if (nextProps.contactlist) {

                let temp_list = nextProps.contactlist.map(contact => {
                    var item = contact;
                    item.key = contact.rawContactId;
                    return item;
                })

              
                this.setState({ contact_list: temp_list });
            }
        }
    }


    renderItem(item) {
        let temp_fname = item.familyName ? item.familyName : '';
        let temp_mname = item.middleName ? item.middleName : '';
        let temp_gname = item.givenName ? item.givenName : '';
        let Name = temp_gname.trim() + ' ' + temp_fname.trim() + ' ' + temp_mname.trim();
        let phoneNumber = null;
        if (item.phoneNumbers != null) {
            if (item.phoneNumbers[0] != null) {
                phoneNumber = item.phoneNumbers[0].number;
            }
        }

        Header = ({ isOpen }) =>
            <View style={{
                paddingTop: 5,
                paddingRight: 15,
                paddingLeft: 15,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#a9a9a9',
                backgroundColor: '#f9f9f9',
            }}>
                <Text style={styles.contactName}>{Name} </Text>
                <Text>{phoneNumber} </Text>
            </View>;
        
        Content = phoneNumber? (
            <View style={{
                display: 'flex',
                backgroundColor: '#31363D'
            }}>
                <TouchableOpacity onPress={()=>this._startCall(phoneNumber)}   >
                    <Image source={iconCall} />
                </TouchableOpacity>
            </View>)
            :
            <Text>Không gọi được</Text>
            
            ;


        return (
            <View>
                <Accordion
                    header={Header}
                    content={Content}
                    animationDuration={200}
                    easing="easeInSine"
                />
            </View>
        )


    }


    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.contact_list}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </View>
        );
    }





    //   _renderHeader = () => {
    //     return (
    //       <TextInput
    //         style={styles.search}
    //         placeholder="Please type first letter to search"
    //         onSubmitEditing={this._search}
    //         returnKeyType="done"
    //       />
    //     );
    //   };

    //   _renderFooter = () => {
    //     return <Text style={{ marginVertical: 20, alignSelf:"center" }}>This is the footer</Text>;
    //   };

    //   _renderSection = (section: number) => {
    //     const contact = this.props.contact_list_data[section];
    //     return (
    //       <TouchableOpacity style={styles.section}>
    //         <Text style={styles.sectionText}>
    //           {contact.header}
    //         </Text>
    //       </TouchableOpacity>
    //     );
    //   };

    //   _renderItem = ({ section: section, row: row }) => {
    //     const contact = this.props.contact_list_data[section].items[row];
    //     return (
    //       <TouchableOpacity style={styles.row}>

    //         <View style={styles.rContainer}>
    //           <Text style={styles.title}>
    //             {contact.familyName}
    //           </Text>
    //           <Text style={styles.subtitle}>
    //             {contact.phoneNumbers[0]?
    //                     contact.phoneNumbers[0].phoneNumbers  :
    //                     'unknown'
    //             }
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   };

    //   _search = ({ nativeEvent: { text: text } }) => {
    //     const notFound = contacts.every(contract => {
    //       if (contract.header === text) {
    //         this.setState({ data: [contract] });
    //         return false;
    //       }
    //       return true;
    //     });
    //     if (notFound) {
    //       this.setState({ data: [] });
    //     }
    //   };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    contactName: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})