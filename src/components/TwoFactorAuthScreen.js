import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert, AlertIOS, TextInput, Clipboard } from 'react-native';

import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

import Pageloader from './layouts/Pageloader';

import QRCode from 'react-native-qrcode-svg';

export default class TwoFactorAuthScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isLoaderPage: false,
            secretWord: '',
            qrCode: '""',
            isDisableTwoAuth: false,
            disabledSecretKey: '',
            disabledTwoAuthKey: ''
        };

        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.confirmTwoFactor = this.confirmTwoFactor.bind(this);
        this.disableTwoAuth = this.disableTwoAuth.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        let title = params.type === 'enable' ? 'Enable two auth': 'Disable two auth';
        return {
            title: title
        };
    };

    componentDidMount() {
        this.setState({
            isLoaderPage: false,
            isDisableTwoAuth: false,
            secretWord: '',
            qrCode: '""',
            disabledSecretKey: '',
            disabledTwoAuthKey: ''
        });

        const { params } = this.props.navigation.state;
        if (params.type === 'enable') {
            return this.gererateTwoAuthCode();
        } else {
            this.setState({
                isDisableTwoAuth: true
            });
        }
    }

    confirmTwoFactor() {
        AlertIOS.prompt(
            'Confirm enable two factor',
            'Enter secret code from google auth',
            [{
                text: 'Cancel',
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: (code) => this.confirmCode(code),
            }],
            'plain-text'
        );
    }

    confirmCode(code) {
        if (code.length !== 6 || isNaN(code)) {
            return Alert.alert('Код должен быть из 6 цифр');
        }
        this.setState({
            isLoaderPage: true
        });

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/enable-two-auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    secret: this.state.secretWord,
                    token: code
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'Failed to verify') {
                    this.setState({
                        isLoaderPage: false
                    });
                    return Alert.alert(responseJson.message);
                } else {
                    Alert.alert('Success!');
                    this.setState({
                        isLoaderPage: false
                    });
                    return this.props.navigation.push('Settings');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    gererateTwoAuthCode() {
        this.setState({
            isLoaderPage: true
        });

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/generate-qr', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({
                    secretWord: responseJson.secret,
                    qrCode: decodeURIComponent(responseJson.qr_path),
                    isLoaderPage: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    copyToClipboard = async () => {
        await Clipboard.setString(this.state.secretWord);
        return Alert.alert('Copied to Clipboard!');
    };

    disableTwoAuth() {
        if (this.state.disabledSecretKey.length === 0) {
            return Alert.alert('Enter secret key');
        }

        if (this.state.disabledTwoAuthKey.length !== 6 || isNaN(this.state.disabledTwoAuthKey)) {
            return Alert.alert('Enter 6 digit 2fa key');
        }

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/disable-two-auth', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    secret: this.state.disabledSecretKey,
                    token: this.state.disabledTwoAuthKey
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'Failed to verify') {
                    return Alert.alert(responseJson.message);
                }
                else {
                    Alert.alert('Success!');
                    return this.props.navigation.push('Settings');
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Generate QR code..." />);
        }
        if (this.state.isDisableTwoAuth) {
            return (
                <View style={styles.pageContainer}>
                    <StatusBar barStyle='dark-content' />
                    <View style={styles.contentContainer}>
                        <TextInput
                            placeholder="Secret key"
                            placeholderTextColor="#455578"
                            style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 20, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                            onChangeText={(disabledSecretKey) => this.setState({disabledSecretKey})}
                            value={this.state.disabledSecretKey}
                        />
                        <TextInput
                            placeholder="2fa key"
                            placeholderTextColor="#455578"
                            style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 20, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                            onChangeText={(disabledTwoAuthKey) => this.setState({disabledTwoAuthKey})}
                            value={this.state.disabledTwoAuthKey}
                        />
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={this.disableTwoAuth}
                                style={{backgroundColor: '#ffd24f', borderRadius: 4, padding: 15, width: wp(80)}}
                            >
                                <Text style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}>Disable</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.contentContainer}>
                    <View style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                        <QRCode
                            value={this.state.qrCode}
                            size={230}
                        />
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Save this secret code to safe place</Text>
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>{this.state.secretWord}</Text>

                        <View style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={this.copyToClipboard}
                                style={{backgroundColor: '#d1d8dd', borderRadius: 4, padding: 15, width: wp(80), marginBottom: 20}}
                            >
                                <Text style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}>Copy to clipboard</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={this.confirmTwoFactor}
                                style={{backgroundColor: '#ffd24f', borderRadius: 4, padding: 15, width: wp(80), marginBottom: 20}}
                            >
                                <Text style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}>I save code</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 30
    },
    contentContainer: {
        width: wp(90),
        backgroundColor: '#ffffff',
        padding: wp(5),
        borderRadius: 6
    }
});