import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';

import ls from 'react-native-local-storage';
import Pageloader from './layouts/Pageloader';
import Spinner from './layouts/Spinner';

// I18n 
import I18n from '../i18n/index';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class LoginScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPageLoader: false,
			userEmail: '',
			userPassword: '',
			isLogginUser: false
		};

		this.loginToWallet = this.loginToWallet.bind(this);
	}

	static navigationOptions = {
        header: null,
        statusBarBackgroundColor: '#ffffff'
    };

    componentDidMount() {
    	this.initWallets();
    }

    initWallets() {
    	ls.get('userToken').then((result) => {
    		if (result !== null) {
    			return this.props.navigation.push('Wallets', { animation: null });
    		}
    	})
    }

    loginToWallet() {
    	if (this.state.userEmail.length === 0) {
    		return Alert.alert('Enter your login');
    	}

    	if (this.state.userPassword.length === 0) {
    		return Alert.alert('Enter your password');
    	}

    	return fetch('https://ale-demo-4550.nodechef.com/users/login', {
    		method: 'POST',
    		headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
    		},
    		body: JSON.stringify({
    			email: this.state.userEmail,
    			password: this.state.userPassword
    		}),
    	})
    	.then((response) => response.json())
    	.then((responseJson) => {
    		if (responseJson.message === 'Auth success') {
    			ls.save('userToken', responseJson.user_token).then(() => {
    				return this.props.navigation.push('Wallets', { animation: null });
    			})
    		} else {
    			Alert.alert(responseJson.message)
    		}
    	})
    	.catch((error) => {
    		console.error(error);
    	});
    }

    recoverAccount() {
    	Alert.alert('Recover');
    }

    createAccount() {
    	Alert.alert('Create account');
    }

    render() {
    	if (this.state.isLogginUser) {
    		return (<Pageloader />);
    	}
    	return (
    		<View style={styles.container}>
    			<StatusBar barStyle='light-content' />
				<View>
					<Image
					  source={require('../assets/images/logo/white_logo.svg')}
					  style={styles.logo}
					/>
				</View>
				<View>
					<View>
						<TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#ffffff' }}
                            onChangeText={(userEmail) => this.setState({userEmail})}
                            value={this.state.userEmail}
                        />
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#ffffff' }}
                            onChangeText={(userPassword) => this.setState({userPassword})}
                            value={this.state.userPassword}
                        />
					</View>
					<View style={{ backgroundColor: '#152038', width: screenWidth, padding: 5, borderRadius: 15 }}>
						<Button
							title="Login to wallet"
							onPress={this.loginToWallet}
							color="#ffbb00"
						/>
					</View>
					{this.state.isPageLoader === true ? <View style={{ marginTop: 20 }}>
							<Image
			                    style={{ width: 44, height: 44 }}
			                    source={require('../assets/images/icons/spinner.svg')}
			                />
						</View>: null}
				</View>
				<View>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ color: '#34476f' }}>Forgot your email or password?</Text>
						<TouchableOpacity
							onPress={this.recoverAccount}
							style={{ marginLeft: 10 }}
						>
							<Text style={{ color: '#ffbb00' }}>Recover account</Text>
						</TouchableOpacity>
					</View>
					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
						<Text style={{ color: '#34476f' }}>Don't have an account?</Text>
						<TouchableOpacity
							onPress={this.createAccount}
							style={{ marginLeft: 10 }}
						>
							<Text style={{ color: '#ffbb00' }}>Create one</Text>
						</TouchableOpacity>
					</View>
				</View>
	        </View>
	    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#08142F',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	buttonContainer: {
		backgroundColor: '#ffd24f',
		borderRadius: 4,
		padding: 10,
		width: 300,
		marginBottom: 20
	},
	logo: {
		width: 235,
		height: 106,
		maxWidth: '80%',
		display: 'flex',
		alignItems: 'center'
	}
});