import React from 'react';
import { View, Text, StatusBar, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import Config from '../config';

export default class ConfirmRegisterScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {
            isLoader: false
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Confirm register',
            headerLeft: null,
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    componentDidMount () {
        this.confirmRegisterAccount();
    }

    async confirmRegisterAccount() {
        const userToken = await ls.get('userToken');
        if (userToken !== null) {
            return this.props.navigation.navigate('Wallets');
        }
        this.setState({
            isLoader: true
        });

        const params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this.props.navigation.state.params.token,
            })
        }

        const response = await fetch(`${Config.SERVER_URL}/users/confirm-reg`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        if (responseJson.user_token !== undefined) {
            ls.save('userToken', responseJson.user_token).then(() => {
                this.setState({
                    isLoader: false,
                });
                return this.props.navigation.navigate('Wallets');
            });
        } else {
            Alert.alert('Invalid token');
            return this.props.navigation.navigate('Login');
        }
    }

    render() {
    	return (
    		<View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <ActivityIndicator
                    animating={this.state.isLoader}
                    size="large"
                    color="#ffbb00"
                />
            </View>
    	);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07132f',
        alignItems: 'center',
        justifyContent: 'center'
    },
});