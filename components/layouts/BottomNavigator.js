import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Image from 'react-native-remote-svg';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {
            activeClass: this.props.activePage,
            tabs: [
                { title: 'Wallet', image: require('../../assets/images/navigation/bottom/icon_wallet-passive.svg'), pageName: 'Wallets', activeClass: 'wallets' },
                { title: 'History', image: require('../../assets/images/navigation/bottom/icon_history-passive.svg'), pageName: 'Wallets', activeClass: 'send' },
                { title: 'Notifications', image: require('../../assets/images/navigation/bottom/icon_notifications-passive.svg'), pageName: 'Wallets', activeClass: 'receive' },
                { title: 'Settings', image: require('../../assets/images/navigation/bottom/icon_settings-passive.svg'), pageName: 'Settings', activeClass: 'settings' }
            ]
        };
    }

    render() {
        let navigations = this.state.tabs.map(function (el, i) {
            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.navigationItem, styles.navigationItemDefault]}
                    onPress={e => this.props.changePage(el.pageName)}
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
        width: 40,
        height: 40,
        marginTop: 2,
        marginBottom: 2
    },
    itemText: {
        color: '#000000',
        textAlign: 'center',
        position: 'relative',
        bottom: 2
    }
});