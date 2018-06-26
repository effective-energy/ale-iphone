import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert } from 'react-native';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class RecoveryPhraseScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
	    	isNobodyLooks: false
	    };

	    this.generateMnemonicPhrase = this.generateMnemonicPhrase.bind(this);
    }
    
    static navigationOptions = {
        title: "Recovery Phrase"
    };

    generateMnemonicPhrase() {

    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View>
                    <Text style={{ textAlign: 'center' }}>
                    	On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet’s funds and private key.
                    </Text>
                    <View
                    	style={{ backgroundColor: '#d1d8dd', width: wp(80), padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 20 }}
                    >
                        <Button
                        	onPress={this.generateMnemonicPhrase}
                            title="Continue"
                            color="#000000"
                        />
                    </View>
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
        width: wp(100),
        padding: 20
    }
});