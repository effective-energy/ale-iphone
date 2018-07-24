import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Image from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class WalletsDropdownMenu extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isMenuOpen: false,
            selectedWallet: {},
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.selectWallet = this.selectWallet.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedWallet: this.props.walletsList[0]
        })
    }

    toggleMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    selectWallet(index) {
        this.setState({
            selectedWallet: this.props.walletsList[index],
            isMenuOpen: false,
        });
        return this.props.changeWallet(index);
    }

    render() {
        let wallets = this.props.walletsList.map(function (el, i) {
            let isActiveWallet = this.props.activeWalletIndex === i ? '#cccccc' : '#c1c4cb';
            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    key={i}
                    style={{ width: wp(80), height: 'auto', backgroundColor: isActiveWallet, paddingLeft: 10, paddingRight: 10, zIndex: 1, display: 'flex', alignItems: 'center', padding: 10 }}
                    onPress={() => this.selectWallet(i)}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: wp(80), marginLeft: 15 }}>
                        <Image
                            source={require('../../assets/images/navigation/bottom/icon_wallet-passive.svg')}
                            style={{width: 40, height: 40, marginRight: 10 }}
                        />
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text>{el.name}</Text>
                            <Text>{el.balance} ALE</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }, this);

        let isMenuOpen = this.state.isMenuOpen === true ? 0 : 1;
        return (
            <TouchableOpacity
                style={{ width: wp(80), height: 50, marginTop: 20, justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: '#cccccc', borderBottomWidth: 2, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', zIndex: 1 }}
                onPress={this.toggleMenu}
            >
                {
                    this.state.isMenuOpen &&
                    <View
                        style={{ width: wp(90), zIndex: 0, position: 'absolute', top: 5 }}
                    >
                        {wallets}
                    </View>
                }
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: isMenuOpen }}>
                    <Image
                        source={require('../../assets/images/navigation/bottom/icon_wallet-passive.svg')}
                        style={{width: 40, height: 40, marginRight: 10 }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text>{this.state.selectedWallet.name}</Text>
                        <Text>{this.state.selectedWallet.balance} ALE</Text>
                    </View>
                </View>
                <Image
                    source={require('../../assets/images/icons/icon_down-arrow.svg')}
                    style={{width: 15, height: 15 }}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({});