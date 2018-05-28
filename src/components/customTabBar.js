/**
 * Created by 媲美爱 on 2018-05-25.
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
//第三方插件
import PropTypes from 'prop-types';
//自定义组件
import Common from './common'; //公共类

const tabIcons = [
    require('../resources/images/tabs/home_v.png'),
    require('../resources/images/tabs/home_x.png'),
    require('../resources/images/tabs/headset_v.png'),
    require('../resources/images/tabs/headset_x.png'),
    require('../resources/images/tabs/bought_v.png'),
    require('../resources/images/tabs/bought_x.png'),
    require('../resources/images/tabs/mine_v.png'),
    require('../resources/images/tabs/mine_x.png')
];

export default class CustomTabBar extends Component {
    constructor(props) {
        super(props);
    }

    static setAnimationValue({value}) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(CustomTabBar.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab === i ? "#1296db" : "#707070"; // 判断i是否是当前选中的tab，设置不同的颜色
        let tabName = this.props.tabNames[i];
        return (
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={[styles.tab]} key={'tab' + i}>
                <View style={[styles.tabBox]}>
                    <Image
                        source={tabIcons[this.props.activeTab === i ? i*2 : i*2+1]}
                        style={[styles.tabBoxIcon]}
                    />
                    <Text style={[styles.tabBoxName, {color: color}]}>
                        {tabName}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderTabs() {
        if (true !== this.props.placeMiddle || 0 !== this.props.tabs.length%2) {
            return this.props.tabs.map((tab, i) => this.renderTabOption(tab, i));
        } else  {
            let tabs = [];
            for (let i = 0; i < this.props.tabs.length; i++) {
                let tab = this.props.tabs[i];
                if (i === parseInt(this.props.tabs.length/2)) {
                    let middle = (
                        <View key={'tabMiddle'} style={[styles.tab]}>
                            <View style={[styles.tabMiddleBox]}/>
                        </View>
                    );
                    tabs.push(middle);
                }
                tabs.push(this.renderTabOption(tab, i));
            }
            return tabs;
        }
    }

    render() {
        let tabBarHeight = Platform.select({
            ios: Common.isIphoneX ? 68 : 49,
            android: 49,
        });
        return (
            <View key={'custom'} style={[styles.tabs, {height: tabBarHeight}]}>
                <StatusBar
                    backgroundColor="#ffffff"
                    barStyle="dark-content"
                />
                {this.renderTabs()}
            </View>
        );
    }
}

CustomTabBar.propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
    tabIconNames: PropTypes.array, // 保存Tab图标
};

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        backgroundColor:'#ffffff',
        borderTopWidth: 0.5,
        borderTopColor: '#cdcdcd',
    },
    tab: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
    },
    tabMiddleBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
    },
    tabBoxIcon: {
        width: 22,
        height: 22,
    },
    tabBoxName: {
        fontSize: 10,
        marginTop: 3,
    },
});
