import React from 'react';
import { StyleSheet, Text, View, Alert, AppRegistry, Button, TextInput } from 'react-native';

export default class RestorewalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { privateKey: '' };
        this.restoreWallet = this.restoreWallet.bind(this);
    }
    
    restoreWallet() {
        if (this.state.privateKey.length === 0) {
            return Alert.alert('Invalid secret key');
        } else {
            return this.props.navigation.navigate('Newwallet')
        }
    }
    static navigationOptions = {
        title: 'Restore wallet',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                <Text>RESTORE WALLET</Text>
                <Text>Enter your private Key</Text>
                <View style={{ width: '90%', height: 150, padding: 16, opacity: 1 }}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 20, borderRadius: 2, padding: 6 }}
                        onChangeText={(privateKey) => this.setState({privateKey})}
                        value={this.state.privateKey}
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Restore"
                            onPress={this.restoreWallet}
                            color="#34343e"
                          />
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