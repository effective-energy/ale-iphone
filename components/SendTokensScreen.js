import React from 'react';
import { View, Text } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

export default class SendTokensScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }
    
    static navigationOptions = {
        title: 'Send tokens',
        headerLeft: null
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {/*<BottomNavigator activePage="sendTokens" />*/}
                <View style={{ width: '100%', height: 60, position: 'absolute', 'bottom': 0, flexDirection: 'row', flex: 1 }}>
                    <Text
                        style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                        onPress={() => this.props.navigation.push('Wallets')}
                    >
                        Wallets
                    </Text>
                    <Text
                        style={{ width: '25%', height: 60, backgroundColor: '#f8f8f8', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                        onPress={() => this.props.navigation.push('SendTokens')}
                    >
                        Send
                    </Text>
                    <Text
                        style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                        onPress={() => this.props.navigation.push('ReceiveTokens')}
                    >
                        Receive
                    </Text>
                    <Text
                         style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                         onPress={() => this.props.navigation.push('SettingsTokens')}
                     >
                        Settings
                    </Text>
                </View>
            </View>
        );
    }
}