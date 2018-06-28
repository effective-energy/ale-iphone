import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, Image, AlertIOS } from 'react-native';

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
            qrCode: '""'
        };

        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.confirmTwoFactor = this.confirmTwoFactor.bind(this);
    }
    
    static navigationOptions = {
        title: "Enable two auth"
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params.type === 'enable') {
            return this.gererateTwoAuthCode();
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
                    return this.props.navigation.push('Settings', { animation: null });
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

    copyToClipboard() {

    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Generate QR code..." />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.qrCodeContainer}>
                    <View style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                        <QRCode
                            value={this.state.qrCode}
                            size={230}
                        />
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Save this secret code to safe place</Text>
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>{this.state.secretWord}</Text>
                        <View style={{ backgroundColor: '#d1d8dd', width: wp(70), padding: 5, borderRadius: 5, marginTop: 20 }}>
                            <Button
                                title="Copy to clipboard"
                                onPress={this.copyToClipboard}
                                color="#000000"
                            />
                        </View>
                        <View style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={this.confirmTwoFactor}
                                style={{backgroundColor: '#ffd24f', borderRadius: 4, padding: 15, width: wp(80), marginBottom: 20}}
                            >
                                <Text style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}>I have code</Text>
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
        paddingTop: 50
    },
    qrCodeContainer: {
        width: wp(90),
        backgroundColor: '#ffffff',
        padding: wp(5),
        borderRadius: 6
    }
});