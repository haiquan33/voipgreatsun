import React, { Component } from 'react';
import {
    FlatList,
    View,
    Platform,
    Image,
    TouchableOpacity,
    Keyboard,
    InteractionManager
} from 'react-native';
import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme
} from 'react-native-ui-kitten';
import _ from 'lodash';

import {scale} from '../../../utils/scale'
import styles from "./styles.js";

let moment = require('moment');


//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { store_User_contact_list } from '../../../lib/redux/basicAction'


class MessSendScreen extends Component {

    static navigationOptions = {


    };
    constructor(props) {
        super(props)

        this.state = { data: [],message:'' }
        this._pushMessage=this._pushMessage.bind(this);
        this._scroll=this._scroll.bind(this)
    }



    _keyExtractor(post, index) {
        return post.id;
    }

    _renderItem(info) {
        let inMessage = info.item.type === 'in';
        let backgroundColor = inMessage
            ? '#e9ebee'
            : '#75D1E8';
        let textColor = inMessage
                        ?"black"
                        :"white";
        let itemStyle = inMessage ? RKstyles.itemIn : RKstyles.itemOut;

        let renderDate = (time) => (
            <RkText style={RKstyles.time} rkType='secondary7 hintColor'>
                {moment().add(time, 'seconds').format('LT')}
            </RkText>);

        return (
            <View style={[RKstyles.item, itemStyle]}>
                {!inMessage && renderDate(info.item.time)}
                <View style={[RKstyles.balloon, { backgroundColor }]}>
                    <RkText rkType='primary2 mediumLine chat' style={{ paddingTop: 5,color:textColor}}>{info.item.text}</RkText>
                </View>
                {inMessage && renderDate(info.item.time)}
            </View>
        )
    }

    _scroll() {
        // if (Platform.OS === 'ios') {
        //     this.refs.list.scrollToEnd();
        // } else {
        //     _.delay(() => this.refs.list.scrollToEnd(), 100);
        // }
    }

    _pushMessage() {
        if (!this.state.message)
            return;

        this.state.data.push({ id: this.state.data.length, time: 0, type: 'out', text: this.state.message });
        this.setState({ message: '' });
        this._scroll(true);
    }


    componentDidMount() {
        this.setState({ data: this.props.navigation.getParam('messages', [])})



    }

    render() {
        return (<RkAvoidKeyboard style={RKstyles.container} onResponderRelease={(event) => {
            Keyboard.dismiss();
        }}>
            <FlatList ref='list'
                extraData={this.state}
                style={RKstyles.list}
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem} />
            <View style={RKstyles.footer}>
                <RkButton style={RKstyles.plus} rkType='clear'>
                    <RkText rkType='awesome secondaryColor'>Clear</RkText>
                </RkButton>

                <RkTextInput
                    onFocus={() => this._scroll(true)}
                    onBlur={() => this._scroll(true)}
                    onChangeText={(message) => this.setState({ message })}
                    value={this.state.message}
                    rkType='row sticker'
                    style={RKstyles.textinput}
                    placeholder="Nhập tin nhắn..." />

                <RkButton onPress={() => this._pushMessage()} style={RKstyles.send} rkType='circle highlight'>
                    <Image source={require('../../../assets/images/common/sendIcon.png')} />
                </RkButton>
            </View>
        </RkAvoidKeyboard>)
    }
}





let RKstyles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center'
    },
    textinput:{
        width:'70%',
        
    },
    avatar: {
        marginRight: 16,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.screen.base
    },
    list: {
        paddingHorizontal: 17
    },
    footer: {
        flexDirection: 'row',
        minHeight: 60,
        padding: 10,
        backgroundColor: theme.colors.screen.base
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row'
    },
    itemIn: {},
    itemOut: {
        alignSelf: 'flex-end'
    },
    balloon: {
        maxWidth: scale(250),
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15
    },
    plus: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 7
    },
    send: {
        width: 40,
        height: 40,
        marginLeft: 10,
    }
}));


const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MessSendScreen);