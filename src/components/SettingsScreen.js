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
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: I18n.t('pages.settings.title'),
            headerLeft: null,
            gesturesEnabled: false,
            headerRight: params.isLoaderPage === true ? null :
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

    componentDidMount() {
        this.props.navigation.setParams({ isLoaderPage: true });
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
        this.props.navigation.setParams({ isLoaderPage: false });
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

                    <View
                        style={[styles.listView, {marginTop: 40}]}
                    >
                        <View
                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={{width: 30, height: 30, backgroundColor: '#2196F3', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <ImageSVG
                                    source={require('../assets/images/icons/up-down-arrow-icon.svg')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Two-factor auth
                            </Text>
                        </View>
                        <Switch
                            value={this.state.isTwoAuthActive}
                            tintColor="#cccccc"
                            onValueChange={this.onValueChange.bind(this)}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={this.changeLanguage.bind(this)}
                        style={styles.listView}
                    >
                        <View
                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={{width: 30, height: 30, backgroundColor: '#4CAF50', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <ImageSVG
                                    source={require('../assets/images/icons/globe-icon.svg')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Language
                            </Text>
                        </View>
                        <ImageSVG
                            source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                            style={{width: 15, height: 15}}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.changePassword.bind(this)}
                        style={styles.listView}
                    >
                        <View
                            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={{width: 30, height: 30, backgroundColor: '#F44336', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <ImageSVG
                                    source={require('../assets/images/icons/security-icon.svg')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Password
                            </Text>
                        </View>
                        <ImageSVG
                            source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                            style={{width: 15, height: 15}}
                        />
                    </TouchableOpacity>

                    <View style={{ marginTop: 40 }}>
                        <View style={{ marginLeft: 20, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: '#666666' }}>{'Join the community'.toUpperCase()}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.openInApp('alehub_io', 'twitter')}
                            style={styles.listView}
                        >
                            <View
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                            >
                                <View
                                    style={{width: 30, height: 30, backgroundColor: '#00ACED', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                >
                                    <ImageSVG
                                        source={require('../assets/images/icons/twitter-icon.svg')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Twitter
                                </Text>
                            </View>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openInApp('alehub', 'telegram')}
                            style={styles.listView}
                        >
                            <View
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                            >
                                <View
                                    style={{width: 30, height: 30, backgroundColor: '#0088CC', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                >
                                    <ImageSVG
                                        source={require('../assets/images/icons/telegram-icon.svg')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Telegram Chat
                                </Text>
                            </View>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.openInApp('alehub.io', 'facebook')}
                            style={styles.listView}
                        >
                            <View
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                            >
                                <View
                                    style={{width: 30, height: 30, backgroundColor: '#3B5998', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                >
                                    <ImageSVG
                                        source={require('../assets/images/icons/facebook-icon.svg')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Facebook
                                </Text>
                            </View>
                            <ImageSVG
                                source={require('../assets/images/icons/icon_small-arrow-right.svg')}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity
                            onPress={this.shareApp.bind(this)}
                            style={styles.listView}
                        >
                            <View
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                            >
                                <View
                                    style={{width: 30, height: 30, backgroundColor: '#E91E63', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                >
                                    <ImageSVG
                                        source={require('../assets/images/icons/share-icon.svg')}
                                        style={{width: 15, height: 15}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Share With Friends
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={this.logout.bind(this)}
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
                    changePage={this.changePage.bind(this)}
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
        marginTop: 1,
        height: 50
    },
    listViewContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: wp(100),
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 1,
        height: 50
    },
    listViewRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    listViewIconBlock: {
        width: 30,
        height: 30,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listViewIconBlock_image: {
        width: 15,
        height: 15
    },
    listViewIconBlock_text: {
        fontSize: 18, 
        color: '#34343e',
        marginLeft: 10
    },
    listViewArrow: {
        width: 15,
        height: 15
    }
});