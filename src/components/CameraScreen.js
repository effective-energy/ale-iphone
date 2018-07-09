import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};

        this.comeBack = this.comeBack.bind(this);
    }
    
    static navigationOptions = {
        header: null,
    };

    onSuccess(e) {
        this.props.navigation.push('SendMoney', {
            destinationAddress: e.data
        });
    }

    comeBack() {
        this.props.navigation.push('SendMoney');
    }

    render() {
        return (
            <QRCodeScanner
                showMarker={true}
                onRead={this.onSuccess.bind(this)}
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={this.comeBack}>
                        <Text style={styles.buttonText}>Come back</Text>
                    </TouchableOpacity>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});