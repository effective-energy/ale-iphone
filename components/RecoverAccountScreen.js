import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

function validateEmail(email)  {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default class RecoverAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recoverEmail: ''
        };

        this.loginToAccount = this.loginToAccount.bind(this);
        this.sendLink = this.sendLink.bind(this);
    }
    
    static navigationOptions = {
        title: 'Recover account',
    };

    loginToAccount() {
        this.props.navigation.navigate('Login', { animation: null });
    }

    sendLink() {
        if (this.state.recoverEmail === '') {
            return Alert.alert('Enter your E-mail');
        }
        if (validateEmail(this.state.recoverEmail)) {
            return fetch('https://ale-demo-4550.nodechef.com/users/recovery', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.recoverEmail.toLowerCase()
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.message);
            })
            .catch((error) => {
                Alert.alert(error);
            });
        } else {
            Alert.alert('Enter valid E-mail');
        }
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View
                style={{ flex: 1, backgroundColor: '#08142F', alignItems: 'center', justifyContent: 'space-between', paddingTop: 30, paddingBottom: 30 }}
            >
                <StatusBar barStyle='dark-content' />
                <View>
                    <View>
                        <TextInput
                            placeholder="Enter your email"
                            placeholderTextColor="#455578"
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: screenWidth, marginBottom: 20, borderRadius: 2, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                            onChangeText={(recoverEmail) => this.setState({recoverEmail})}
                            value={this.state.recoverEmail}
                        />
                    </View>
                    <View style={{ backgroundColor: '#152038', width: screenWidth, padding: 5, borderRadius: 15 }}>
                        <Button
                            title="Send link to recover"
                            onPress={this.sendLink}
                            color="#ffbb00"
                        />
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#34476f' }}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={this.loginToAccount}
                        style={{ marginLeft: 10 }}
                    >
                        <Text style={{ color: '#ffbb00' }}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});