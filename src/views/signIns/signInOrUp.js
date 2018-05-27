/**
 * Created by 媲美爱 on 2018-05-26.
 */

import React, { Component } from 'react';
import {
    // Platform,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class SignInOrUpScreen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={[global.styles.screen]}>
                <Text style={[global.styles.text]}>
                    this is SignInOrUpScreen.
                </Text>
            </View>
        )
    }
}