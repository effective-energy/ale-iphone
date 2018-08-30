import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, Alert, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Spinner from './layouts/Spinner';

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
            senderAddress: this.props.navigation.state.params.walletAddress,
            modalVisible: false,
            isShowSpinner: false,
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
        };
    };

    componentDidMount() {
        this.resetState();
    }

    resetState () {
        this.setState({
            amount: '',
            destinationAddress: ''
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    sendMoney() {
        if (this.state.amount === '') {
            return Alert.alert('Enter amount');
        }

        if (isNaN(this.state.amount)) {
            return Alert.alert('Enter number amount');
        }

        if (this.state.destinationAddress === '') {
            return Alert.alert('Enter destination address');
        }

        if (this.state.senderAddress === this.state.destinationAddress) {
            return Alert.alert('You can not send money to yourself');
        }

        this.setState({
            isShowSpinner: true,
        });

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
                this.setState({
                    isShowSpinner: false,
                });
                if (responseJson.message === 'Success send') {
                    return this.props.navigation.navigate('SuccessPayment');
                } else {
                    return Alert.alert(responseJson.message);
                }
            })
            .catch((error) => {
                this.setState({
                    isShowSpinner: false,
                });
                console.error(error);
            });
        });
    }

    onSuccess(e) {
        this.setState({
            destinationAddress: e.data,
            modalVisible: false
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='light-content' />
                { this.state.isShowSpinner === true && <Spinner />}
            	<View>
            		<View>
                        <TextInput
                            placeholder="Amount"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                            keyboardType = 'numeric'
                            returnKeyType = { "next" }
                            onSubmitEditing={() => { this.addressTextInput.focus(); }}
                        />
                        <TextInput
                            ref={(input) => { this.addressTextInput = input; }}
                            placeholder="Address destination"
                            placeholderTextColor="#455578"
                            style={styles.text_input}
                            onChangeText={(destinationAddress) => this.setState({destinationAddress})}
                            value={this.state.destinationAddress}
                        />
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                    >
                        <QRCodeScanner
                            notAuthorizedView={
                                <View>
                                    <Text style={{textAlign: 'center'}}>Allow the use of the camera in the settings</Text>
                                </View>
                            }
                            showMarker
                            onRead={this.onSuccess.bind(this)}
                            bottomContent={
                                <TouchableHighlight
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                >
                                    <Text>Hide QR Scanner</Text>
                                </TouchableHighlight>
                            }
                        />
                    </Modal>

                    <TouchableOpacity
                        onPress={this.sendMoney}
                        style={{ backgroundColor: '#16203a', width: screenWidth, padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <SVGImage
                            source={require('../assets/images/icons/sent-icon.svg')}
                            style={{width: 20, height: 20, marginRight: 10}}
                        />
                        <Text
                            style={{ color: '#f0b721', textAlign: 'center', fontSize: 18 }}
                        >
                            Send
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                        style={{ backgroundColor: '#16203a', width: screenWidth, padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                    >
                        <SVGImage
                            source={require('../assets/images/icons/qr-code.svg')}
                            style={{width: 15, height: 15, marginRight: 10}}
                        />
                        <Text
                            style={{ color: '#f0b721', textAlign: 'center', fontSize: 18 }}
                        >
                            Scan QR code
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