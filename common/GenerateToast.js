import {
    ToastAndroid,
    Platform
} from 'react-native';

export const generateToast = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
        return false;
    } else if (Platform.OS === 'ios') {
        return true;
    }
}