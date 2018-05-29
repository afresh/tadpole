/**
 * Created by 媲美爱 on 2018-05-29.
 */

import React, { Component } from 'react';
import {
    // Platform,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class TopShowScreen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={[global.styles.screen]}>
                <View style={[styles.header]}>
                    this is SignInOrUpScreen.
                </View>
            </View>
        )
    }
}