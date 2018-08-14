import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions, ListView } from 'react-native';
import ls from 'react-native-local-storage';

import Config from '../config'

import BottomNavigator from './layouts/BottomNavigator';
import TransactionBlock from './layouts/TransactionBlock';
import WalletsDropdownMenu from './layouts/WalletsDropdownMenu';
import Pageloader from './layouts/Pageloader';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false,
            transactionsData: [],
            walletsList: [],
            isLoaderPage: true,
            activeWalletIndex: 0,
            activeWalletAddress: '',
            isRefreshShow: false,
        };

        this.changePage = this.changePage.bind(this);
        this.getTransaction = this.getTransaction.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeWallet = this.changeWallet.bind(this);
        this.refreshTransactions = this.refreshTransactions.bind(this);
    }
    
    static navigationOptions = {
        title: "Operations history",
        headerLeft: null,
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount() {
        this.getUserWallets().done();
    }

    async getUserWallets() {
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

        await this.setStateAsync({
            walletsList: responseJson,
            activeWalletAddress: responseJson[0].address,
        });

        return this.getTransaction(this.state.walletsList[0].address).done();
    }

    async getTransaction(address) {
        await this.setStateAsync({
            isLoaderPage: true,
        });

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

        const response = await fetch(`${Config.SERVER_URL}/transactions/${address}`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        await this.setStateAsync({
            transactionsData: responseJson,
            isLoaderPage: false,
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    changeWallet(e) {
        this.setState({
            activeWalletIndex: e,
            activeWalletAddress: this.state.walletsList[e].address
        });
        this.getTransaction(this.state.walletsList[e].address);
    }

    async refreshTransactions() {
        await this.setStateAsync({
            isRefreshShow: true,
        });

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

        const response = await fetch(`${Config.SERVER_URL}/transactions/${this.state.walletsList[this.state.activeWalletIndex].address}`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        await this.setStateAsync({
            transactionsData: responseJson,
            isRefreshShow: false,
        });
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading transactions..." />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                
                <ScrollView
                    contentInset={{bottom:80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.refreshTransactions}
                            refreshing={this.state.isRefreshShow}
                            tintColor="#000000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >

                    <View style={{ width: wp(100), display: 'flex', alignItems: 'center' }}>
                        <WalletsDropdownMenu 
                            activeWalletIndex={this.state.activeWalletIndex}
                            walletsList={this.state.walletsList}
                            changeWallet={this.changeWallet}
                        />
                        <TransactionBlock
                            activeWalletAddress={this.state.activeWalletAddress}
                            data={this.state.transactionsData}
                        />
                    </View>

                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="history"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    }
});