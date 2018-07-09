import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert, Dimensions, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import SideMenu from 'react-native-side-menu';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';

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

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            walletsList: [],
            isLoaderPage: false,
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
        this.getWallets = this.getWallets.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
    };

    componentWillMount() {
        this.setState({ isOpenLeftMenu: false });
        this.initialUserWallets();
    }

    initialUserWallets() {
        this.setState({ isLoaderPage: true });
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/user-wallets', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    walletsList: responseJson,
                    isLoaderPage: false
                });
                return this.getUserData();
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    getUserData() {
        this.setState({ isLoaderPage: true });
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/get-user-data', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({
                    userData: {
                        userEmail: responseJson.email,
                        userName: responseJson.name,
                        userAvatar: responseJson.avatar
                    },
                    isLoaderPage: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
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

    getWallets() {
        this.setState({
            isRefreshShow: true
        });

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/user-wallets', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    walletsList: responseJson,
                    isRefreshShow: false
                });
                return this.getUserData();
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading wallets..." />);
        }
        return (
            <SideMenu
                menu={
                    <Leftmenu
                        signOut={this.signOut}
                        userData={this.state.userData}
                    />
                }
            >
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
                                onRefresh={() => this.getWallets}
                                refreshing={this.state.isRefreshShow}
                                refreshing={false}
                                tintColor="#FFFFFF"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
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
                    {/*<View>
                        <Counter />
                    </View>
                    <View>
                        <Button
                            onPress={() => this.props.counterStore.increment()}
                            title="Increment Counter"
                            color="#805841"
                        />
                    </View>*/}
                    <BottomNavigator
                        changePage={this.changePage}
                        activePage="wallets"
                    />
                </View>
            </SideMenu>
        );
    }
}

@inject("counterStore")
@observer
class Counter extends React.Component {
  render() {
    return <Text>Count: {this.props.counterStore.count}</Text>;
  }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#091430'
    }
});