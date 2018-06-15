import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {
            activeClass: this.props.activePage,
            tabs: [
                { title: 'Wallet', image: require('../../assets/images/navigation/bottom/wallet.png'), pageName: 'Wallets', activeClass: 'wallets' },
                { title: 'Send', image: require('../../assets/images/navigation/bottom/send.png'), pageName: 'SendTokens', activeClass: 'send' },
                { title: 'Receive', image: require('../../assets/images/navigation/bottom/receive.png'), pageName: 'ReceiveTokens', activeClass: 'receive' },
                { title: 'Settings', image: require('../../assets/images/navigation/bottom/settings.png'), pageName: 'Settings', activeClass: 'settings' }
            ]
        };
    }

    render() {
        let navigations = this.state.tabs.map(function (el, i) {
            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.navigationItem, this.state.activeClass === el.activeClass ? styles.navigationItemActive : styles.navigationItemDefault]}
                    onPress={e => this.props.onPress(el.pageName)}
                >
                    <Image
                        style={styles.itemImage}
                        source={el.image}
                    />
                    <Text
                        style={styles.itemText}
                    >
                        {el.title}
                    </Text>
                </TouchableOpacity>
            )
        }, this);

    	return (
    		<View
                style={styles.navigationContainer}
            >
                {navigations}
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
        flex: 1,
        flexDirection: 'column',
        maxHeight: 60,
        alignItems: 'center'
    },
    navigationItemActive: {
        backgroundColor: '#cccccc',
    },
    navigationItemDefault: {
        backgroundColor: '#ffffff',
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