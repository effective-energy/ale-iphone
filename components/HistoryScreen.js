import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import TransactionBlock from './layouts/TransactionBlock';
import WalletsDropdownMenu from './layouts/WalletsDropdownMenu';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false,
            transactionsData: [{
                date: '17.03.18',
                time: '7:25 PM',
                amount: 999,
                sender: 'Satoshi Nakamoto',
                type: 'send'
            }],
            walletsList: [{
                id: 1,
                name: 'Wallet 1',
                balance: 1000
            }, {
                id: 2,
                name: 'Wallet 2',
                balance: 2000
            }]
        };

        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: "Operations history",
        headerLeft: null,
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                
                <ScrollView
                    contentInset={{bottom:80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor="#000000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <View>
                        <WalletsDropdownMenu walletsList={this.state.walletsList} />
                        <TransactionBlock data={this.state.transactionsData} />
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
        alignItems: 'center'
    }
});