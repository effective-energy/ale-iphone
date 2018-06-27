import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl, Text } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import TransactionBlock from './layouts/TransactionBlock';

import DropdownMenu from 'react-native-dropdown-menu';

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
        var data = [["Wallet 1", "Wallet 2", "Wallet 3", "Wallet 4"]];
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
                    <View style={{ marginTop: 20 }}>
                        <DropdownMenu
                            style={{flex: 1}}
                            bgColor={'white'}
                            tintColor={'#666666'}
                            activityTintColor={'#666666'}
                            handler={(selection, row) => this.setState({text: data[selection][row]})}
                            data={data}
                        >
                            <View style={{flex: 1, marginTop: 10}}>
                                <TransactionBlock data={this.state.transactionsData} />
                                <Text>
                                    {this.state.text}
                                </Text>
                            </View>
                        </DropdownMenu>
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