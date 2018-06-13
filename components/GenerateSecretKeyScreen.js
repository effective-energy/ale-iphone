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
        title: 'Secret key',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#ffffff' }}>
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{ textAlign: 'center'}}>Your public key 1EebMBCpPhNHsBopZaa8YfPHEoPkM3azMr</Text>
                    <Text style={{ textAlign: 'center'}}>Your private key KzQ4Jt4quF6aenyC2hW9Fq5B7bbZrCFfhCJUziojTqc9qzT9FYuw</Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Go to my wallet"
                            onPress={this.goToWallet}
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
    marginTop: 20
  }
});