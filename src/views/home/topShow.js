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
//第三方插件
import { Actions } from 'react-native-router-flux';
//自定义组件
import Common from '../../components/common'; //公共类
import Header from '../../components/header'; //头部导航

export default class TopShowScreen extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={[global.styles.screen]}>
                <Header title={"内容页"} doneText={"完成"} style={[styles.header]} />
                <Text style={[global.styles.text]}>
                    this is TopShowScreen.
                </Text>
            </View>
        )
    }
}
