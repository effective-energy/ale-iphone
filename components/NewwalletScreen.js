import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput } from 'react-native';
import Image from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class NewWalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newWalletName: ''
        };

        this.restoreWallet = this.restoreWallet.bind(this);
        this.createNewWallet = this.createNewWallet.bind(this);
    }

    static navigationOptions = {
        title: 'Add new wallet',
        headerTitleStyle: {
            color: '#ffbb00'
        },
        headerStyle: {
            backgroundColor: '#08142F'
        },
        headerTintColor: '#ffbb00',
    };

    restoreWallet() {
        this.props.navigation.navigate('RestoreWallet', { animation: null });
    }

    createNewWallet() {
        if (this.state.newWalletName === '') {
            return Alert.alert('Enter wallet name');
        } else {
            return this.props.navigation.navigate('RecoveryPhrase', { animation: null, walletName: this.state.newWalletName });
        }
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#08142F', alignItems: 'center', justifyContent: 'space-between', paddingTop: 30, paddingBottom: 30 }}
            >
                <StatusBar barStyle='light-content' />
                <View>
                    <TextInput
                        placeholder="Wallet name"
                        placeholderTextColor="#ffffff"
                        style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 20, borderRadius: 2, padding: 6, color: '#ffffff', borderBottomColor: '#ffffff', borderBottomWidth: 1, fontSize: 18 }}
                        onChangeText={(newWalletName) => this.setState({newWalletName})}
                        value={this.state.newWalletName}
                    />
                    <TouchableOpacity
                        onPress={this.createNewWallet}
                        style={{backgroundColor: '#16203a', width: wp(80), borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}
                    >
                        <Image
                            style={{width: wp(7), height: wp(7), marginRight: 10}}
                            source={require('../assets/images/icons/icon_new-wallet.svg')}
                        />
                        <Text
                            style={{color: '#f0b721', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}
                        >
                            Create wallet
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={this.restoreWallet}
                        style={{ backgroundColor: '#ffbb00', width: wp(80), padding: 5, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('../assets/images/icons/icon_restore-wallet.svg')}
                            style={{width: 30, height: 30, marginRight: 10 }}
                        />
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