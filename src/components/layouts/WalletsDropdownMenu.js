import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import SVGImage from 'react-native-remote-svg';

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

    componentWillMount() {
        this.setState({
            selectedWallet: this.props.walletsList[Number(this.props.activeWalletIndex)]
        })
    }

    toggleMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    selectWallet(index) {
        if (this.props.walletsList[index]._id === this.state.selectedWallet._id) {
            return this.setState({
                isMenuOpen: false,
            });
        }
        this.setState({
            selectedWallet: this.props.walletsList[index],
            isMenuOpen: false,
        });
        this.props.changeWallet(index);
    }

    render() {
        let wallets = this.props.walletsList.map(function (el, i) {
            let isShowCloseIcon = i === 0 ? 1 : 0;
            let isFirstWalelt = i !== 0 ? {marginTop: 10} : null;
            let isLastWallet = el._id === this.props.walletsList.slice(-1)[0]._id ? null : {borderBottomWidth: 1, borderBottomColor: '#D1D8DD', paddingBottom: 8};
            return (
                <View
                    key={i}
                    style={[{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#D1D8DD'}, isFirstWalelt, isLastWallet]}
                >
                    <TouchableOpacity
                        onPress={() => this.selectWallet(i)}
                        style={{display: 'flex', flexDirection: 'row'}}
                    >
                        <SVGImage
                            source={require('../../assets/images/navigation/bottom/wallet.png')}
                            style={{width: 40, height: 40, marginRight: 10 }}
                        />
                        <View>
                            <Text style={{fontSize: 14}}>{el.name}</Text>
                            <Text style={{fontSize: 18}}>{el.balance}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({isMenuOpen: false})}
                        style={{opacity: isShowCloseIcon}}
                    >
                        <SVGImage
                            source={require('../../assets/images/icons/close-icon.svg')}
                            style={{width: 35, height: 35}}
                        />
                    </TouchableOpacity>
                </View>
            )
        }, this);
        if (this.state.isMenuOpen) {
            return (
                <View
                    style={{width: wp(80), backgroundColor: '#FFFFFF', borderRadius: 8, Height: 200, marginTop: 20, padding: 10}}
                >
                    {wallets}
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    style={{ width: wp(80), height: 50, marginTop: 20, justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: '#BAC0CF', borderBottomWidth: 1, borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                    onPress={this.toggleMenu}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <SVGImage
                            source={require('../../assets/images/navigation/bottom/wallet.png')}
                            style={{width: 40, height: 40, marginRight: 10 }}
                        />
                        <View style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text>{this.state.selectedWallet.name}</Text>
                            <Text>{this.state.selectedWallet.balance} ALE</Text>
                        </View>
                    </View>
                    <SVGImage
                        source={require('../../assets/images/icons/icon_down-arrow.svg')}
                        style={{width: 15, height: 15 }}
                    />
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({

});