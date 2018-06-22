import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false
        };

        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: "Notifications"
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
               <Text>Notifications page</Text>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="notifications"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee'
    }
});