// @flow
import { observable, action } from "mobx";
import ls from 'react-native-local-storage';

import Config from '../config';

export default class UserStore {
    @observable name = '';
	@observable email = '';
    @observable avatar = '';
}