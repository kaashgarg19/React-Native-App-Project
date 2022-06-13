//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView, TouchableNativeFeedback, TouchableOpacity, Animated, Alert, AsyncStorage, ToastAndroid, RefreshControl } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

import app from '../../fire';
import "firebase/database"

// create a component
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: true,
            HeaderHeight: HEIGHT / 4,
            bloodStatDetails: [],
            refreshing: false,
            loading: false
        }
        this._scrollY = new Animated.Value(0);
    }
    toggleLoader = (active) => {
        this.setState({ loading: active })
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchList()
        this.setState({ refreshing: false });
    }
    // get blood stat details 
    async componentDidMount() {
        this.setState({ fontLoaded: true });
        this.fetchList()
    }
    fetchList = () => {
        this.toggleLoader(true);
        let response = app.database().ref(`/users`).once('value');
        response.then((res) => {
            this.toggleLoader(false)
            let newRes = res.val();
            let bPositive = 0;
            let oPositive = 0;
            let bNegative = 0;
            let aPositive = 0;
            let aNegative = 0;
            let oNegative = 0;
            let abPositive = 0;
            let abNegative = 0;

            Object.keys(newRes).filter((key)=>{
                if(newRes[key].bloodGroup==='B+'){
                    bPositive += 1;
                }
                if(newRes[key].bloodGroup==='B-'){
                    bNegative += 1;
                }
                if(newRes[key].bloodGroup==='A+'){
                    aPositive += 1;
                }
                if(newRes[key].bloodGroup==='A-'){
                    aNegative += 1;
                }
                if(newRes[key].bloodGroup==='O+'){
                    oPositive += 1;
                }
                if(newRes[key].bloodGroup==='O-'){
                    oNegative += 1;
                }
                if(newRes[key].bloodGroup==='AB+'){
                    abPositive += 1;
                }
                if(newRes[key].bloodGroup==='AB-'){
                    abNegative += 1;
                }
            })

            this.setState({
                bloodStatDetails: {
                    totalDonors: Object.keys(newRes).length,
                    bPositive,
                    bNegative,
                    abPositive,
                    abNegative,
                    aPositive,
                    aNegative,
                    oPositive,
                    oNegative
                }
            })
        })
            .catch(() => {

            })
    }
    logOut = async (e) => {
        // Alert.alert(
        //     'Logout!!',
        //     'Are you sure to logout??',
        //     [
        //       {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        //       {text: 'OK', onPress: () => {
        //         AsyncStorage.removeItem('token');
        //         const resetAction = StackActions.reset({
        //             index: 0,
        //             actions: [NavigationActions.navigate({ routeName: 'Login' })],
        //         });
        //         this.props.navigation.dispatch(resetAction);
        //       }},
        //     ],
        //     { cancelable: false }
        //   )
    }
    handleBackButton() {
        ToastAndroid.show('Please Press Logout to move to login screen', ToastAndroid.SHORT);
        return true;
    }
    render() {
        const headerHeight = this._scrollY.interpolate({
            inputRange: [0, HEIGHT / 4 - HEIGHT / 5 * 0.3, HEIGHT / 4 - HEIGHT / 6 * 0.1],
            outputRange: [HEIGHT / 4, HEIGHT / 5, HEIGHT / 6],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#8E0E00" barStyle="light-content" />
                <Animated.View style={[styles.header, { height: headerHeight, backgroundColor: '#8E0E00' }]}  >
                    <View style={{ marginLeft: 16, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 20, paddingLeft: 12 }}>Blood Donate</Text>
                    </View>
                </Animated.View>
                <FontAwesome name="tint" size={100} color="#bb0a1e" style={[styles.logo,]}></FontAwesome>
                <View style={styles.mainContent}>
                    <ScrollView onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this._scrollY } } }]
                    )} scrollEventThrottle={1} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback onPress={(e) => { this.props.navigation.navigate('BloodBank') }}>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#00aba9', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <FontAwesome name="list-ol" size={HEIGHT / 12} color="#fff"></FontAwesome>
                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>
                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#b91d47', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>B+</Text>) : (null)}
                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>
                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.bPositive}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#ffc40d', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>O+</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.oPositive}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#2b5797', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>B-</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.bNegative}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#ee1111', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>O-</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.oNegative}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#1e7145', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>A+</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.aPositive}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#ff0097', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 12, color: '#fff' }}>A-</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.aNegative}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#2d89ef', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 15, color: '#fff' }}>AB+</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>

                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.abPositive}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={styles.content1}>
                            <TouchableNativeFeedback>
                                <View style={{ backgroundColor: '#fff', height: HEIGHT / 5.5, width: WIDTH / 1.1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ backgroundColor: 'transparent', height: HEIGHT / 5.05, width: WIDTH / 1.2, marginTop: -25, flexDirection: "column" }}>
                                        <View style={{ flex: 2, backgroundColor: "transparent", justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }}>
                                            <View style={{ backgroundColor: '#9f00a7', height: HEIGHT / 8.5, width: HEIGHT / 8.5, borderRadius: 5, elevation: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                {this.state.fontLoaded ? (<Text style={{ fontSize: HEIGHT / 15, color: '#fff' }}>AB-</Text>) : (null)}

                                            </View>
                                            <View style={{ height: HEIGHT / 8.5, width: HEIGHT / 5, backgroundColor: 'transparent', marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{ color: 'grey' }}>Donors</Text>
                                                {this.state.fontLoaded ? (<Text style={{ color: '#000', fontSize: 22, }} fontWeight={900}>{this.state.bloodStatDetails.abNegative}/{this.state.bloodStatDetails.totalDonors}</Text>) : (null)}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                            <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <FontAwesome name="clock-o" size={HEIGHT / 28} color="grey" style={{ padding: 5 }}></FontAwesome>
                                                {this.state.fontLoaded ? (<Text style={{ padding: 5, fontSize: 10 }}>Swipe Down to Update</Text>) : (null)}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.10)',
    },
    header: {
        flex: 1,
        position: 'absolute',
        width: WIDTH,
        // height: HEIGHT / 4,
        borderBottomRightRadius: HEIGHT / 6,
        borderBottomLeftRadius: HEIGHT / 6,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20
    },
    logo: {
        top: HEIGHT / 6,

    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        top: 140,
        marginBottom: 110,
        width: WIDTH,
        flexDirection: 'column',
    },
    content1: {
        alignItems: 'center',
        height: HEIGHT / 4.5,
        width: WIDTH,
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'center'
    }
});

//make this component available to the app
export default Main;
