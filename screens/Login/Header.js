import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, TouchableNativeFeedback } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Touchable from 'react-native-platform-touchable';

import styles from './styles';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Touchable style={styles.signUpContainer}
                    background={Platform.OS === 'ios' ? (null) : (TouchableNativeFeedback.Ripple('#fff', true))}
                    onPress={() => { this.props.navigation.navigate('Register') }}
                >
                    <>
                        <AntDesign name="adduser" style={styles.signUpIcon} />
                        <Text style={styles.signUpText}>Register</Text>
                    </>
                </Touchable>
            </View>
        )
    }
}
