import React, { Component } from 'react'
import { Text, View, Picker, Platform, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { bloodGroupsArray } from '../../common/Arrays'


import app from '../../fire';
import "firebase/database"

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            bloodGroup: '',
            list: {},
            allList: {},
            loading: false
        }
    }



    componentDidMount() {
        this.toggleLoader(true);
        let response = app.database().ref(`/users`).once('value');
        response.then((res) => {
            this.toggleLoader(false)
            if (Object.keys(res).length > 0) {
                this.setState({
                    list: res.val(),
                    allList: res.val(),
                })
            }
        })
            .catch(() => {

            })
    }

    toggleLoader = (active) => {
        this.setState({
            loading: active
        })
    }

    filterObject = () => {
        let { bloodGroup, allList } = this.state;
        let newList = {};
        if (bloodGroup === 'all') {
            this.setState({
                list: allList
            })
        }
        else {
            Object.keys(allList).filter((item) => {
                if (allList[item].bloodGroup == this.state.bloodGroup) {
                    newList[item] = allList[item]
                }
            })
            this.setState({
                list: newList
            })
        }
        
    }
    render() {
        let { bloodGroup, loading } = this.state;
        return (
            <View >
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={{ marginTop: 10, }}>Blood Group</Text>
                        <Picker
                            style={styles.pickerContainer}
                            selectedValue={bloodGroup}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ bloodGroup: itemValue }, () => {
                                    this.filterObject()
                                })
                            }
                        >
                            <Picker.Item label={'All'} disabled value={'all'} />
                            {
                                bloodGroupsArray.map((option, io) => {
                                    return <Picker.Item label={option.toUpperCase()} value={option} key={io} />
                                })
                            }
                        </Picker>
                    </View>
                    {
                        Object.keys(this.state.list).map((item, index) => {
                            return (
                                <ListItem
                                    key={index}
                                    title={this.state.list[item].fullName}
                                    leftIcon={{ name: 'person' }}
                                    bottomDivider
                                    chevron
                                    onPress={() => { this.props.navigation.navigate('Details', { item: this.state.list[item] }) }}
                                />
                            )
                        })
                    }
                    {
                        loading?(
                            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                                <Text>Loading, Please wait...</Text>
                            </View>
                        ):(null)
                    }
                </ScrollView>
            </View>
        )
    }
}


const styles = {
    pickerContainer: {
        padding: 20,
        flex: 1,
        ...Platform.select({
            ios: {
            },
            android: {
                backgroundColor: '#fff',
                borderRadius: 10,
                height: 50,
            },
        })
    },
    container: {
        padding: 20
    }
}