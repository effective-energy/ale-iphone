import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Image from 'react-native-remote-svg';

export default class NewWalletBlock extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<TouchableOpacity
                style={styles.blockContainer}
                onPress={this.props.createNewWallet}
            >
                <Image
                    style={{width: 25, height: 25, marginRight: 10}}
                    source={require('../../assets/images/icons/icon_new-wallet.svg')}
                />
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
        marginLeft: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockText: {
        color: '#f0b721',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});