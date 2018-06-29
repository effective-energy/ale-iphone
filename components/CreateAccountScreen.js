import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TextInput, Dimensions, TouchableOpacity } from 'react-native';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

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
    }
    
    static navigationOptions = {
        title: 'Create account',
        headerTitleStyle: {
            color: '#ffbb00'
        },
        headerStyle: {
            backgroundColor: '#07132f'
        },
        headerTintColor: '#ffbb00',
    };

    backToLoginPage() {
        this.props.navigation.navigate('Login', { animation: null });
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
                        style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 30, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                        onChangeText={(fullName) => this.setState({fullName})}
                        value={this.state.fullName}
                    />
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#455578"
                        style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 30, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#455578"
                        style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 30, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <TextInput
                        placeholder="Repeat password"
                        placeholderTextColor="#455578"
                        style={{height: 40, borderWidth: 1, width: wp(80), marginBottom: 30, padding: 6, color: '#455578', borderBottomColor: '#455578', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', fontSize: 16 }}
                        onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                        value={this.state.repeatPassword}
                    />
                </View>

                <TouchableOpacity
                    style={{ backgroundColor: '#152038', width: wp(80), padding: 15, borderRadius: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
});