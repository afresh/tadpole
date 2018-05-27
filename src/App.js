/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @媲美爱
 */

import React, { Component } from 'react';
import {
    // Platform,
    StyleSheet,
    BackHandler,
    View
} from 'react-native';
//第三方插件
import { Router, Scene } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//自定义组件
import CustomTabBar from './components/customTabBar'; //自定义选项卡
//选项卡Tab页
import HomeTabScreen from './views/home'; //首页
import HeadsetTabScreen from './views/headset'; //试听
import BoughtTabScreen from './views/bought'; //已购
import MineTabScreen from './views/mine'; //我的
//页面
import SignInOrUpScreen from './views/signIns/signInOrUp'; //免注册登录
import SignInScreen from './views/signIns/signIn'; //登录

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['数据', '家长', '工作台', '工作', '我的'],
        };
    }

    componentWillMount() {
        // Disable back button by just returning true instead of Action.pop()
        BackHandler.addEventListener('hardwareBackPress', () => {return true});
    }

    render() {
        let tabNames = ['首页', '试听', '已购', '我的'];
        return (
            <ScrollableTabView
                initialPage={0} //初始tab索引
                renderTabBar={() =>
                    <CustomTabBar tabNames={this.state.tabNames} placeMiddle={true} />
                }
                tabBarPosition='bottom'
            >
                <HomeTabScreen key='homeTab' tabLabel='home' />

                <HeadsetTabScreen key='headsetTab' tabLabel='headset' />

                <BoughtTabScreen key='boughtTab' tabLabel='bought' />

                <MineTabScreen key='mineTab' tabLabel='mine' />
            </ScrollableTabView>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <View style={[{flex: 1, backgroundColor: 'red'}]}>
                <Router sceneStyle={[styles.router]}>
                    <Scene
                        key="root"
                        navigationBarStyle={[styles.root]}
                        titleStyle={[styles.title]}
                        headerMode="screen"
                    >
                        {/*首页(tab)*/}
                        <Scene
                            key="tabs"
                            component={Tabs}
                            initial={true}
                            hideNavBar={true} //此处以及其他页都隐藏了导航，我打算自定义组件作为头部导航栏。
                        />
                        {/*登录*/}
                        <Scene key="signInOrUp" component={SignInOrUpScreen} title="免注册登录" hideNavBar={true} />
                        <Scene key="signIn" component={SignInScreen} title="登录" hideNavBar={true} />
                    </Scene>
                </Router>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    router: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#e6e6e6',
        backgroundColor: '#27ab43',
    },
    root: {
        backgroundColor: '#ffffff',
    },
    title: {
        color: '#ffffff',
    },
});

global.styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c3c345',
    },
    container: {
        backgroundColor: '#b24563',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
