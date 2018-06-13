import React from 'react';
import { StyleSheet, Text, View, Alert, AppRegistry, Button, TextInput } from 'react-native';

export default class NewwalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            walletName: ''
        };
        this.restoreWallet = this.restoreWallet.bind(this);
    }
    restoreWallet() {
        if (this.state.walletName.length === 0) {
            return Alert.alert('Enter wallet name');
        } else {
            return this.props.navigation.navigate('GenerateSecretKey', { walletName: this.state.walletName })
        }
    }
    static navigationOptions = {
        title: 'New wallet',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#ffffff' }}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{fontSize: 20, textAlign: 'center' }}>Create new wallet</Text>
                    <Text style={{ textAlign: 'center' }}>Enter wallet name</Text>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 20, borderRadius: 2, padding: 6 }}
                            onChangeText={(walletName) => this.setState({walletName})}
                            value={this.state.walletName}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Next"
                                onPress={this.restoreWallet}
                                color="#34343e"
                              />
                          </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffd24f',
    borderRadius: 4,
    padding: 10,
    width: 300,
    marginBottom: 20
  }
});