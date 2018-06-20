import React from 'react';
import { View, Button, StyleSheet, StatusBar } from 'react-native';

import ls from 'react-native-local-storage';

// I18n 
import I18n from '../i18n/index';

import BottomNavigator from './layouts/BottomNavigator';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.logout = this.logout.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: I18n.t('settingsPage.title'),
        headerLeft: null,
        gesturesEnabled: false,
        headerStyle: {
            backgroundColor: '#e8ebee',
      },
    };

    logout() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Sign out"
                            onPress={this.logout}
                            color="#34343e"
                         />
                    </View>
                </View>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="settings"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee'
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 10,
        width: 300,
        marginBottom: 20
    }
});