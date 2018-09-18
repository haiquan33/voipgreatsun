import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Image, TextInput, Dimensions } from 'react-native';
import {createTabNavigator} from 'react-navigation'
import ContactScreen from '../ContactScreen/ContactScreen'
import DialScreen from '../DialScreen/DialScreen'
import styles from "./style.js";
export const Home =createTabNavigator({
        DialScreen:{
            screen:DialScreen
        },
        ContactScreen:{
            screen:ContactScreen
        }
    },
    {
            tabBarPosition :'bottom',
            swipeEnabled:true

    }
)