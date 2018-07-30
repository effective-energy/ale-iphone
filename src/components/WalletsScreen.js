import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';

import Config from '../config';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

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
            header: null,
            headerLeft: null,
            gesturesEnabled: false,
            statusBarBackgroundColor: '#ffffff'
        };
    };

    componentDidMount() {
        this.props.walletsStore.initWallets();
    }

    changePage(e) {
        this.props.navigation.navigate(e, { transition: 'vertical' });
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
            <View
                style={styles.pageContainer}
            >
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView
                    contentInset={{bottom:80}}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#091430'
    }
});