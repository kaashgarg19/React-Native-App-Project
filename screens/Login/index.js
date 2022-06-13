import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView } from 'react-native';

//styles
import styles from './styles';

import Header from './Header'
import LoginDetails from './LoginDetails'

//common files
import Loader from '../../common/Loader';
import StatusBarView from '../../common/StatusBarView';
import Toast from 'react-native-easy-toast'

export default class Login extends Component {
    showToastIOS=(msg)=>{
        this.refs.toast.show(msg, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBarView backgroundColor="#fff" contentColor="dark-content" />
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
                    <Header navigation={this.props.navigation}/>
                    <View style={styles.welcomeBackContainer}>
                        <Text style={styles.avtajText}>Blood Group</Text>
                        <LoginDetails navigation={this.props.navigation} showToastIOS={this.showToastIOS}/>
                    </View>
                </KeyboardAvoidingView>
                <Loader loading={false} />
                <Toast
                    ref="toast"
                    position='bottom'
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                />
            </View>
        )
    }
}