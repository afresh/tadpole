'use strict';

import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
} from 'react-native';

import ScreenUtil from "./screenUtil";
import PropTypes from 'prop-types';

const tabIcons = [
    require('../resources/images/tabicons/data_v.png'),
    require('../resources/images/tabicons/data_x.png'),
    require('../resources/images/tabicons/parent_v.png'),
    require('../resources/images/tabicons/parent_x.png'),
    require('../resources/images/tabicons/workbench_v.png'),
    require('../resources/images/tabicons/workbench_x.png'),
    require('../resources/images/tabicons/work_v.png'),
    require('../resources/images/tabicons/work_x.png'),
    require('../resources/images/tabicons/mine_v.png'),
    require('../resources/images/tabicons/mine_x.png')
];

export default class TabBar extends Component {

    constructor(props) {
        super(props);
    }

    static setAnimationValue({value}) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(TabBar.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab === i ? "#f66262" : "#777779"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={'tab' + i}>
                <View style={styles.tabItem}>
                    <Image
                        source={tabIcons[this.props.activeTab === i ? i*2 : i*2+1]}
                        style={{width: i === 2 ? 38 : 22, height: i === 2 ? 38 : 22, marginTop: i === 2 ? 0 : 1}}
                    />
                    <Text style={{display: i === 2 ? 'none' : 'flex', color: color, fontSize: 10, marginTop: 3}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let tabBar = Platform.select({
            ios: ScreenUtil.isIphoneX ? 68 : 49,
            android: 49,
        });
        return (
            <View key={'custom'} style={[styles.tabs, {height: tabBar}]}>
                <StatusBar
                    backgroundColor="#101013"
                    barStyle="light-content"
                />
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

TabBar.propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
    tabNames: PropTypes.array, // 保存Tab名称
    tabIconNames: PropTypes.array, // 保存Tab图标
};

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        backgroundColor:'#f9f9f8',
        borderTopWidth: 0.5,
        borderTopColor: '#b3b3b3',
    },
    tab: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 7,
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 38,
        height: 39,
    },
});
