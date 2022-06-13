import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native';
import Colors from '../../common/Colors';

const {
    width,
} = Dimensions.get('window');

var isSmall = width < 375 ? (true) : (false);

export default StyleSheet.create({
    container: {
        flex: 20,
    },
    headerContainer: {
        height: isSmall ? (60) : (70),
        paddingLeft: isSmall ? (20) : (30),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: isSmall ? (20) : (30),
        alignItems: 'center'
    },
    buttonContianer: {
        width: 45,
        height: '100%',
        justifyContent: 'center',
        borderRadius: 10,
    },
    icon: {
        fontSize: isSmall ? (25) : (30),
    },
    welcomeBackContainer: {
        padding: isSmall ? (20) : (30),
        paddingTop: isSmall ? (0) : (5),
        flex: 1,
        ...Platform.select({
            ios: {
                paddingBottom: 20
            },
            android: {
                paddingBottom: 0
            }
        })
    },
    text: {
        fontSize: isSmall ? (30) : (35),
        fontWeight: '600',
    },
    avtajText: {
        fontSize: isSmall ? (35) : (40),
        color: Colors.defaultColor,
        fontWeight: 'bold'
    },
    signInContianer: {
        height: 70,
        marginTop: isSmall ? (0) : (10),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    signInButton: {
        height: isSmall ? (50) : (70),
        width: isSmall ? (50) : (70),
        borderRadius: isSmall ? (25) : (35),
        backgroundColor: Colors.darkColor,
        justifyContent: 'center',
        alignItems: "center",

    },
    nextButton: {
        color: '#fff',
        fontSize: isSmall ? (35) : (40),
        transform: [{
            rotate: '180deg'
        }]
    },
    signintextContianer: {
        justifyContent: 'center'
    },
    signintext: {
        fontSize: 25,
        fontWeight: '500'
    },
    enterDetailsText: {
        color: '#888',
        marginTop: 25
    },
    imageContainer: {
        width: width / 1.7,
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        marginRight: isSmall ? (-20) : (-30),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    forgotPasswordContainer: {
        marginTop: 5
    },
    forgotPasswordText: {
        color: '#555'
    },
    signUpContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        padding: 3
    },
    signUpText: {
        fontSize: 13,
        color: '#555'
    },
    signUpIcon: {
        fontSize: 20,
        color: '#555'
    }
})