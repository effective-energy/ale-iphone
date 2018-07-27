import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, Image, ScrollView, RefreshControl, Share, Linking } from 'react-native';
import ImageSVG from 'react-native-remote-svg';

import ls from 'react-native-local-storage';

import Config from '../config';

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
            isLoaderPage: true,
            fullName: '',
            userEmail: '',
            userAvatar: '',
        };

        this.logout = this.logout.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.shareApp = this.shareApp.bind(this);
        this.openInApp = this.openInApp.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: I18n.t('pages.settings.title'),
            headerLeft: null,
            gesturesEnabled: false,
            headerRight:
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditAccount')}
                    style={{marginRight: 20}}
                >
                    <Text style={{ fontSize: 16 }}>Edit</Text>    
                </TouchableOpacity>
        };
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentWillMount() {
        this.getUserData();
    }

    getUserAvatar() {
        return `${Config.SERVER_URL}/${this.state.userAvatar}`;
    }

    async getUserData() {
        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        const params = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        }

        const response = await fetch(`${Config.SERVER_URL}/users/get-user-data`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        await this.setStateAsync({
            isTwoAuthActive: responseJson.isTwoAuth,
            isLoaderPage: false,
            fullName: responseJson.name,
            userEmail: responseJson.email,
            userAvatar: responseJson.avatar,
        });
    }

    logout() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    changePassword() {
        this.props.navigation.navigate('ChangePassword');
    }

    onValueChange() {
        if (this.state.isTwoAuthActive) {
            return this.props.navigation.navigate('TwoFactorAuth', { type: 'disable'});
        } else {
            return this.props.navigation.navigate('TwoFactorAuth', { type: 'enable'});
        }
    }

    changeLanguage() {
        this.props.navigation.navigate('ChangeLanguage');
    }

    shareApp() {
        Share.share({
            message: 'Alehub wallet',
            url: 'https://alehub.io/',
            title: 'Wow, its alehub wallet!'
        }, {
            dialogTitle: 'Share',
            excludedActivityTypes: [
              'com.apple.UIKit.activity.PostToTwitter'
            ]
        })
    }

    openInApp(url, social) {
        if (social === 'twitter') {
            return Linking.openURL('https://www.twitter.com/alehub_io');
        } else if (social === 'telegram') {
            return Linking.openURL('https://www.t.me/alehub');
        } else if (social === 'facebook') {
            return Linking.openURL('https://www.facebook.com/n/alehub.io');
        }
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading user data" />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />

                <ScrollView
                    contentInset={{bottom:80}}
                    automaticallyAdjustContentInsets={false}
                >
                    <View
                        style={{ marginTop: 1, backgroundColor: '#FFFFFF', width: wp(100), padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            { this.state.userAvatar === '' ? <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#CCCCCC', alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: 10}}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{this.state.fullName.substr(0, 2).toUpperCase()}</Text>
                            </View> : <Image
                                style={{ width: 60, height: 60, borderRadius: 30, resizeMode: 'cover', marginBottom: 10 }}
                                source={{uri: this.getUserAvatar()}}
                            />}
                            <View>
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>{this.state.fullName}</Text>
                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.state.userEmail}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(100), backgroundColor: '#ffffff', paddingRight: 15, paddingLeft: 15, paddingTop: 12, paddingBottom: 12 }}>
                        <Text style={styles.listViewTitle}>{I18n.t('pages.settings.two_auth.enable')}</Text>
                        <Switch
                            value={this.state.isTwoAuthActive}
                            tintColor="#cccccc"
                            onValueChange={this.onValueChange}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.listView}
                        onPress={this.changeLanguage}
                    >
                        <Text style={styles.listViewTitle}>{I18n.t('pages.settings.language')}</Text>
                        <ImageSVG
                            source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                            style={styles.listViewImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.listView}
                        onPress={this.changePassword}
                    >
                        <Text style={styles.listViewTitle}>Password</Text>
                        <ImageSVG
                            source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                            style={styles.listViewImage}
                        />
                    </TouchableOpacity>

                    <View style={{ marginTop: 40 }}>
                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: '#666666' }}>{'Join the community'.toUpperCase()}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.listView}
                            onPress={() => this.openInApp('alehub_io', 'twitter')}
                        >
                            <Text style={styles.listViewTitle}>Twitter</Text>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={styles.listViewImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.listView}
                            onPress={() => this.openInApp('alehub', 'telegram')}
                        >
                            <Text style={styles.listViewTitle}>Telegram Chat</Text>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={styles.listViewImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.listView}
                            onPress={() => this.openInApp('alehub.io', 'facebook')}
                        >
                            <Text style={styles.listViewTitle}>Facebook</Text>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={styles.listViewImage}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity
                            style={styles.listView}
                            onPress={this.shareApp}
                        >
                            <Text style={styles.listViewTitle}>Share With Friends</Text>
                        </TouchableOpacity>
                    </View>

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
                </ScrollView>
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
    },
    listView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: wp(100),
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 1
    },
    listViewTitle: {
        fontSize: wp(5),
        color: '#34343e'
    },
    listViewImage: {
        width: 15,
        height: 15
    }
});