import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    toastContainer: {
        width: width,
        position: 'absolute',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 20,
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    textContent: {
        color: '#fff',
        fontSize: 17
    }
})