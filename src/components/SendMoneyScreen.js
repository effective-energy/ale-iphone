import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, StatusBar, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class SendMoneyScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            amount: '',
            destinationAddress: '',
            senderAddress: this.props.navigation.state.params.walletAddress
        };

        this.sendMoney = this.sendMoney.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Send money',
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
            headerRight: <TouchableOpacity
                            onPress={() => navigation.navigate('Camera')}
                        >
                            <SVGImage
                                source={require('../assets/images/icons/qr-code.svg')}
                                style={{width: 20, height: 20, marginRight: 20}}
                            />
                        </TouchableOpacity>
        };
    };

    componentDidMount() {
        this.setState({
            amount: '',
            destinationAddress: ''
        });

        const { params } = this.props.navigation.state;

        if (params.destinationAddress !== undefined) {
            this.setState({
                destinationAddress: params.destinationAddress
            })
        }
    }

    sendMoney() {
        if (this.state.amount === '') {
            return Alert.alert('Enter amount');
        }

        if (isNaN(this.state.amount)) {
            return Alert.alert('Enter number amount');
        }

        if (this.state.destinationAddress === '') {
            return Alert.alert('Enter destination address')
        }

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/transactions/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    count: Number(this.state.amount),
                    walletAddress: this.state.senderAddress,
                    walletDestination: this.state.destinationAddress
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'Success send') {
                    return this.props.navigation.navigate('SuccessPayment');
                } else {
                    return Alert.alert(responseJson.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='light-content' />
            	<View>
            		<View>
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                            keyboardType = 'numeric'
                        />
                        <TextInput
                            placeholder="Address destination"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(destinationAddress) => this.setState({destinationAddress})}
                            value={this.state.destinationAddress}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.sendMoney}
                        style={{ backgroundColor: '#16203a', width: screenWidth, padding: 10, borderRadius: 10 }}
                    >
                        <Text style={{ color: '#f0b721', textAlign: 'center', fontSize: wp(5), fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>
            	</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#08142F',
        alignItems: 'center',
        paddingTop: 50
    },
    text_input: {
        height: 40,
        width: screenWidth,
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
    }
});