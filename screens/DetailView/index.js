import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Subtitle, Content, Button, Icon, Card, CardItem, } from 'native-base';
import * as Font from 'expo-font';

export default class DetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details:{
                "address": "Dlf",
                "bloodGroup": "B+",
                "dob": "20",
                "email": "vchhabra33@gmail.com",
                "fullName": "Vikas Chhabra",
                "lastBloodDonated": "2 months ago",
                "mobile": "7888734434",
                "password": "testing",
            },
            fontLoaded: false,
        }
    }
    render() {
        if (this.state.fontLoaded === true)
            return (
                <Container>
                    <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={false} />
                    <Header style={{ backgroundColor: '#8E0E00' }} androidStatusBarColor="#8E0E00">
                        <Left >
                            <Button transparent>
                                <Icon name='arrow-back' onPress={(e)=>{this.props.navigation.goBack()}}/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.state.details.fullName}</Title>
                            <Subtitle>Details</Subtitle>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <Card>
                            <CardItem header bordered>
                                <Text>Name : </Text>
                                <Text>{this.state.details.fullName}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Blood Group : </Text>
                                <Text>{this.state.details.bloodGroup}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Last Dontaed : </Text>
                                <Text>{this.state.details.lastBloodDonated}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Contat no. : </Text>
                                <Text>{this.state.details.mobile}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Age : </Text>
                                <Text>{this.state.details.dob}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Text>Email : </Text>
                                <Text>{this.state.details.email}</Text>
                            </CardItem>
                            <CardItem header bordered>
                                <Body>
                                    <Text>Address : {this.state.details.address}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        else {
            return (
                <View></View>
            )
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto_medium': require('../../assets/Roboto-Medium.ttf'),
        });
        this.setState({ fontLoaded: true });
        // this.setState({
        //     details:this.props.route.params.item
        // })
    }
}