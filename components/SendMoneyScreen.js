import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, StatusBar, TextInput, Button, Alert } from 'react-native';
import ls from 'react-native-local-storage';

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
    
    static navigationOptions = {
        title: 'Send money'
    };

    sendMoney() {
        if (this.state.amount === '') {
            return Alert.alert('Enter amount');
        }

        if (isNaN(this.state.amount)) {
            return Alert.alert('Enter number amount');
        }

        if (this.state.receiverAddress === '') {
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
                    return this.props.navigation.navigate('SuccessPayment', { animation: null });
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
            	<StatusBar barStyle='dark-content' />
            	<View>
            		<View>
                        <Text>Amount</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#000000' }}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                        />
                        <Text>Address destination</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#000000' }}
                            onChangeText={(destinationAddress) => this.setState({destinationAddress})}
                            value={this.state.destinationAddress}
                        />
                    </View>
                    <View style={{ backgroundColor: '#d1d8dd', width: screenWidth, padding: 5, borderRadius: 5 }}>
                        <Button
                            title="Send money"
                            onPress={this.sendMoney}
                            color="#000000"
                        />
                    </View>
            	</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        paddingTop: 50
    }
});