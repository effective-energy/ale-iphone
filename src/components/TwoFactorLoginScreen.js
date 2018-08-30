import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, TextInput, Dimensions, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class TwoFactorAuthScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            twoFactorKey: '',
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Two factor auth',
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#07132f',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    async enterTwoFactorKey () {
        if (isNaN(this.state.twoFactorKey)) {
            return Alert.alert('Enter 6 digits of your secret key')
        }

        const params = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.navigation.state.params.email.toLowerCase(),
                password: this.props.navigation.state.params.password,
                token: this.state.twoFactorKey
            })
        }

        const response = await fetch(`${Config.SERVER_URL}/users/login/2fa`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        if (responseJson.message === 'Auth success') {
            ls.save('userToken', responseJson.user_token).then(() => {
                return this.props.navigation.push('Wallets');
            })
        } else {
            Alert.alert(responseJson.message);
        }
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='light-content' />
                <View>
                    <TextInput
                        selectTextOnFocus={true}
                        placeholder="Enter Two-factor key"
                        placeholderTextColor="#455578"
                        style={styles.textInput}
                        onChangeText={(twoFactorKey) => this.setState({twoFactorKey})}
                        value={this.state.twoFactorKey}
                        keyboardType='numeric'
                        maxLength={6}
                    />
                    <TouchableOpacity
                        onPress={this.enterTwoFactorKey.bind(this)}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonContainer_text}>Enter key</Text>
                    </TouchableOpacity>
                </View>
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
    buttonContainer: {
        backgroundColor: '#152038',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer_text: {
        color: '#ffbb00',
        textAlign: 'center',
        fontSize: 18
    }
});