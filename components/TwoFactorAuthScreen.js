import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, Image } from 'react-native';

import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class TwoFactorAuthScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};

        this.copyToClipboard = this.copyToClipboard.bind(this);
    }
    
    static navigationOptions = {
        title: "Enable two auth"
    };

    copyToClipboard() {

    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.qrCodeContainer}>
                    <View style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                        <Image
                            source={{uri: 'https://internationalbarcodes.net/wp-content/uploads/2017/04/QR%20code%20example.jpg'}}
                            style={{ width: wp(50), height: wp(50), margin: 0, padding: 0 }}
                        />
                    </View>
                    <View style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Save this secret code to safe place</Text>
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>IF3FUTZWLNJSYNS5NBAVASCMFEZHOMZK</Text>
                        <View style={{ backgroundColor: '#d1d8dd', width: wp(70), padding: 5, borderRadius: 5, marginTop: 20 }}>
                            <Button
                                title="Copy to clipboard"
                                onPress={this.copyToClipboard}
                                color="#000000"
                            />
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