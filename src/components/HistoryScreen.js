import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions, ListView, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";

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

@inject("transactionsStore", "walletsStore")
@observer
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
        this.changeWallet = this.changeWallet.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: "Operations history",
            headerLeft: null,
        };
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount() {
        this.props.transactionsStore.getTransactions({
            address: this.props.walletsStore.walletsList[0].address,
            selectedWalletIndex: 0
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    changeWallet(e) {
        this.props.transactionsStore.getTransactions({
            address: this.props.walletsStore.walletsList[e].address,
            selectedWalletIndex: e
        });
    }

    render() {
        if (this.props.transactionsStore.isLoader) {
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
                            onRefresh={() => this.props.transactionsStore.refreshTransactions()}
                            refreshing={this.props.transactionsStore.isRefreshLoader}
                            tintColor="#000000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >

                    <View style={{ width: wp(100), display: 'flex', alignItems: 'center' }}>
                        <WalletsDropdownMenu 
                            activeWalletIndex={this.props.transactionsStore.selectedWalletIndex}
                            walletsList={this.props.walletsStore.walletsList}
                            changeWallet={this.changeWallet}
                        />
                        <TransactionBlock
                            activeWalletAddress={this.props.transactionsStore.selectedWallet}
                            data={this.props.transactionsStore.transactions}
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