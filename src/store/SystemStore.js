// @flow
import { observable, action } from "mobx";

export default class SystemStore {
    @observable userToken = null;
}