import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import { when } from "mobx";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

@inject("userStore")
@observer
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

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Change password'
        };
    };

    watcher = when(() => this.props.userStore.isUpdatePassword === true, () => {
        this.props.navigation.push('Settings');
    });

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

        this.props.userStore.changePassword({
            old: this.state.oldPassword,
            new: this.state.newPassword
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='dark-content' />
            	<View>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Old password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(oldPassword) => this.setState({oldPassword})}
                        value={this.state.oldPassword}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="New password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        value={this.state.newPassword}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Confirm new password"
                        placeholderTextColor="#717e96"
                        style={styles.textInput}
                        onChangeText={(newPasswordConfirm) => this.setState({newPasswordConfirm})}
                        value={this.state.newPasswordConfirm}
                    />
                    <TouchableOpacity
                        onPress={this.changePassowrd}
                        style={styles.buttonBlock}
                    >
                        <Text
                            style={styles.buttonBlock_text}
                        >
                            Change
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
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    textInput: {
        height: 40,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#717e96',
        borderBottomColor: '#717e96',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
    buttonBlock: {
        backgroundColor: '#d0d8de',
        borderRadius: 10,
        padding: 10,
        width: wp(80),
        marginBottom: 20
    },
    buttonBlock_text: {
        color: "#282f3e",
        textAlign: 'center',
        fontSize: 16
    },
});