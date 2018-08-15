import React from 'react';
import { Alert } from 'react-native';
import ls from 'react-native-local-storage';
import Config from '../config';

import Pageloader from './layouts/Pageloader';

export default class InitialScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    componentDidMount() {
        this.initialData();
    }

    async initialData () {
        return this.props.navigation.navigate('Login');
        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }
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