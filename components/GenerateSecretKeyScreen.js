import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class GenerateSecretKeyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.goToWallet = this.goToWallet.bind(this);
    }

    goToWallet() {
        return this.props.navigation.navigate('Wallets');
    }
    
    static navigationOptions = {
        title: 'Generate secret key',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
                <Text>Your wallet name: {params.walletName}</Text>
                <Text>Your public key: 1M7NDg</Text>
                <Text>Your private key (save this): rt1retM7Nwerwr</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Go to my wallet"
                        onPress={this.goToWallet}
                        color="#34343e"
                    />
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
    marginTop: 20
  }
});