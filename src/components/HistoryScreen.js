import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text, Dimensions } from 'react-native';
import ls from 'react-native-local-storage';

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
            isLoaderPage: false,
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

    componentDidMount() {
        this.getUserWallets();
    }

    getUserWallets() {
        this.setState({ isLoaderPage: true });
        ls.get('userToken').then((data) => {
            fetch('https://ale-demo-4550.nodechef.com/users/user-wallets', {
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
                    isLoaderPage: false,
                    activeWalletAddress: responseJson[0].address
                });
                return this.getTransaction(this.state.walletsList[0].address);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    getTransaction(address) {
        this.setState({ isLoaderPage: true });
        ls.get('userToken').then((data) => {
            fetch('https://ale-demo-4550.nodechef.com/transactions/'+address, {
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
                    transactionsData: responseJson,
                    isLoaderPage: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
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

    refreshTransactions() {
        this.setState({
            isRefreshShow: true,
        });

        ls.get('userToken').then((data) => {
            fetch('https://ale-demo-4550.nodechef.com/transactions/'+this.state.walletsList[this.state.activeWalletIndex].address, {
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
                    transactionsData: responseJson,
                    isRefreshShow: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
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