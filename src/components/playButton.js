/**
 * Created by 媲美爱 on 2018-05-29.
 */

import React, { Component } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
//自定义组件
import Common from "./common";
//页面
import PlayScreen from '../views/play'; //播放页

export default class PlayButton extends Component {
    constructor(props) {
        super(props);
        //使用Animated.Value设定初始化值（角度）
        this.state = {
            playImage: require('../resources/images/play.png'),
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
                playImage: require('../resources/images/pause.png'),
            });
            this.startPlay();
        } else {
            this.setState({
                playImage: require('../resources/images/play.png'),
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
            <View style={[styles.playBox]}>
                <View style={[styles.playBoxCircle]} />
                <View style={[styles.playBoxBackground]} />
                <TouchableOpacity onPress={() => this.play()} underlayColor="transparent" style={[styles.playInner]}>
                    <View style={[styles.playInnerBox]}>
                        <Animated.Image
                            source={require('../resources/images/src/miss.jpg')}
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
        );
    }
}

const styles = StyleSheet.create({
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
        width: Common.autoScaleSize(125),
        height: Common.autoScaleSize(72),
        position: 'absolute',
        bottom: 0,
        left: Common.autoScaleSize(1),
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
