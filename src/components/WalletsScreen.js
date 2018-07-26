import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';

import Config from '../config';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';
import Leftmenu from './layouts/Leftmenu';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            walletsList: [],
            isLoaderPage: true,
            userData: {
                userEmail: '',
                userName: '',
                userAvatar: ''
            },
            isRefreshShow: false
        };

        this.changePage = this.changePage.bind(this);
        this.requestMoney = this.requestMoney.bind(this);
        this.sendMoney = this.sendMoney.bind(this);
        this.signOut = this.signOut.bind(this);
        this.createNewWallet = this.createNewWallet.bind(this);
        this.openWalletDetailsScreen = this.openWalletDetailsScreen.bind(this);
        this.refreshWallets = this.refreshWallets.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
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
        try {
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

            if (responseJson.length === 0) {
                return this.props.navigation.push('NewWallet');
            }

            await this.setStateAsync({
                walletsList: responseJson,
            });

            return this.getUserData().done();
        } catch (error) {
            console.log(error);
        }
    }

    async getUserData() {
        try {
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

            const response = await fetch(`${Config.SERVER_URL}/users/get-user-data`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();

            await this.setStateAsync({
                userData: {
                    userEmail: responseJson.email,
                    userName: responseJson.name,
                    userAvatar: responseJson.avatar
                },
                isLoaderPage: false,
            });
        } catch (error) {
            console.log(error);
        }
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

    signOut() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    openWalletDetailsScreen(walletData) {
        this.props.navigation.navigate('WalletDetails', { walletData: walletData })
    }

    createNewWallet() {
        this.props.navigation.navigate('NewWallet');
    }

    async refreshWallets() {
        try {
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

            const response = await fetch(`${Config.SERVER_URL}/users/user-wallets`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            await this.setStateAsync({
                walletsList: responseJson,
                isRefreshShow: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.isLoaderPage) {
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
                            onRefresh={this.refreshWallets}
                            refreshing={this.state.isRefreshShow}
                            tintColor="#FFFFFF"
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <WalletsSlider
                        openWalletDetailsScreen={this.openWalletDetailsScreen}
                        walletsList={this.state.walletsList}
                        requestMoney={this.requestMoney}
                        sendMoney={this.sendMoney}
                    />
                    <NewWalletBlock
                        createNewWallet={this.createNewWallet}
                    />
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage}
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