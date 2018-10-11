import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions } from 'react-native';
import {createTabNavigator} from 'react-navigation'
import ContactScreen from '../ContactScreen/ContactScreen'
import DialScreen from '../DialScreen/DialScreen'
import MessListScreen from '../MessListScreen/MessListScreen'
import styles from "./styles";
export const Home =createTabNavigator({
        Dial:{
            screen:DialScreen
        },
        Contact:{
            screen:ContactScreen
        },
        MessList:{
            screen:MessListScreen
        }
    },
    {
            tabBarPosition :'bottom',
            swipeEnabled:true,
            tabBarOptions: {
                showIcon: true,
                showLabel: false,
                iconStyle: {
                    width: 100,
                    height: 20
                },
                tabStyle: {
                    height: 50
                },
                style: {
                    backgroundColor: '#D8DCDC'
                },
                
            }

    }
)