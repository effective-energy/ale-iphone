import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Alert, SafeAreaView } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import { when } from "mobx";
import isIphoneX from '../config/isIphoneX';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';

@inject("walletsStore")
@observer
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Wallets',
            headerLeft: null,
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    watcher = when(() => this.props.walletsStore.isEmptyWallets === true, () => {
        this.props.navigation.push('NewWallet', {
            disableBackArrow: true
        });
    });

    componentDidMount() {
        this.props.walletsStore.initWallets();
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    requestMoney(e) {
        this.props.navigation.navigate('RequestMoney', { walletAddress: e });
    }

    sendMoney(e) {
        this.props.navigation.navigate('SendMoney', { walletAddress: e });
    }

    openWalletDetailsScreen(walletData) {
        this.props.navigation.navigate('WalletDetails', { walletData: walletData })
    }

    createNewWallet() {
        this.props.navigation.navigate('NewWallet');
    }

    refreshWallets() {
        this.props.walletsStore.refreshWallets();
    }

    render() {
        if (this.props.walletsStore.isLoaderPage) {
            return (<Pageloader title="Loading wallets..." />);
        }
        return (
            <SafeAreaView
                style={styles.pageContainer}
            >
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView
                    contentInset={{bottom: isIphoneX === true ? 104 : 80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.refreshWallets.bind(this)}
                            refreshing={this.props.walletsStore.isRefreshLoader}
                            tintColor="#FFFFFF"
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <WalletsSlider
                        openWalletDetailsScreen={this.openWalletDetailsScreen.bind(this)}
                        walletsList={this.props.walletsStore.walletsList}
                        requestMoney={this.requestMoney.bind(this)}
                        sendMoney={this.sendMoney.bind(this)}
                    />
                    <NewWalletBlock
                        createNewWallet={this.createNewWallet.bind(this)}
                    />
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="wallets"
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#091430'
    }
});