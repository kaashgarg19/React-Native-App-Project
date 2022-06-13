import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Constants from 'expo-constants';
import Colors from './Colors';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default class Loader extends Component {
    render() {
        let { loading, title } = this.props;
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating size={43} color={Colors.defaultColor} />
                    <Text style={styles.loadingText}> {title}</Text>
                </View>
            )
        }
        else {
            return (
                null
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    loadingText: {
        color: '#fff',
        fontSize: 19,
        marginTop: 10,
        textAlign: 'center'

    },
    activityStyle: {
        color: '#fff'
    }
})