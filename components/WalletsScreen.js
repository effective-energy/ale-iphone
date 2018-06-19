import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';
import ls from 'react-native-local-storage';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            isOpenLeftMenu: false,
            walletsList: [],
            isLoaderPage: false
        };
        this.changePage = this.changePage.bind(this);
        this.requestMoney = this.requestMoney.bind(this);
        this.sendMoney = this.sendMoney.bind(this);
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
                    walletsList: responseJson,
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
        return this.props.navigation.navigate('RequestMoney', { animation: null, walletAddress: e });
    }

    sendMoney() {
        Alert.alert('Open is sendMoney modal page');
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading wallets..." />);
        }
        return (
            <SideMenu
                menu={<Leftmenu />}
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

class Leftmenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        return this.props.navigation.navigate('Login', { animation: null });
        AsyncStorage.getItem('userToken').then((value) => {
            return Alert.alert(value)
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#091529', paddingTop: 50, paddingLeft: 20 }}>
                <View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Account</Text>
                    </View>
                    <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                        <View style={{ marginRight: 10 }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: 'https://pbs.twimg.com/profile_images/984770070571175936/aHxPljnr_bigger.jpg'}}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 18 }}>User name</Text>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>username@alehub.io</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginRight: 10, marginTop: 20 }}>
                    <View style={{ backgroundColor: '#ffbb00', width: 200 }}>
                        <Button
                            title="Sign out"
                            color="#000000"
                            onPress={this.signOut}
                        />
                    </View>
                    <View>
                        <Text>2.0.1</Text>
                    </View>
                </View>
            </View>
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