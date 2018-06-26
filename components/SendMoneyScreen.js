import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, StatusBar, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
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
        title: 'Send money',
        headerTitleStyle: {
            color: '#000000'
        },
        headerStyle: {
            backgroundColor: '#e7ebee'
        },
        headerTintColor: '#ffbb00',
    };

    componentDidMount() {
        this.setState({
            amount: '',
            destinationAddress: ''
        })
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
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="#000000"
                            style={{height: 40, width: screenWidth, marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                            keyboardType = 'numeric'
                        />
                        <TextInput
                            placeholder="Address destination"
                            placeholderTextColor="#000000"
                            style={{height: 40, width: screenWidth, marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                            onChangeText={(destinationAddress) => this.setState({destinationAddress})}
                            value={this.state.destinationAddress}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.sendMoney}
                        style={{ backgroundColor: '#cfd8de', width: screenWidth, padding: 5, padding: 10, borderRadius: 15 }}
                    >
                        <Text style={{ color: '#000000', textAlign: 'center', fontSize: 16 }}>Send</Text>
                    </TouchableOpacity>
            	</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e7ebee',
        alignItems: 'center',
        paddingTop: 50
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
      }
});