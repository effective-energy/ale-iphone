import React from 'react';
import { Text, View } from 'react-native';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View style={{ width: '100%', height: 50, backgroundColor: '#cccccc', position: 'absolute', 'bottom': 0, flexDirection: 'row', flex: 1 }}>
        		<Text style={{ width: '25%', height: 50, backgroundColor: '#f8f8f8', color: '#000000', textAlign: 'center', lineHeight: 50 }}>Wallets</Text>
            	<Text style={{ width: '25%', height: 50, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 50 }}>Send</Text>
            	<Text style={{ width: '25%', height: 50, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 50 }}>Receive</Text>
            	<Text style={{ width: '25%', height: 50, backgroundColor: '#cccccc', color: '#000000', textAlign: 'center', lineHeight: 50 }}>Settings</Text>
            </View>
    	)
    }
}