/**
 * Created by 媲美爱 on 2018-05-29.
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
//第三方插件
import { Actions } from 'react-native-router-flux';
//自定义组件
import Common from './common'; //公共类

export default class Header extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let statusBar = Platform.select({
            ios: Common.isIphoneX ? 44 : 20,
            android: 0,
        });

        return (
            <View style={[styles.header, {margin: 0, paddingTop: statusBar, height: statusBar + 44}]}>
                <TouchableOpacity onPress={Actions.pop} underlayColor="transparent" style={[styles.return]}>
                    <View style={[styles.returnBox]}>
                        <Image
                            source={require('../resources/images/return.png')}
                            style={[styles.headerReturnIcon]}
                        />
                        <Text style={[styles.headerReturnText]}>返回</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.title]}>
                    {this.props.title}
                </Text>
                <TouchableOpacity onPress={Actions.topShow} underlayColor="transparent" style={[styles.done]}>
                    <View style={[styles.doneBox]}>
                        <Text style={[styles.headerDoneText]}>{this.props.doneText}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffffff',
        width: Common.autoScaleSize(750),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: Common.autoScaleSize(1),
        borderBottomColor: '#cdcdcd',
    },
    title: {
        color: '#2c2c2c',
        height: Common.autoScaleSize(42),
        lineHeight: Common.autoScaleSize(42),
        fontSize: Common.autoFontSize(38),
    },
    return: {
        width: Common.autoScaleSize(200),
        height: Common.autoScaleSize(36),
        marginLeft: Common.autoScaleSize(24),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    done: {
        width: Common.autoScaleSize(200),
        height: Common.autoScaleSize(36),
        marginRight: Common.autoScaleSize(24),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    returnBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerReturnIcon: {
        width: Common.autoScaleSize(36),
        height: Common.autoScaleSize(36),
    },
    headerReturnText: {
        color: '#2c2c2c',
        height: Common.autoScaleSize(36),
        lineHeight: Common.autoScaleSize(36),
        fontSize: Common.autoFontSize(32),
    },
    doneBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerDoneIcon: {
        width: Common.autoScaleSize(36),
        height: Common.autoScaleSize(36),
    },
    headerDoneText: {
        color: '#2c2c2c',
        height: Common.autoScaleSize(36),
        lineHeight: Common.autoScaleSize(36),
        fontSize: Common.autoFontSize(32),
    },
});
