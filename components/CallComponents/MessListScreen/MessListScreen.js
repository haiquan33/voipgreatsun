import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import {
    RkStyleSheet,
    RkText,
    RkTextInput
} from 'react-native-ui-kitten';

import styles from "./styles.js";
import webRTCServices from '../../../lib/services'
import TempData from './TempData'


//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store_User_mess_list } from '../../../lib/redux/basicAction'


class MessListScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Tin nhắn',

        tabBarIcon: ({ tintColor }) => (
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../../../assets/images/call/action-attendant-transfer-icon.png')}
                    style={{ width: 20, height: 20, tintColor: tintColor }}
                />
                <Text style={{ color: '#fff', marginLeft: 10 }}>Tin nhắn</Text>
            </View>
        ),

    };
    constructor(props) {
        super(props)
        this.renderItem = this._renderItem.bind(this);
        this.state = { user_contact_list: [] }

        this.getComingMess = this.getComingMess.bind(this);

    }

    _keyExtractor(item, index) {
        return item.withUserid;
    }

    _renderSeparator() {
        return (
            <View style={RKstyles.separator} />
        )
    }


    _renderItem(info) {
        // console.log("chat mess", info)
        let name = 'Some thing';
        let last = info.item.messages[info.item.messages.length - 1];
        console.log("last message to ",info.item.withUserPhone,' ',info.item.messages)
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', { friend_phone_no: info.item.withUserPhone })}>
                <View style={RKstyles.container}>

                    <View style={RKstyles.content}>
                        <View style={RKstyles.contentHeader}>
                            <RkText rkType='header5'>{name}</RkText>
                            <RkText rkType='secondary4 hintColor'>

                            </RkText>
                        </View>
                        <RkText numberOfLines={2} rkType='primary3 mediumLine' style={{ paddingTop: 5 }}>{last.text}</RkText>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    getComingMess(data) {
        console.log("Get comming mess", data)
        var temp_user_mess_list = this.props.user_mess_list;
        //if this is received mess
        if ((data.fromNo)||(data.multiMessWaiting)) {
            //if this is mess from 1 number
            if (!data.multiMessWaiting) {
                if (temp_user_mess_list) {

                    console.log("storage mess");
                    let therewasMessfromthisNo = false;
                    temp_user_mess_list.map((item) => {
                        if (item.withUserPhone != data.fromNo) return item;
                        therewasMessfromthisNo = true;
                        data.MessList[0].messages.forEach((mess) => {
                            item.messages.push(mess)
                        })

                    })
                    if (!therewasMessfromthisNo) {
                        temp_user_mess_list.push({
                            withUserPhone: data.fromNo,
                            messages: data.MessList[0].messages
                        })
                    }

                }
                else {
                    console.log("non storage mess");
                    temp_user_mess_list = [];
                    if (data.MessList) {
                        temp_user_mess_list.push({
                            withUserPhone: data.fromNo,
                            messages: data.MessList[0].messages
                        })
                    }

                }
            }
            //if this is multi mess from server that sent while this user is offlne
            else {
                if (temp_user_mess_list) {
                    

                    data.MessList.map((MessItem)=>{
                        let therewasMessfromthisNo=false;
                        temp_user_mess_list.map((item) => {
                            if (item.withUserPhone != MessItem.withUserPhone) return item;
                            therewasMessfromthisNo = true;
                            MessItem.messages.forEach((mess) => {
                                item.messages.push(mess)
                            })
                        })
                        if (!therewasMessfromthisNo){
                            temp_user_mess_list.push({
                                withUserPhone:MessItem.withUserPhone,
                                messages:MessItem.messages
                            })
                        }
                    })
                 
                    
                }
                else{
                    temp_user_mess_list=[];
                    data.MessList.map((MessItem)=>{
                       
                            temp_user_mess_list.push({
                                withUserPhone:MessItem.withUserPhone,
                                messages:MessItem.messages
                            })
                        }
                    )
                }
            }
        }
        //if this is mess that sent from this user
        else if (data.toNo) {
            console.log("get sent mess")
            if (temp_user_mess_list) {

                console.log("storage mess");
                let therewasMessfromthisNo = false;
                temp_user_mess_list.map((item) => {
                    if (item.withUserPhone != data.toNo) return item;
                    therewasMessfromthisNo = true;

                    item.messages.push(data.MessSent.messages[0])


                })
                if (!therewasMessfromthisNo) {
                    temp_user_mess_list.push({ 
                        withUserPhone: data.toNo,
                        messages: data.MessSent.messages
                    })
                }

            }
            else {
                console.log("non storage mess");
                temp_user_mess_list = [];
                if (data.MessSent) {
                    temp_user_mess_list.push({
                        withUserPhone: data.toNo,
                        messages: data.MessSent.messages
                    })
                }

            }
        }

        this.setState(temp_user_mess_list);
        console.log(temp_user_mess_list);

        AsyncStorage.setItem('userMessList', JSON.stringify(temp_user_mess_list), () => {
            webRTCServices.MessSavedNotice();
            this.props.store_User_mess_list(temp_user_mess_list)

        })
    }


    componentDidMount() {

        // firebaseService.database().ref('messengers/'+user_phone_no).on('value',function(snapshot){
        //     this.setState({data:snapshot.val()})
        // })

        AsyncStorage.getItem('userMessList', (err, result) => {
            if (result != null) {
                this.props.store_User_mess_list(JSON.parse(result))
                console.log("saved mess list", result)
            }
        });
        webRTCServices.waitforMess(this.getComingMess);
    }

    render() {
        return (<View style={styles.container}>
            <FlatList
                style={RKstyles.root}
                data={this.props.user_mess_list}
                extraData={this.state}

                ItemSeparatorComponent={this._renderSeparator}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem} />

        </View>)
    }
}




let RKstyles = RkStyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.screen.base
    },
    searchContainer: {
        backgroundColor: theme.colors.screen.bold,
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: 60,
        alignItems: 'center'
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingBottom: 12,
        paddingTop: 7,
        flexDirection: 'row'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: theme.colors.border.base
    }
}));




const mapDispatchToProps = dispatch => (
    bindActionCreators({
        store_User_mess_list
    }, dispatch)
);

const mapStateToProps = state => ({
    user_mess_list: state.user_mess_list
});

export default connect(mapStateToProps, mapDispatchToProps)(MessListScreen);