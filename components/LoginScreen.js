import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';

import { observer } from 'mobx-react/native'

@observer
export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	static navigationOptions = {
        title: 'ALE Wallet'
    };

    render() {
    	return (
    		<View style={styles.container}>
				<View>
					<Image
						style={{width: 320, height: 66, resizeMode: 'contain' }}
						source={require('../assets/logo/ale.png')}
					/>
				</View>
	            <View>
					<View style={styles.buttonContainer}>
	                	<Button
	                    	title="Create new wallet"
	                    	onPress={() => this.props.navigation.navigate('Newwallet')}
	                    	color="#34343e"
	                  	/>
	              	</View>
	              	<View style={styles.buttonContainer}>
	                	<Button
	                    	title="Restore wallet"
	                    	onPress={() => this.props.navigation.navigate('Restorewallet')}
	                    	color="#34343e"
	                 	 />
	                </View>
	            </View>
	        </View>
	    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    backgroundColor: '#ffd24f',
    borderRadius: 4,
    padding: 10,
    width: 300,
    marginBottom: 20
  }
});