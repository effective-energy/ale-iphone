import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TextInput, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';

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

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
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
		};

		this.loginToWallet = this.loginToWallet.bind(this);
		this.createAccount = this.createAccount.bind(this);
		this.recoverAccount = this.recoverAccount.bind(this);
	}

	static navigationOptions = {
        header: null,
    };

    componentDidMount() {
    	this.initWallets();
    }

    initWallets() {
    	ls.get('userToken').then((result) => {
    		if (result !== null) {
    			return this.props.navigation.push('Wallets');
    		}
    	})
    }

    loginToWallet() {
    	if (this.state.userEmail.length === 0) {
    		return Alert.alert('Enter your E-mail');
    	}

    	if (!validateEmail(this.state.userEmail)) {
    		return Alert.alert('Enter valid E-mail');
    	}

    	if (this.state.userPassword.length === 0) {
    		return Alert.alert('Enter your password');
    	}

    	this.setState({isPageLoader: true});

    	return fetch('https://ale-demo-4550.nodechef.com/users/login', {
    		method: 'POST',
    		headers: {
    			'Accept': 'application/json',
    			'Content-Type': 'application/json',
    		},
    		body: JSON.stringify({
    			email: this.state.userEmail.toLowerCase(),
    			password: this.state.userPassword
    		}),
    	})
    	.then((response) => response.json())
    	.then((responseJson) => {
    		if (responseJson.message === 'Auth success') {
    			ls.save('userToken', responseJson.user_token).then(() => {
    				this.setState({isPageLoader: false});
    				return this.props.navigation.push('Wallets');
    			})
    		} else {
    			this.setState({isPageLoader: false});
    			Alert.alert(responseJson.message)
    		}
    	})
    	.catch((error) => {
    		console.error(error);
    	});
    }

    createAccount() {
    	this.props.navigation.navigate('CreateAccount');
    }

    recoverAccount() {
    	this.props.navigation.navigate('RecoverAccount');
    }

    render() {
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
							placeholder="Enter your email"
							placeholderTextColor="#455578"
                            style={styles.emailInput}
                            onChangeText={(userEmail) => this.setState({userEmail})}
                            value={this.state.userEmail}
                        />
                        <TextInput
                        	secureTextEntry={true}
                        	placeholder="Enter your password"
                        	placeholderTextColor="#455578"
                            style={styles.passwordInput}
                            onChangeText={(userPassword) => this.setState({userPassword})}
                            value={this.state.userPassword}
                        />
					</View>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={this.loginToWallet}
					>
						<Image
                            source={require('../assets/images/icons/icon_login-icon.svg')}
                            style={styles.loginIcon}
                        />
						<Text style={styles.loginText}>Login to wallet</Text>
					</TouchableOpacity>

					{
						this.state.isPageLoader === true ?
							<ActivityIndicator size="large" color="#CCCCCC" style={{marginTop: 20}} />
							: null
					}
				</View>
				<View style={styles.bottomInfo}>
					<View style={styles.bottomInfo_recover}>
						<Text style={styles.bottomInfo_recover_text}>Forgot your email or password?</Text>
						<TouchableOpacity
							onPress={this.recoverAccount}
							style={styles.bottomInfo_recover_link}
						>
							<Text style={styles.bottomInfo_recover_link_text}>Recover account</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.bottomInfo_register}>
						<Text style={styles.bottomInfo_register_text}>Don't have an account?</Text>
						<TouchableOpacity
							onPress={this.createAccount}
							style={styles.bottomInfo_register_link}
						>
							<Text style={styles.bottomInfo_register_link_text}>Create one</Text>
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
		backgroundColor: '#07132f',
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
	},
    emailInput: {
        height: 40,
        borderWidth: 1,
        width: screenWidth,
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    passwordInput: {
        height: 40,
        borderWidth: 1,
        width: screenWidth,
        marginBottom: 25,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    loginButton: {
        backgroundColor: '#152038',
        width: screenWidth,
        padding: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    loginText: {
        color: '#ffbb00',
        textAlign: 'center',
        fontSize: 18
    },
    bottomInfo: {
        width: wp(80)
    },
    bottomInfo_recover: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomInfo_recover_text: {
        color: '#34476f'
    },
    bottomInfo_recover_link: {
        marginLeft: 10
    },
    bottomInfo_recover_link_text: {
        color: '#ffbb00'
    },
    bottomInfo_register: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    bottomInfo_register_text: {
        color: '#34476f'
    },
    bottomInfo_register_link: {
        marginLeft: 10
    },
    bottomInfo_register_link_text: {
        color: '#ffbb00'
    }
});