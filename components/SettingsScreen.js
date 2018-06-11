import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.logout = this.logout.bind(this);
    }
    
    static navigationOptions = {
        title: 'Settings',
        headerLeft: null
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Logout"
                            onPress={this.logout}
                            color="#34343e"
                         />
                    </View>
                </View>
                {/*<BottomNavigator activePage="sendTokens" />*/}
                <View style={{ width: '100%', height: 60, position: 'absolute', 'bottom': 0, flexDirection: 'row', flex: 1 }}>
                    <View style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={{uri: 'https://cdn3.iconfinder.com/data/icons/business/16/wallet-512.png'}}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                            onPress={() => this.props.navigation.push('Wallets')}
                        >
                            Wallets
                        </Text>
                    </View>
                    <View style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={{uri: 'https://cdn2.iconfinder.com/data/icons/inverticons-fill-vol-2/32/paper_plane_document_send_sent_mail-512.png'}}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                            onPress={() => this.props.navigation.push('SendTokens')}
                        >
                            Send
                        </Text>
                    </View>
                    <View style={{ width: '25%', height: 60, backgroundColor: '#cccccc', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={{uri: 'https://cdn2.iconfinder.com/data/icons/eldorado-mobile/40/inbox_receive-512.png'}}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                            onPress={() => this.props.navigation.push('ReceiveTokens')}
                        >
                            Receive
                        </Text>
                    </View>
                    <View style={{ width: '25%', height: 60, backgroundColor: '#f8f8f8', flex: 1, flexDirection: 'column', maxHeight: 60, alignItems: 'center' }}>
                        <Image
                            style={{width: 25, height: 25, marginTop: 10, marginBottom: 5 }}
                            source={{uri: 'https://cdn1.iconfinder.com/data/icons/flat-web-browser/100/settings-512.png'}}
                        />
                        <Text
                            style={{ color: '#000000', textAlign: 'center' }}
                            onPress={() => this.props.navigation.push('Settings')}
                        >
                            Settings
                        </Text>
                    </View>
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