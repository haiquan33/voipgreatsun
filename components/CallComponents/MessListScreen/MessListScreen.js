import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions, AsyncStorage,FlatList,TouchableOpacity } from 'react-native';
import {
    RkStyleSheet,
    RkText,
    RkTextInput
} from 'react-native-ui-kitten';

import styles from "./styles.js";

import TempData from './TempData'


//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store_User_contact_list } from '../../../lib/redux/basicAction'


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
        console.log("chat mess",info)
        let name = 'Some thing';
        let last = info.item.messages[info.item.messages.length - 1];
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', {messages: info.item.messages})}>
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

    componentDidMount() {
        
        // firebaseService.database().ref('messengers/'+user_phone_no).on('value',function(snapshot){
        //     this.setState({data:snapshot.val()})
        // })
        this.setState({ data: TempData })


    }

    render() {
        return (<View style={styles.container}>
            <FlatList
                style={RKstyles.root}
                data={this.state.data}
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

    }, dispatch)
);

const mapStateToProps = state => ({
    user_phone_no:state.user_phone_no
});

export default connect(mapStateToProps, mapDispatchToProps)(MessListScreen);