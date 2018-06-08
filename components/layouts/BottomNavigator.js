import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }


    render() {
    	return (
    		<View style={{ width: '100%', height: 60, position: 'absolute', 'bottom': 0, flexDirection: 'row', flex: 1 }}>
        		<Text
                    style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                    onPress={() => this.props.onClick}
                >
                    Wallets
                </Text>
            	<Text
                    style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                    onPress={() => this.props.navigation.push('Wallets')}
                >
                    Send
                </Text>
            	<Text
                    style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                >
                    Receive
                </Text>
            	<Text
                     style={{ width: '25%', height: 60, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 60 }}
                 >
                    Settings
                </Text>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: '#f8f8f8'
  },
  nonActiveTab: {
    backgroundColor: '#cccccc'
  }
});