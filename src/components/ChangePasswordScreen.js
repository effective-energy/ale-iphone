import React from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, Dimensions, TouchableOpacity } from 'react-native';

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
    }
    
    static navigationOptions = {
        title: 'Change password'
    };

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
                    <TouchableOpacity style={{ backgroundColor: '#ffd24f', borderRadius: 4, padding: 15, width: wp(80), marginBottom: 20 }}>
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