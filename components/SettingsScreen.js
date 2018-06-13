import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

// I18n 
import I18n from '../i18n/index';

import BottomNavigator from './layouts/BottomNavigator';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.logout = this.logout.bind(this);
    }
    
    static navigationOptions = {
        title: I18n.t('settingsPage.title'),
        headerLeft: null,
        gesturesEnabled: false
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={I18n.t('settingsPage.logout')}
                            onPress={this.logout}
                            color="#34343e"
                         />
                    </View>
                </View>
                <View style={{ width: '100%', height: 60, position: 'absolute', 'bottom': 0, flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity
                        style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}
                        onPress={() => this.props.navigation.push('Wallets', { animation: null })}
                    >
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={require('../assets/images/navigation/bottom/wallet.png')}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                            onPress={() => this.props.navigation.push('Wallets', { animation: null })}
                        >
                            Wallets
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}
                        onPress={() => this.props.navigation.push('SendTokens', { animation: null })}
                    >
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={require('../assets/images/navigation/bottom/send.png')}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                        >
                            Send
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}
                        onPress={() => this.props.navigation.push('ReceiveTokens', { animation: null })}
                    >
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={require('../assets/images/navigation/bottom/receive.png')}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                        >
                            Receive
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: '25%', height: 60, backgroundColor: '#f8f8f8', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}
                        onPress={() => this.props.navigation.push('Settings', { animation: null })}
                    >
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={require('../assets/images/navigation/bottom/settings.png')}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                        >
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    logout() {
        return this.props.navigation.navigate('Login');
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffd24f',
    borderRadius: 4,
    padding: 10,
    width: 300,
    marginBottom: 20
  }
});