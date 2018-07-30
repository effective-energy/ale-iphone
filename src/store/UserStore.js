// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';

import Config from '../config';

export default class UserStore {
    @observable name = '';
	@observable email = '';
    @observable avatar = '';

    @action async login() {
    	try {

    	} catch (error) {

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