import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }
    render() {
    	return (
    		<View
                style={styles.navigationContainer}
            >
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={e => this.props.onPress('Wallets')}
                >
                    <Image
                        style={styles.itemImage}
                        source={require('../../assets/images/navigation/bottom/wallet.png')}
                    />
                    <Text
                        style={styles.itemText}
                    >
                        Wallets
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={e => this.props.onPress('SendTokens')}
                >
                    <Image
                        style={styles.itemImage}
                        source={require('../../assets/images/navigation/bottom/send.png')}
                    />
                    <Text
                        style={styles.itemText}
                    >
                        Send
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={e => this.props.onPress('ReceiveTokens')}
                >
                    <Image
                        style={styles.itemImage}
                        source={require('../../assets/images/navigation/bottom/receive.png')}
                    />
                    <Text
                        style={styles.itemText}
                    >
                        Receive
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={e => this.props.onPress('Settings')}
                >
                    <Image
                        style={styles.itemImage}
                        source={require('../../assets/images/navigation/bottom/settings.png')}
                    />
                    <Text
                        style={styles.itemText}
                    >
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1
    },
    navigationItem: {
        width: '25%',
        height: 60,
        backgroundColor: '#cccccc',
        flex: 1,
        flexDirection: 'column',
        maxHeight: 60,
        alignItems: 'center'
    },
    itemImage: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginBottom: 5
    },
    itemText: {
        color: '#000000',
        textAlign: 'center'
    }
});