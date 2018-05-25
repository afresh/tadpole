/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    // Platform,
    StyleSheet,
    BackHandler,
    StyleSheet,
    View
} from 'react-native';
//第三方插件
import { Router, Scene } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//自定义组件
import CustomTabBar from './components/customTabBar';

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

    render() {
        let tabNames = this.state.tabNames;
        return (
            <ScrollableTabView
                initialPage={2}
                renderTabBar={() =>
                    <CustomTabBar tabNames={tabNames}/>
                }
                tabBarPosition='bottom'
            >
                <DataScreen key='dataTab' tabLabel='data'/>

                <ParentScreen key='parentTab' tabLabel='parent'/>

                <WorkbenchScreen key='workbenchTab' tabLabel='workbench'/>

                <WorkScreen key='workTab' tabLabel='work'/>

                <MineScreen key='mineTab' tabLabel='mine'/>
            </ScrollableTabView>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <View style={[{flex: 1}]}>
                <Router sceneStyle={[styles.router]}>
                    <Scene
                        key="root"
                        navigationBarStyle={styles.root}
                        titleStyle={styles.title}
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
        justifyContent: 'column',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    root: {
        backgroundColor: '#2c2d31',
    },
    title: {
        color: '#ffffff',
    },
});
