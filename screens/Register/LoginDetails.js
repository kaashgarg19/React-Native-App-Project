import React, { Component } from 'react'
import { Text, View, TouchableNativeFeedback, Platform, ActivityIndicator, Picker } from 'react-native'
import Touchable from 'react-native-platform-touchable'

import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import styles from './styles';
import Colors from '../../common/Colors';
import { bloodGroupsArray } from '../../common/Arrays';
import { generateToast } from '../../common/GenerateToast'

import app from '../../fire';
import "firebase/database"

export default class LoginDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            mobile: '',
            password: '',
            address: '',
            bloodGroup: '',
            dob: '',
            lastBloodDonated: '',
            loading: false,
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
        let { fullName, address, email, lastBloodDonated, mobile, bloodGroup, dob, password } = this.state;
        let validated = true;
        if (fullName === '') {
            validated = false;
            this.refs['fullName'].focus();
            let toastRes = generateToast('Full Name is required');
            if (toastRes) {
                this.props.showToastIOS('Full Name is required');
            }
        }
        else if (address === '') {
            validated = false;
            this.refs['address'].focus();
            let toastRes = generateToast('Address is required');
            if (toastRes) {
                this.props.showToastIOS('Address is required');
            }
        }
        else if (email === '') {
            validated = false;
            this.refs['email'].focus();
            let toastRes = generateToast('Email is required');
            if (toastRes) {
                this.props.showToastIOS('Email is required');
            }
        }
        else if (lastBloodDonated === '') {
            validated = false;
            this.refs['lastBloodDonated'].focus();
            let toastRes = generateToast('Last Blood Donated is required');
            if (toastRes) {
                this.props.showToastIOS('Last Blood Donated is required');
            }
        }
        else if (mobile.length < 10) {
            validated = false;
            this.refs['mobile'].focus();
            let toastRes = generateToast('Mobile number must contain 10 digits');
            if (toastRes) {
                this.props.showToastIOS('Mobile number must contain 10 digits');
            }
        }
        else if (bloodGroup === '') {
            validated = false;
            this.refs['bloodGroup'].focus();
            let toastRes = generateToast('Blood Group is required');
            if (toastRes) {
                this.props.showToastIOS('Blood Group is required');
            }
        }
        else if (dob === '') {
            validated = false;
            this.refs['dob'].focus();
            let toastRes = generateToast('Age is required');
            if (toastRes) {
                this.props.showToastIOS('Age is required');
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
            let validated = this.validate()
            if (validated) {
                this.toggleLoader();
                let { fullName, address, email, lastBloodDonated, mobile, bloodGroup, dob, password } = this.state;
                let userId;
                if (email.includes('@'))
                    userId = email.toLowerCase().split('@')[0]
                else
                    userId = email.toLowerCase()
                let { navigation } = this.props;
                let body = { fullName, address, email: email.toLowerCase(), lastBloodDonated, mobile, bloodGroup, dob, password }; //send to api 
                app.database().ref(`/users/${userId}`).set(body, (error) => {
                    this.toggleLoader()
                    if (error) {
                        let toastRes = generateToast('Something went wrong, Please try again later!!');
                        if (toastRes) {
                            this.props.showToastIOS('Something went wrong, Please try again later!!');
                        }
                    }
                    else {
                        navigation.navigate("Login");
                        let toastRes = generateToast('Registered Successfully!!');
                        if (toastRes) {
                            this.props.showToastIOS('Registered Successfully!!');
                        }
                    }
                })
            }
        }
    }
    render() {
        let { loading, mobile, password, fullName, email, address, bloodGroup, dob, lastBloodDontaed } = this.state;
        return (
            <View >
                <Text style={styles.enterDetailsText}>Enter Your details</Text>
                <TextInput
                    ref="fullName"
                    label="Full Name"
                    mode="outlined"
                    error={false}
                    value={fullName}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 10 }}
                    onChangeText={(text) => { this.handleChange(text, 'fullName') }}
                />
                <TextInput
                    ref="address"
                    label="Address"
                    mode="outlined"
                    numberOfLines={5}
                    multiline
                    error={false}
                    value={address}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 10 }}
                    onChangeText={(text) => { this.handleChange(text, 'address') }}
                />
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
                    ref="lastDontaed"
                    label="Last Blood Dontaed"
                    mode="outlined"
                    error={false}
                    value={lastBloodDontaed}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 10 }}
                    onChangeText={(text) => { this.handleChange(text, 'lastBloodDonated') }}
                />
                <TextInput
                    ref="mobile"
                    label="Mobile"
                    mode="outlined"
                    error={false}
                    value={mobile}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 10 }}
                    keyboardType="number-pad"
                    onChangeText={(text) => { this.handleChange(text, 'mobile') }}
                />
                <Text style={{ marginTop: 10, }}>Blood Group</Text>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={bloodGroup}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) =>
                        this.handleChange(itemValue, 'bloodGroup')
                    }
                >
                    <Picker.Item label={'Select an option'} disabled value={''} />
                    {
                        bloodGroupsArray.map((option, io) => {
                            return <Picker.Item label={option.toUpperCase()} value={option} key={io} />
                        })
                    }
                </Picker>
                <TextInput
                    ref="dob"
                    label="Age"
                    mode="outlined"
                    error={false}
                    value={dob}
                    selectionColor={Colors.defaultColor}
                    theme={{
                        colors: {
                            primary: Colors.darkColor,
                            placeholder: '#333',
                            background: '#fff'
                        }
                    }}
                    style={{ marginTop: 15 }}
                    keyboardType="number-pad"
                    onChangeText={(text) => { this.handleChange(text, 'dob') }}
                >
                </TextInput>
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