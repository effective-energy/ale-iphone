// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';
import { Alert } from 'react-native';

import Config from '../config';

export default class UserStore {
    @observable name = '';
	@observable email = '';
    @observable avatar = '';
    @observable isLoader = false;
    @observable isLogin = false;

    @action async login(data: Object) {
    	try {
    		this.isLoader = true;
    		this.isLogin = false;

            const params = {
                method: 'POST',
	    		headers: {
	    			'Accept': 'application/json',
	    			'Content-Type': 'application/json',
	    		},
	    		body: JSON.stringify({
	    			email: data.email.toLowerCase(),
	    			password: data.password
	    		})
            };

            const response = await fetch(`${Config.SERVER_URL}/users/login`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            if (responseJson.message === 'Auth success') {
            	ls.save('userToken', responseJson.user_token).then(() => {
            		this.isLoader = false;
    				this.isLogin = true;
            	})
            } else {
            	this.isLoader = false;
            	Alert.alert(responseJson.message)
            }
    	} catch (error) {
    		this.isLoader = false;
    		console.log(error);
    	}
    }

    @action async createAccount() {
    	try {

    	} catch (error) {

    	}
    }

    @action async recoverAccount() {
    	try {

    	} catch(error) {

    	}
    }

    @action async logout() {
    	try {

    	} catch (error) {

    	}
    }
}