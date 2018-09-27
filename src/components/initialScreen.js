import React from 'react';
import { Linking, Alert, Platform } from 'react-native';
import ls from 'react-native-local-storage';
import Config from '../config';

import Pageloader from './layouts/Pageloader';

export default class InitialScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            gesturesEnabled: false,
            header: null,
        };
    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
        this.initialData();
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    }

    navigate = (url) => {
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');

        ls.get('userToken').then((data) => {
            if (data === null && route.split('token=')[1] !== undefined) {
                return this.props.navigation.navigate('ConfirmRegister', {
                    token: route.split('token=')[1]
                });
            }
        });
    }

    async initialData () {
        const userToken = await ls.get('userToken');
        if (userToken === null) {
            return this.props.navigation.navigate('Login');
        } else {
            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/get-user-data`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message !== 'User is found') {
                ls.remove('userToken').then(() => {
                    return this.props.navigation.navigate('Login');
                })
            }
            return this.props.navigation.navigate('Wallets');
        }
    }

    render() {
        return(
            <Pageloader title="Loading application..." />
        );
    }
}