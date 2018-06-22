import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert } from 'react-native';

import ls from 'react-native-local-storage';

// I18n 
import I18n from '../i18n/index';

import BottomNavigator from './layouts/BottomNavigator';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false
        };
        this.logout = this.logout.bind(this);
        this.changePage = this.changePage.bind(this);

        this.onValueChange = this.onValueChange.bind(this);
    }
    
    static navigationOptions = {
        title: I18n.t('settingsPage.title'),
        headerLeft: null,
        gesturesEnabled: false,
    };

    logout() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    onValueChange() {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(100), backgroundColor: '#ffffff', padding: 10 }}>
                    <Text style={{ fontSize: wp(5) }}>Enable 2fa</Text>
                    <Switch value={this.state.isActive} tintColor="#cccccc" onValueChange={this.onValueChange} />
                </View>
                <View style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.logout}>
                        <Text style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}>Sign out</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        width: wp(100)
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 15,
        width: wp(80),
        marginBottom: 20
    }
});