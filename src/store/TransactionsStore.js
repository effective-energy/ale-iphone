// @flow
import { observable, action } from "mobx";

export default class TransactionsStore {
    @observable transactionsList = [];
}