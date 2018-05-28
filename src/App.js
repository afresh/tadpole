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
    View,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
} from 'react-native';
//第三方插件
import { Router, Scene } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
//自定义组件
import Common from './components/common'; //公共类
import CustomTabBar from './components/customTabBar'; //自定义选项卡
//选项卡Tab页
import HomeTabScreen from './views/home'; //首页
import HeadsetTabScreen from './views/headset'; //试听
import BoughtTabScreen from './views/bought'; //已购
import MineTabScreen from './views/mine'; //我的
//页面
import PlayScreen from './views/play'; //播放页
import SignInOrUpScreen from './views/signIns/signInOrUp'; //免注册登录
import SignInScreen from './views/signIns/signIn'; //登录

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export class Tabs extends Component {
    constructor(props) {
        super(props);
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
                    <CustomTabBar
                        tabNames={tabNames} //tab名称
                        placeMiddle={true} //中间是否占位，即中间是否需要用特殊按钮样式等
                    />
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
    constructor(props) {
        super(props);
        //使用Animated.Value设定初始化值（角度）
        this.state = {
            playImage: require('./resources/images/play.png'),
            rotateValue: new Animated.Value(0), //旋转角度的初始值
        };
        this.isPlaying = false;
        this.playerAnimated = Animated.timing(this.state.rotateValue, {
            toValue: 1, //角度从0变1
            duration: 15000, //从0到1的时间
            easing: Easing.inOut(Easing.linear), //线性变化，匀速旋转
        });
    }

    play() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying === true) {
            this.setState({
                playImage: require('./resources/images/pause.png'),
            });
            this.startPlay();
        } else {
            this.setState({
                playImage: require('./resources/images/play.png'),
            });
            this.stopPlay();
        }
    }

    rotating() {
        if (this.isPlaying) {
            this.state.rotateValue.setValue(0);
            this.playerAnimated.start(() => {
                this.rotating()
            })
        }
    };

    startPlay() {
        this.playerAnimated.start(() => {
            this.playerAnimated = Animated.timing(this.state.rotateValue, {
                toValue: 1, //角度从0变1
                duration: 15000, //从0到1的时间
                easing: Easing.inOut(Easing.linear), //线性变化，匀速旋转
            });
            this.rotating();
        });
    }

    stopPlay() {
        this.state.rotateValue.stopAnimation((oneTimeRotate) => {
            //计算角度比例
            this.playerAnimated = Animated.timing(this.state.rotateValue, {
                toValue: 1,
                duration: (1-oneTimeRotate) * 15000,
                easing: Easing.inOut(Easing.linear),
            });
        });
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
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
                            title="首页"
                            initial={true}
                            hideNavBar={true} //此处以及其他页都隐藏了导航，我打算自定义组件作为头部导航栏。
                        />
                        {/*播放*/}
                        <Scene key="play" component={PlayScreen} title="正在播放" hideNavBar={true} />
                        {/*登录*/}
                        <Scene key="signInOrUp" component={SignInOrUpScreen} title="免注册登录" hideNavBar={true} />
                        <Scene key="signIn" component={SignInScreen} title="登录" hideNavBar={true} />
                    </Scene>
                </Router>
                <View style={[styles.playBox]}>
                    <View style={[styles.playBoxCircle]} />
                    <View style={[styles.playBoxBackground]} />
                    <TouchableOpacity onPress={() => this.play()} underlayColor="transparent" style={[styles.playInner]}>
                        <View style={[styles.playInnerBox]}>
                            <Animated.Image
                                source={require('./resources/images/src/miss.jpg')}
                                style={[styles.playBackImage, {
                                    transform: [
                                        //使用interpolate插值函数,实现了从数值单位的映射转换，上面角度从0到1，这里把它变成0-360的变化
                                        {rotateZ: this.state.rotateValue.interpolate({
                                                inputRange: [0,1],
                                                outputRange: ['0deg', '360deg'],
                                            })},
                                    ]
                                }]}
                            />
                            <Image
                                source={this.state.playImage}
                                style={[{width: Common.autoScaleSize(32), height: Common.autoScaleSize(32)}]}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    router: {
        backgroundColor: '#e6e6e6',
    },
    root: {
        backgroundColor: '#e6e6e6',
    },
    title: {
        color: '#ffffff',
    },
    playBox: {
        width: Common.autoScaleSize(128),
        height: Common.autoScaleSize(136),
        position: 'absolute',
        bottom: 0,
        left: Common.autoScaleSize(311),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    playBoxCircle: {
        backgroundColor: '#ffffff',
        width: Common.autoScaleSize(128),
        height: Common.autoScaleSize(128),
        borderRadius: Common.autoScaleSize(128),
        position: 'absolute',
        bottom: Common.autoScaleSize(8),
        borderWidth: Common.autoScaleSize(1),
        borderColor: '#cdcdcd',
    },
    playBoxBackground: {
        backgroundColor: '#ffffff',
        width: Common.autoScaleSize(128),
        height: Common.autoScaleSize(101),
        position: 'absolute',
        bottom: 0,
    },
    playInner: {
        width: Common.autoScaleSize(101),
        height: Common.autoScaleSize(101),
        borderRadius: Common.autoScaleSize(101),
        position: 'absolute',
        bottom: Common.autoScaleSize(20),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playInnerBox: {
        backgroundColor: '#cdcdcd',
        width: Common.autoScaleSize(101),
        height: Common.autoScaleSize(101),
        borderRadius: Common.autoScaleSize(101),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playBackImage: {
        width: Common.autoScaleSize(101),
        height: Common.autoScaleSize(101),
        borderRadius: Common.autoScaleSize(101),
        position: 'absolute',
    },
});

global.styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
    },
    container: {
        backgroundColor: '#e6e6e6',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
