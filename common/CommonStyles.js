import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    dFlex: {
        flex: 1
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    justifyContentEnd: {
        justifyContent: 'flex-end'
    },
    justifyContentStart: {
        justifyContent: 'flex-start'
    },
    justifyContentBetween: {
        justifyContent: 'space-between'
    },
    justifyContentAround: {
        justifyContent: 'space-around'
    },
    alignItemsStart: {
        alignItems: 'flex-start'
    },
    alignItemsEnd: {
        alignItems: 'flex-end'
    },
    alignSelfEnd: {
        alignSelf: 'flex-end'
    },
    alignSelfStart: {
        alignSelf: 'flex-start',
    },

})

_spacingMap = (space, direct, amount) => {
    return {
        [`${space}${direct}${amount}`]: {
            [`${space}${direct}`]: amount
        }
    };
}

const spacing = ['margin', 'padding'];
const direction = ['Top', 'Bottom', 'Left', 'Right'];
const amounts = [ -100, -75, -50, -40, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100 ];

const dynamicStyle = {};
spacing.forEach(space => {
    direction.forEach(direction => {
        amounts.forEach(amount => {
            Object.assign(dynamicStyle, _spacingMap(space, direction, amount));
        });
    })
});

export const Spacing = StyleSheet.create(dynamicStyle);


_fontMap=(space, size)=>{
    return {
        [`${space}${size}`]:{
            [`${space}`]:size
        }
    }
}

const spaces = ['fontSize', 'margin', 'padding'];
const sizes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

const dynamicSizes = {};
spaces.forEach(space=>{
    sizes.forEach(size=>{
        Object.assign(dynamicSizes, _fontMap(space, size))
    })
})

export const Sizes = StyleSheet.create(dynamicSizes);