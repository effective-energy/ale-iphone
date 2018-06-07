import React from 'react';
import { Text, View, Button } from 'react-native';

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    sendTokens() {

    }

    receiveTokens() {

    }

	render() {
		return (
			<View style={{ width: '100%', height: 150, backgroundColor: '#cccccc', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            	<View style={{ marginBottom: 20 }}>
            		<Text style={{ textAlign: 'center', marginTop: 10 }}>My wallet 1</Text>
            		<Text style={{ textAlign: 'center' }}>45,344.99912 ALE</Text>
            	</View>
            	<View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>

            		<View>
            			<Button
            				title="Send"
                    		onPress={this.sendTokens}
                    		color="#000000"
                  		/>
            		</View>

            		<View>
            			<Button
            				title="Receive"
                    		onPress={this.receiveTokens}
                    		color="#000000"
                  		/>
            		</View>

            	</View>
            </View>
		)
	}
}