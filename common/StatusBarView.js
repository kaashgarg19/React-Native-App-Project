// Documentation
//     Two Props are are used in this component 
//         1. backgroundColor String any color name or code
//         2. contentColor String "light-content", "dark-content"

import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Platform } from 'react-native'
import Constants from 'expo-constants'

export default class StatusBarView extends Component {
    render() {
        let { backgroundColor, contentColor } = this.props;
        return (
            <View style={[styles.statusBar, { backgroundColor: backgroundColor }]} >
                <StatusBar barStyle={contentColor}  backgroundColor={backgroundColor} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        ...Platform.select({
            ios: {
                height: Constants.statusBarHeight,
            }
        })
    }
})
