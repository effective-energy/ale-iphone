import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, Image } from 'react-native';
import ImageSVG from 'react-native-remote-svg';

import ls from 'react-native-local-storage';

// I18n 
import I18n from '../i18n/index';

import BottomNavigator from './layouts/BottomNavigator';
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
            isTwoAuthActive: false,
            isLoaderPage: false,
            fullName: '',
            userEmail: '',
            userAvatar: '',
        };

        this.logout = this.logout.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: I18n.t('pages.settings.title'),
            headerLeft: null,
            gesturesEnabled: false,
        };
    };

    componentWillMount() {
        this.getUserData();
    }x

    getUserAvatar() {
        return `https://ale-demo-4550.nodechef.com/${this.state.userAvatar}`;
    }

    getUserData() {
        this.setState({ isLoaderPage: true });
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
                return this.setState({
                    isTwoAuthActive: responseJson.isTwoAuth,
                    isLoaderPage: false,
                    fullName: responseJson.name,
                    userEmail: responseJson.email,
                    userAvatar: responseJson.avatar,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    logout() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    changePassword() {
        this.props.navigation.navigate('ChangePassword');
    }

    onValueChange() {
        if (this.state.isTwoAuthActive) {
            return this.props.navigation.navigate('TwoFactorAuth', { animation: null, type: 'disable'});
        } else {
            return this.props.navigation.navigate('TwoFactorAuth', { animation: null, type: 'enable'});
        }
    }

    changeLanguage() {
        this.props.navigation.navigate('ChangeLanguage');
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading user data" />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />

                <TouchableOpacity
                    style={{ marginTop: 1, backgroundColor: '#FFFFFF', height: 110, width: wp(100), padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{ width: 60, height: 60, borderRadius: 30, resizeMode: 'contain' }}
                            source={{uri: this.getUserAvatar()}}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 24 }}>{this.state.fullName}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.userEmail}</Text>
                        </View>
                    </View>
                    <ImageSVG
                        source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                        style={{width: 15, height: 15}}
                    />
                </TouchableOpacity>

                <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(100), backgroundColor: '#ffffff', paddingRight: 15, paddingLeft: 15, paddingTop: 12, paddingBottom: 12 }}>
                    <Text style={{ fontSize: wp(5), color: '#34343e' }}>{I18n.t('pages.settings.two_auth.enable')}</Text>
                    <Switch
                        value={this.state.isTwoAuthActive}
                        tintColor="#cccccc"
                        onValueChange={this.onValueChange}
                    />
                </View>

                <TouchableOpacity
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 1 }}
                    onPress={this.changeLanguage}
                >
                    <Text style={{ fontSize: wp(5), color: '#34343e' }}>{I18n.t('pages.settings.language')}</Text>
                    <ImageSVG
                        source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                        style={{ width: 15, height: 15 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 1 }}
                    onPress={this.changePassword}
                >
                    <Text style={{ fontSize: wp(5), color: '#34343e' }}>Password</Text>
                    <ImageSVG
                        source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                        style={{width: 15, height: 15}}
                    />
                </TouchableOpacity>

                <View style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={this.logout}
                    >
                        <Text
                            style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}
                        >
                            {I18n.t('pages.settings.signOut')}
                        </Text>
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