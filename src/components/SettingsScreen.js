import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, Image, ScrollView, RefreshControl, Share, Linking, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import isIphoneX from '../config/isIphoneX';
import Spinner from './layouts/Spinner';
import { CachedImage } from "react-native-img-cache";

import ls from 'react-native-local-storage';

import Config from '../config';

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
            isOpenAvatarModal: false,
            isShowSpinner: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Settings',
            headerLeft: null,
            gesturesEnabled: false
        };
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount() {
        this.getUserData();
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
            return Linking.openURL('https://www.facebook.com/alehub.io');
        }
    }

    uploadAvatar () {
    let options = {};

        if (this.state.userAvatar === '') {
            options = {
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
            };
        } else {
            options = {
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                },
                customButtons: [{
                    name: 'viewavatar',
                    title: 'View avatar'
                }],
            }
        }

        ImagePicker.showImagePicker(options, (response) => {
            if (response.customButton === 'viewavatar') {
                return this.setState({
                    isOpenAvatarModal: true
                });
            } else if (!response.error && !response.didCancel) {
                return this.loadAvatarToServer(response.uri);
            } else if (response.error) {
                return Alert.alert(response.error);
            }
        });
    }

    async loadAvatarToServer (avatar) {
        this.setState({
            isShowSpinner: true,
        });
        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        let fd = new FormData();
        fd.append('avatar', {
            uri: avatar,
            type: 'image/jpeg',
            name: 'photo.jpg'
        });

        const params = {
            method: 'POST',
            headers: {
                'Authorization': userToken
            },
            body: fd
        }

        const response = await fetch(`${Config.SERVER_URL}/users/set_avatar`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        Alert.alert(responseJson.message);

        this.setState({
            userAvatar: responseJson.avatar_path,
            isShowSpinner: false,
        });
    }

    closeAvatarModal () {
        this.setState({
            isOpenAvatarModal: false
        });
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading user data" />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                { this.state.isShowSpinner === true && <Spinner isBorder={true} />}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isOpenAvatarModal}
                >
                    <View style={{flex: 1, backgroundColor: '#e8ebee', alignItems: 'center', justifyContent: 'center'}}>
                        <CachedImage
                            source={{uri: `${Config.SERVER_URL}/${this.state.userAvatar}`}}
                            style={{ width: wp(80), height: wp(80)}}
                        />
                        <TouchableOpacity style={{marginTop: 20}} onPress={this.closeAvatarModal.bind(this)}>
                            <Text style={{fontSize: 20}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <ScrollView
                    contentInset={{bottom: isIphoneX === true ? 104 : 80}}
                    automaticallyAdjustContentInsets={false}
                >
                    <View
                        style={{ marginTop: 1, backgroundColor: '#FFFFFF', width: wp(100), padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            { this.state.userAvatar === '' ? <TouchableOpacity onPress={this.uploadAvatar.bind(this)} style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#CCCCCC', alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: 10}}>
                                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>{this.state.fullName.substr(0, 2).toUpperCase()}</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={this.uploadAvatar.bind(this)} style={{width: 60, height: 60, borderRadius: 30}}>
                                <CachedImage
                                    source={{uri: `${Config.SERVER_URL}/${this.state.userAvatar}`}}
                                    style={{ width: 60, height: 60, borderRadius: 30, resizeMode: 'cover', marginBottom: 10 }}
                                />
                            </TouchableOpacity>}
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
                                <CachedImage
                                    source={require('../assets/images/icons/twoauth.png')}
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
                                <CachedImage
                                    source={require('../assets/images/icons/globe.png')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Language
                            </Text>
                        </View>
                        <CachedImage
                            source={require('../assets/images/icons/arrow-right.png')}
                            style={{width: 15, height: 15}}
                            resizeMode='contain'
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
                                <CachedImage
                                    source={require('../assets/images/icons/password.png')}
                                    style={{width: 20, height: 20}}
                                />
                            </View>
                            <Text
                                style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                            >
                                Password
                            </Text>
                        </View>
                        <CachedImage
                            source={require('../assets/images/icons/arrow-right.png')}
                            style={{width: 15, height: 15}}
                            resizeMode='contain'
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
                                    <CachedImage
                                        source={require('../assets/images/icons/twitter.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Twitter
                                </Text>
                            </View>
                            <CachedImage
                                source={require('../assets/images/icons/arrow-right.png')}
                                style={{width: 15, height: 15}}
                                resizeMode='contain'
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
                                    <CachedImage
                                        source={require('../assets/images/icons/telegram.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Telegram
                                </Text>
                            </View>
                            <CachedImage
                                source={require('../assets/images/icons/arrow-right.png')}
                                style={{width: 15, height: 15}}
                                resizeMode='contain'
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
                                    <CachedImage
                                        source={require('../assets/images/icons/facebook.png')}
                                        style={{width: 20, height: 20}}
                                    />
                                </View>
                                <Text
                                    style={{fontSize: 18, color: '#34343e', marginLeft: 10}}
                                >
                                    Facebook
                                </Text>
                            </View>
                            <CachedImage
                                source={require('../assets/images/icons/arrow-right.png')}
                                style={{width: 15, height: 15}}
                                resizeMode='contain'
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
                                    <CachedImage
                                        source={require('../assets/images/icons/share.png')}
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
                                Sign out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage.bind(this)}
                    activePage="Settings"
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
        padding: 10,
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