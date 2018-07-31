// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';

import Config from '../config';

export default class WalletsStore {
	@observable walletsList = [];
    @observable isLoaderPage = false;
    @observable isRefreshLoader = false;

	@action async initWallets() {
		try {
            this.isLoaderPage = true;
			const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/user-wallets`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            this.walletsList = responseJson;
            this.isLoaderPage = false;
		} catch (error) {
            this.isLoaderPage = false;
			console.log(error);
		}
	}

    @action async refreshWallets() {
        try {
            this.isRefreshLoader = true;

            const userToken = await ls.get('userToken');
            if (!userToken) {
                throw userToken
            }

            const params = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userToken
                }
            }

            const response = await fetch(`${Config.SERVER_URL}/users/user-wallets`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            this.walletsList = responseJson;
            this.isRefreshLoader = false;
            
        } catch (error) {
            this.isRefreshLoader = false;
            console.log(error);
        }
    }
}