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

    qrScanner() {

    }

    takePicture = async function() {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)
          console.log(data.uri);
        }
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
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#000000' }}
                            onChangeText={(amount) => this.setState({amount})}
                            value={this.state.amount}
                        />
                        <TextInput
                            placeholder="Address destination"
                            placeholderTextColor="#000000"
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
                    <View style={styles.container}>
                        <RNCamera
                            ref={ref => {
                              this.camera = ref;
                            }}
                            style = {styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            permissionDialogTitle={'Permission to use camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'}
                        />
                        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                        <TouchableOpacity
                            onPress={this.takePicture.bind(this)}
                            style = {styles.capture}
                        >
                            <Text style={{fontSize: 14}}> SNAP </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#d1d8dd', width: screenWidth, padding: 5, borderRadius: 5 }}>
                        <Button
                            title="QR scannet"
                            onPress={this.qrScanner}
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