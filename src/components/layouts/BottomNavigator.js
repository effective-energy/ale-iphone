import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import SVGImage from 'react-native-remote-svg';
import isIphoneX from '../../config/isIphoneX';

export default class BottomNavigator extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {
            activeClass: this.props.activePage,
            tabs: [
                {
                    icon: require('../../assets/images/navigation/bottom/icon_wallet-passive.svg'),
                    activeIcon: require('../../assets/images/navigation/bottom/icon_wallet-active.svg'),
                    pageName: 'Wallets',
                    activeClass: 'wallets'
                }, {
                    icon: require('../../assets/images/navigation/bottom/icon_history-passive.svg'),
                    activeIcon: require('../../assets/images/navigation/bottom/icon_history-active.svg'),
                    pageName: 'History',
                    activeClass: 'history'
                }, {
                    icon: require('../../assets/images/navigation/bottom/icon_notifications-passive.svg'),
                    activeIcon: require('../../assets/images/navigation/bottom/icon_notifications-active.svg'),
                    pageName: 'Notifications',
                    activeClass: 'notifications'
                }, {
                    icon: require('../../assets/images/navigation/bottom/icon_settings-passive.svg'),
                    activeIcon: require('../../assets/images/navigation/bottom/icon_settings-active.svg'),
                    pageName: 'Settings',
                    activeClass: 'settings'
                }
            ]
        };
    }

    render() {
        let navigations = this.state.tabs.map(function (el, i) {
            let icon = this.state.activeClass === el.activeClass ? el.activeIcon : el.icon;
            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    key={i}
                    style={[styles.navigationItem]}
                    onPress={e => this.props.changePage(el.pageName)}
                >
                    <SVGImage
                        style={styles.itemImage}
                        source={icon}
                    />
                    <Text style={[styles.itemTitle, this.state.activeClass === el.activeClass ? styles.itemTitleActive : styles.itemTitleDefault]}>
                        {el.pageName}
                    </Text>
                </TouchableOpacity>
            )
        }, this);

    	return (
    		<View style={styles.navigationContainer}>
                {navigations}
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        width: '100%',
        height: isIphoneX === true ? 94 : 60,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        borderTopColor: '#e8ebee',
        borderTopWidth: 2,
        backgroundColor: '#ffffff',
    },
    navigationItem: {
        width: '25%',
        height: 60,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
    },
    itemImage: {
        width: 30,
        height: 30
    },
    itemTitle: {
        textAlign: 'center',
        position: 'relative',
        bottom: 2,
        fontSize: 12
    },
    itemTitleActive: {
        color: '#FFBB00'
    },
    itemTitleDefault: {
        color: '#000000'
    }
});