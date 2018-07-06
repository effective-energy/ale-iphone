import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert, Clipboard, TextInput } from 'react-native';
import ls from 'react-native-local-storage';

import CheckBox from './layouts/CheckBox';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class RecoveryPhraseScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isShowMnemonicPhrase: false,
            isCheked: false,
            mnemonicPhrase: '',
            isShowMnemonicConfirm: false,
            recoveryPharse: ''
        };

	    this.generateMnemonicPhrase = this.generateMnemonicPhrase.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.confirmMnemonic = this.confirmMnemonic.bind(this);
        this.confirmCreateWallet = this.confirmCreateWallet.bind(this);
    }
    
    static navigationOptions = {
        title: "Recovery Phrase"
    };

    generateMnemonicPhrase() {
        if (!this.state.isCheked) {
            return false;
        }
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/seed', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                let mnemonic = responseJson.seed.join(' ');
                return this.setState({
                    isShowMnemonicPhrase: true,
                    mnemonicPhrase: mnemonic
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    toggleCheckBox() {
        this.setState({
            isCheked: !this.state.isCheked
        });
    }

    copyMnemonicToClipboard = async () => {
        await Clipboard.setString(this.state.mnemonicPhrase);
        return Alert.alert('Copied to clipboard');
    };

    confirmMnemonic() {
        this.setState({
            isShowMnemonicPhrase: false,
            isShowMnemonicConfirm: true
        })
    }

    confirmCreateWallet() {
        const { params } = this.props.navigation.state;
        let walletName = params.walletName;

        let seed = this.state.recoveryPharse.split(" ");
        if (seed.length !== 12) {
            return Alert.alert('Enter valid mnemonic phrase');
        }

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/new', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    name: walletName,
                    seed: seed
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return Alert.alert(responseJson.message)
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        if (this.state.isShowMnemonicPhrase) {
            return (
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='dark-content'
                    />
                    <View>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                            Please, make sure you have carefully writen down your recovery phrase somewhere safe. You will need this phrase later for next use and recover. Phrase is case sensitive.
                        </Text>
                        <View
                            style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5, marginTop: 20 }}
                        >
                            <Text
                                style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                            >
                                {this.state.mnemonicPhrase}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.copyMnemonicToClipboard}
                            style={{ backgroundColor: '#d1d8dd', padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 20, padding: 15 }}
                        >
                            <Text
                                style={{ color: '#000000', fontSize: 18 }}
                            >
                                Copy mnemonic
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.confirmMnemonic}
                            style={{ backgroundColor: '#FFBB00', padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 10, padding: 15 }}
                        >
                            <Text
                                style={{ color: '#000000', fontSize: 18 }}
                            >
                                Yes, I’ve written it down
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        if (this.state.isShowMnemonicConfirm) {
            return (
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='dark-content'
                    />
                    <View>
                        <Text>Type each word in the correct order to verify your recovery phrase</Text>

                         <TextInput
                            placeholder="Type your recovery phrase here"
                            placeholderTextColor="#000000"
                            style={{height: 40, width: wp(80), marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                            onChangeText={(recoveryPharse) => this.setState({recoveryPharse})}
                            value={this.state.recoveryPharse}
                        />

                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <CheckBox
                                isCheked={this.state.isCheked}
                                toggleCheckBox={this.toggleCheckBox}
                                value="I understand that my money are held securely on this device only, not on the company servers"
                            />
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <CheckBox
                                isCheked={this.state.isCheked}
                                toggleCheckBox={this.toggleCheckBox}
                                value="I understand that if this application is moved to another device or deleted, my money can be only recovered with the backup phrase which were written down in a secure place"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={this.confirmCreateWallet}
                            style={{ backgroundColor: '#FFBB00', padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 10, padding: 15 }}
                        >
                            <Text
                                style={{ color: '#000000', fontSize: 18 }}
                            >
                                Confirm
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            );
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View>
                    <Text style={styles.mnemonicGenerateDescription}>
                    	On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet’s funds and private key.
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                        <CheckBox
                            isCheked={this.state.isCheked}
                            toggleCheckBox={this.toggleCheckBox}
                            value="Make sure nobody looks into your screen unless you want them to have access to your funds."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.generateMnemonicPhrase}
                        style={styles.nextBtn}
                    >
                        <Text style={styles.nextBtnText}>Continue</Text>
                    </TouchableOpacity>
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
        width: wp(100),
        padding: 20
    },
    mnemonicGenerateDescription: {
        textAlign: 'center'
    },
    nextBtn: {
        backgroundColor: '#d1d8dd',
        padding: 5,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        padding: 15
    },
    nextBtnText: {
        color: '#000000',
        fontSize: 18
    }
});