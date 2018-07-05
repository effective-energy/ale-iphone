import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
        };

        this.changePassowrd = this.changePassowrd.bind(this);
    }
    
    static navigationOptions = {
        title: 'Change password'
    };

    changePassowrd() {
        if (this.state.oldPassword === '') {
            return Alert.alert('Enter current password');
        }

        if (this.state.newPassword === '') {
            return Alert.alert('Enter new password');
        }

        if (this.state.newPasswordConfirm === '') {
            return Alert.alert('Confirm new password');
        }

        if (this.state.newPasswordConfirm !== this.state.newPassword) {
            return Alert.alert('New passwords do not match');
        }

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/change-password', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data,
                },
                body: JSON.stringify({
                    old: this.state.oldPassword,
                    new: this.state.newPassword
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'Password update') {
                    Alert.alert(responseJson.message);
                    return this.props.navigation.push('Settings');
                } else {
                    Alert.alert(responseJson.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='dark-content' />
            	<View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                    <TextInput
                        placeholder="Old password"
                        placeholderTextColor="#000000"
                        style={{height: 40, width: wp(80), marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                        onChangeText={(oldPassword) => this.setState({oldPassword})}
                        value={this.state.oldPassword}
                    />
                    <TextInput
                        placeholder="New password"
                        placeholderTextColor="#000000"
                        style={{height: 40, width: wp(80), marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        value={this.state.newPassword}
                    />
                    <TextInput
                        placeholder="Confirm new password"
                        placeholderTextColor="#000000"
                        style={{height: 40, width: wp(80), marginBottom: 20, padding: 6, color: '#000000', borderBottomColor: '#000000', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                        onChangeText={(newPasswordConfirm) => this.setState({newPasswordConfirm})}
                        value={this.state.newPasswordConfirm}
                    />
                    <TouchableOpacity
                        onPress={this.changePassowrd}
                        style={{ backgroundColor: '#ffd24f', borderRadius: 4, padding: 15, width: wp(80), marginBottom: 20 }}
                    >
                        <Text
                            style={{ color: "#34343e", textAlign: 'center', fontSize: wp(5) }}
                        >
                            Change password
                        </Text>
                    </TouchableOpacity>
                </View>
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