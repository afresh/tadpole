/**
 * Created by 媲美爱 on 2018-05-29.
 */

/**
 * 调用说明：
 * <Loading ref={r=>{this.Loading = r}} hide = {true} /> //放在布局的最后即可
 * 在需要显示的地方调用this.Loading.show();
 * 在需要隐藏的地方调用this.Loading.close();
 */

import React, { Component } from 'react';
import {
    Platform,
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';

import PropTypes from 'prop-types';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: !this.props.hide,
        }
    }

    close() {
        if (Platform.OS === 'android') {
            setTimeout(()=>{
                this.setState({modalVisible: false});
            },1000)
        }else {
            this.setState({modalVisible: false});
        }
    }

    show() {
        this.setState({modalVisible: true});
    }

    render() {
        if (!this.state.modalVisible) {
            return null
        }
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 100, height: 100, alignItems: 'center'}}>
                        <ActivityIndicator
                            animating={true}
                            color='white'
                            style={{
                                marginTop: 20,
                                width: 60,
                                height: 60,
                            }}
                            size="large" />
                    </View>
                </View>
            </Modal>
        );
    }
}

Loading.propTypes = {
    hide: PropTypes.bool.isRequired,
};
