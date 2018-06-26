import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import TransactionBlock from './layouts/TransactionBlock';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false
        };

        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: "Operations history"
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{ marginTop: 20 }}>
                    <TransactionBlock />
                </View>
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