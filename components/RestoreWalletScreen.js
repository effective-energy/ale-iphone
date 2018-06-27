import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput } from 'react-native';
import Image from 'react-native-remote-svg';
import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class RestoreWalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mnemonicPhrase: ''
        };

        this.restoreWallet = this.restoreWallet.bind(this);
    }

    static navigationOptions = {
        title: 'Restore wallet',
        headerTitleStyle: {
            color: '#ffbb00'
        },
        headerStyle: {
            backgroundColor: '#08142F'
        },
        headerTintColor: '#ffbb00',
    };

    restoreWallet() {
        if (this.state.mnemonicPhrase === '') {
            return Alert.alert('Enter mnemonic phrase');
        }
        
        let mnemonicPhrase = this.state.mnemonicPhrase.split(' ');
        if (mnemonicPhrase.length !== 12) {
            return Alert.alert('Enter 12 words');
        }
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/redemption-wallet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    Seed: mnemonicPhrase
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message !== 'Wallet successfully restored!') {
                    return Alert.alert(responseJson.message)
                } else {
                    Alert.alert('Wallet successfully restored!');
                    return this.props.navigation.navigate('Wallets', { animation: null });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#08142F', alignItems: 'center', justifyContent: 'space-between', paddingTop: 30, paddingBottom: 30 }}
            >
                <StatusBar barStyle='light-content' />
                <View>
                    <Text style={{ color: '#ffffff', marginBottom: 10 }}>Enter your mnemonic phrase</Text>
                    <TextInput
                        placeholder="Enter your mnemonic phrase"
                        placeholderTextColor="#ffffff"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#ffffff' }}
                        onChangeText={(mnemonicPhrase) => this.setState({mnemonicPhrase})}
                        value={this.state.mnemonicPhrase}
                    />
                    <TouchableOpacity
                        onPress={this.restoreWallet}
                        style={{ backgroundColor: '#ffbb00', width: wp(80), padding: 10, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Text
                            style={{ color: '#000000', fontSize: 18}}
                        >
                            Restore wallet
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({});