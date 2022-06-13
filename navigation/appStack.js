import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyTabs from './bottomTab';

import Register from '../screens/Register';
import Login from '../screens/Login';
import DetailView from '../screens/DetailView';

const Stack = createStackNavigator();

export default function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Details" component={DetailView} />
            <Stack.Screen name="Dashboard" component={MyTabs} />
        </Stack.Navigator>
    );
}