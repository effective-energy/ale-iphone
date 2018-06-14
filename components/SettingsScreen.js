import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

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
        gesturesEnabled: false
    };

    logout() {
        return this.props.navigation.navigate('Login');
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={I18n.t('settingsPage.logout')}
                            onPress={this.logout}
                            color="#34343e"
                         />
                    </View>
                </View>
                <BottomNavigator
                    onPress={this.changePage}
                    activePage="settings"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 10,
        width: 300,
        marginBottom: 20
    }
});