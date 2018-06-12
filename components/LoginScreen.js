import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Image from 'react-native-remote-svg';

// I18n 
import I18n from '../i18n/index';

import { observer } from 'mobx-react/native';

@observer
export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	static navigationOptions = {
        header: null
    };

    render() {
    	return (
    		<View style={styles.container}>
				<View>
					<Image
					  source={require('../assets/images/logo/logo.svg')}
					  style={{width: 384, height: 80 }}
					/>
				</View>
	            <View>
					<View style={styles.buttonContainer}>
	                	<Button
	                    	title={I18n.t('loginPage.btnBlock.newWallet')}
	                    	onPress={() => this.props.navigation.navigate('Newwallet')}
	                    	color="#34343e"
	                  	/>
	              	</View>
	              	<View style={styles.buttonContainer}>
	                	<Button
	                    	title={I18n.t('loginPage.btnBlock.importWallet')}
	                    	onPress={() => this.props.navigation.navigate('Importwallet')}
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