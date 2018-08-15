import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import SVGImage from 'react-native-remote-svg';
import ImagePicker from 'react-native-image-picker';

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

function validateEmail(email)  {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            repeatPassword: '',
            avatar: null
        };

        this.backToLoginPage = this.backToLoginPage.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.refreshState = this.refreshState.bind(this);
    }
    
    static navigationOptions = {
        title: 'Create account',
        headerTitleStyle: {
            color: '#ffbb00'
        },
        headerStyle: {
            backgroundColor: '#07132f',
            borderBottomWidth: 0,
        },
        headerTintColor: '#ffbb00',
    };

    componentDidMount() {
        this.refreshState();
    }

    refreshState() {
        this.state.fullName = '';
        this.state.email = '';
        this.state.password = '';
        this.state.repeatPassword = '';
    }

    backToLoginPage() {
        this.props.navigation.navigate('Login');
    }

    async createAccount() {
        try {
            if (this.state.fullName === '') {
                return Alert.alert('Enter your name');
            }
            if (this.state.email === '' || !validateEmail(this.state.email)) {
                return Alert.alert('Enter valid E-mail');
            }
            if (this.state.password.length < 8) {
                return Alert.alert('Minimum password length is 8 characters');
            }
            if (this.state.repeatPassword !== this.state.password) {
                return Alert.alert('Passwords do not match');
            }

            const params = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email.toLowerCase(),
                    name: this.state.fullName,
                    password: this.state.password
                }),
            };

            const response = await fetch(`${Config.SERVER_URL}/users/new`, params);
            if (!response) {
                throw response
            }

            const responseJson = await response.json();
            if (responseJson.message !== 'User already exist!') {
                Alert.alert(responseJson.message);
                this.refreshState();
                return this.props.navigation.push('Login');
            } else {
                Alert.alert(responseJson.message);
            }
        } catch (error) {
            Alert.alert(error)
        }
    }

    uploadAvatar () {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (!response.error && !response.didCancel) {
                this.setState({
                    avatar: response.uri
                });
            } else if (response.error) {
                Alert.alert('Error');
            }
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='light-content' />
                <View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        { this.state.avatar === null ?
                            <TouchableOpacity
                                onPress={this.uploadAvatar.bind(this)}
                                style={{width: 40, height: 40, backgroundColor: '#556B98', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <SVGImage
                                    source={require('../assets/images/icons/plus-avatar-icon.svg')}
                                    style={{width: 20, height: 20}}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={this.uploadAvatar.bind(this)}
                                style={{width: 40, height: 40, backgroundColor: '#556B98', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <SVGImage
                                    source={{uri: this.state.avatar}}
                                    style={{width: 40, height: 40, borderRadius: 5}}
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>
                        }
                        <Text style={{color: '#455578', marginLeft: 10, fontSize: 16}}>
                            Upload photo
                        </Text>
                    </View>
                    <TextInput
                        placeholder="Full name"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.fullName}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repeat password"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        value={this.state.repeatPassword}
                    />
                    <TouchableOpacity
                        style={styles.buttonBlock}
                        onPress={this.createAccount}
                    >
                        <SVGImage
                            source={require('../assets/images/icons/plus-icon.svg')}
                            style={styles.buttonBlock_icon}
                        />
                        <Text
                            style={styles.buttonBlock_text}
                        >
                            Create account
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.buttonBlock}
                    onPress={this.backToLoginPage.bind(this)}
                >
                    <SVGImage
                        source={require('../assets/images/icons/icon_login-icon.svg')}
                        style={styles.buttonBlock_icon}
                    />
                    <Text style={styles.buttonBlock_text}>Log in to account</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#08142F',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    buttonBlock: {
        backgroundColor: '#152038',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'   
    },
    buttonBlock_text: {
        color: '#ffbb00',
        textAlign: 'center',
        fontSize: 16
    },
    buttonBlock_icon: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});