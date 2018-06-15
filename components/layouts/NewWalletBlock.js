import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default class NewWalletBlock extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    createNewWallet() {
        Alert.alert('Loading...')
    }

    render() {
    	return (
    		<TouchableOpacity
                style={styles.blockContainer}
                onPress={this.createNewWallet}
            >
                <Text
                    style={styles.blockText}
                >
                    Create or restore wallet
                </Text>
            </TouchableOpacity>
    	)
    }
}

const styles = StyleSheet.create({
    blockContainer: {
        backgroundColor: '#16203a',
        width: 300,
        marginTop: 30,
        borderRadius: 10,
        padding: 15,
        marginLeft: 40
    },
    blockText: {
        color: '#f0b721',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});