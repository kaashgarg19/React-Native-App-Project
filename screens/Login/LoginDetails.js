import React, { Component } from 'react'
import { Text, View, TouchableNativeFeedback, Platform, ActivityIndicator } from 'react-native'
import Touchable from 'react-native-platform-touchable'

import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import styles from './styles';
import Colors from '../../common/Colors';
import { generateToast } from '../../common/GenerateToast'

import app from '../../fire';
import "firebase/database"

export default class LoginDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }
    handleChange = (value, to) => {
        this.setState({ [to]: value })
    }
    toggleLoader = () => {
        this.setState({
            loading: !this.state.loading
        })
    }
    validate = () => {
        let { email, password } = this.state;
        let validated = true;
        if (email === '') {
            validated = false;
            this.refs['email'].focus();
            let toastRes = generateToast('Email is required!!');
            if (toastRes) {
                this.props.showToastIOS('Email is required!!');
            }
        }
        else if (password === '') {
            validated = false;
            this.refs['password'].focus();
            let toastRes = generateToast('Password is required');
            if (toastRes) {
                this.props.showToastIOS('Password is required');
            }
        }
        return validated
    }
    loginApi = () => {
        let { loading } = this.state;
        if (!loading) {
            let validated = this.validate();
            if (validated) {
                this.toggleLoader();
                let { email, password } = this.state;
                let { navigation } = this.props;
                let userId;
                if (email.includes('@'))
                    userId = email.toLowerCase().split('@')[0]
                else
                    userId = email.toLowerCase()
                let response = app.database().ref(`/users/${userId}`).once('value')
                response.then((res) => {
                    if (res !== null) {
                        if (res.val().password === password) {
                            navigation.navigate("Dashboard");
                        }
                        else {
                            let toastRes = generateToast('Email/Password Doesnt Match!!');
                            if (toastRes) {
                                this.props.showToastIOS('Email/Password Doesnt Match!!');
                            }
                        }
                    }
                    else {
                        console.log("here")
                        let toastRes = generateToast('Email/Password Doesnt Match!!');
                        if (toastRes) {
                            this.props.showToastIOS('Email/Password Doesnt Match!!');
                        }
                    }
                })
                    .catch(() => {
                        let toastRes = generateToast('Something went wrong, Please try again later!!');
                        if (toastRes) {
                            this.props.showToastIOS('Something went wrong, Please try again later!!');
                        }
                    })
                    .finally(() => {
                        this.toggleLoader()
                    })
            }
        }
    }
    render() {
        let { loading, email, password } = this.state;
        return (
            <View >
                <Text style={styles.enterDetailsText}>Enter Your details</Text>
                <TextInput
                    ref="email"
                    label="Email"
                    mode="outlined"
                    error={false}
                    value={email}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 10 }}
                    onChangeText={(text) => { this.handleChange(text, 'email') }}
                />
                <TextInput
                    ref="password"
                    label="Password"
                    mode="outlined"
                    error={false}
                    value={password}
                    selectionColor={Colors.defaultColor}
                    secureTextEntry
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 15 }}
                    onChangeText={(text) => { this.handleChange(text, 'password') }}
                >

                </TextInput>
                <View
                    style={styles.forgotPasswordContainer}
                >
                    <Touchable onPress={() => { this.props.navigation.navigate('EnterNumber') }}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </Touchable>
                </View>
                <View style={styles.signInContianer}>
                    <Touchable
                        onPress={() => { this.loginApi() }}
                        style={styles.signInButton}
                        background={Platform.OS === 'ios' ? (null) : (TouchableNativeFeedback.Ripple('#fff', true))}
                    >
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fff" style={styles.nextButton} />
                            ) : (
                                    <Ionicons name="ios-arrow-round-back" style={styles.nextButton} />
                                )
                        }
                    </Touchable>
                </View>
            </View>
        )
    }
}