import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';

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
            repeatPassword: ''
        };

        this.backToLoginPage = this.backToLoginPage.bind(this);
        this.createAccount = this.createAccount.bind(this);
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

    backToLoginPage() {
        this.props.navigation.navigate('Login');
    }

    async createAccount() {
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

    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='light-content' />
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        placeholder="Full name"
                        placeholderTextColor="#455578"
                        style={styles.input_text}
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.fullName}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#455578"
                        style={styles.input_text}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#455578"
                        style={styles.input_text}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Repeat password"
                        placeholderTextColor="#455578"
                        style={styles.input_text}
                        onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        value={this.state.repeatPassword}
                    />
                </View>

                <TouchableOpacity
                    style={{ backgroundColor: '#152038', width: wp(80), padding: 15, borderRadius: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.createAccount}
                >
                    <Text style={{ color: '#ffbb00', textAlign: 'center', fontSize: 16 }}>Create account</Text>
                </TouchableOpacity>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#34476f' }}>Already have an account?</Text>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={this.backToLoginPage}
                    >
                        <Text style={{ color: '#ffbb00' }}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#07132f',
        alignItems: 'center'
    },
    input_text: {
        height: 40,
        borderWidth: 1,
        width: wp(80),
        marginBottom: 30,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    }
});