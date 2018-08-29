import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Image from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class NewWalletBlock extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
            <View style={{ display: 'flex', alignItems: 'center' }}>
        		<TouchableOpacity
                    style={styles.blockContainer}
                    onPress={this.props.createNewWallet}
                >
                    <Image
                        style={styles.blockIcon}
                        source={require('../../assets/images/icons/icon_new-wallet.svg')}
                    />
                    <Text
                        style={styles.blockText}
                    >
                        Create or restore wallet
                    </Text>
                </TouchableOpacity>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    blockContainer: {
        backgroundColor: '#16203a',
        width: screenWidth,
        marginTop: 30,
        borderRadius: 10,
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockText: {
        color: '#f0b721',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    blockIcon: {
        width: 25,
        height: 25,
        marginRight: 10
    }
});