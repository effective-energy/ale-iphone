import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput } from 'react-native';
import Image from 'react-native-remote-svg';
import ls from 'react-native-local-storage';

import Config from '../config';

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
            backgroundColor: '#08142F',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffbb00',
    };

    async restoreWallet() {
        if (this.state.mnemonicPhrase === '') {
            return Alert.alert('Enter mnemonic phrase');
        }
        
        let mnemonicPhrase = this.state.mnemonicPhrase.split(' ');
        if (mnemonicPhrase.length !== 12) {
            return Alert.alert('Enter 12 words');
        }

        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        const params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({
                Seed: mnemonicPhrase
            }),
        };

        const response = await fetch(`${Config.SERVER_URL}/wallet/redemption-wallet`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        if (responseJson.message !== 'Wallet successfully restored!') {
            return Alert.alert('Wallet not found')
        } else {
            Alert.alert('Wallet successfully restored!');
            return this.props.navigation.navigate('Wallets');
        }
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='light-content' />
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder="Enter your mnemonic phrase"
                        placeholderTextColor="#455578"
                        style={styles.restore_input}
                        onChangeText={(mnemonicPhrase) => this.setState({mnemonicPhrase})}
                        value={this.state.mnemonicPhrase}
                        
                    />
                    <TouchableOpacity
                        onPress={this.restoreWallet}
                        style={styles.restore_button}
                    >
                        <Text
                            style={styles.restore_button_text}
                        >
                            Restore wallet
                        </Text>
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
        alignItems: 'center'
    },
    restore_input: {
        height: 40,
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        width: screenWidth,
        marginBottom: 20,
        borderRadius: 2,
        color: '#455578',
        fontSize: 18
    },
    restore_button: {
        backgroundColor: '#ffbb00',
        width: wp(80),
        padding: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    restore_button_text: {
        color: '#000000',
        fontSize: 18
    }
});