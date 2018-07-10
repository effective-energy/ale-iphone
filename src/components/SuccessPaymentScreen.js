import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, StatusBar, Button, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import Image from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class SuccessPaymentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.backToWalletsList = this.backToWalletsList.bind(this);
    }
    
    static navigationOptions = {
        title: 'Congratulations!'
    };

    backToWalletsList() {
        this.props.navigation.push('Wallets');
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{ marginTop: 50, width: screenWidth, display: 'flex', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>Your payment{'\n'}was successfully sent</Text>
                    <Image
                        source={require('../assets/images/icons/success_payment.svg')}
                        style={styles.paymentIcon}
                    />
                </View>
                <View style={{ backgroundColor: '#152038', width: screenWidth, padding: 5, borderRadius: 15, marginTop: 50 }}>
                    <Button
                        title="Back to wallets"
                        onPress={this.backToWalletsList}
                        color="#ffbb00"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center'
    },
    paymentIcon: {
        width: wp(80),
        height: wp(70),
        marginTop: 20
    }
});