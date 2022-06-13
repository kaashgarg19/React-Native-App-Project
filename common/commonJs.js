import {AsyncStorage} from 'react-native'

export const storeAsync = async (value, variable) => {
    try {
        await AsyncStorage.setItem(variable, value);
    } catch (error) {
        // console.log("Something went wrong while saivng, ", value, " in ", variable)
    }
}

export const retriveAsync = async (variable) => {
    try {
        const value = await AsyncStorage.getItem(variable);
        return value
    } catch (error) {
        // console.log("Something went wrong while fetching data for ", variable)
    }
};

export const logout = (navigation) => {
    storeAsync('', 'verified').then(() => {
        storeAsync('', 'token').then(() => {
            navigation.navigate('Auth')
        })
    })
}