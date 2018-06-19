import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';
import ls from 'react-native-local-storage';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';
import Leftmenu from './layouts/Leftmenu';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            isOpenLeftMenu: false,
            walletsList: [],
            isLoaderPage: false,
            userData: {
                userEmail: '',
                userName: '',
                userAvatar: ''
            }
        };
        this.changePage = this.changePage.bind(this);
        this.requestMoney = this.requestMoney.bind(this);
        this.sendMoney = this.sendMoney.bind(this);
        this.signOut = this.signOut.bind(this);
        this.sp = this.sp.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
    };

    componentDidMount() {
        this.initialUserWallets();
    }

    initialUserWallets() {
        this.setState({ isLoaderPage: !this.state.isLoaderPage });
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
                    walletsList: responseJson
                });
                return this.getUserData();
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    getUserData() {
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
                this.setState({
                    userData: {
                        userEmail: responseJson.email,
                        userName: responseJson.name,
                        userAvatar: responseJson.avatar
                    },
                    isLoaderPage: !this.state.isLoaderPage
                })
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    requestMoney(e) {
        this.props.navigation.navigate('RequestMoney', { animation: null, walletAddress: e });
    }

    sendMoney(e) {
        this.props.navigation.navigate('SendMoney', { animation: null, walletAddress: e });
    }

    signOut() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    sp() {
        this.props.navigation.navigate('SuccessPayment', { animation: null });
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
                isOpen={this.state.isOpenLeftMenu}
            >
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='light-content'
                    />
                    <WalletsSlider
                        walletsList={this.state.walletsList}
                        requestMoney={this.requestMoney}
                        sendMoney={this.sendMoney}
                    />
                    <NewWalletBlock />
                    <View>
                        <Button
                            title="Test"
                            color="#ffffff"
                            onPress={this.sp}
                        />
                    </View>
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