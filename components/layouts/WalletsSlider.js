import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Platform, Alert, Image, TouchableHighlight, TouchableOpacity, AlertIOS } from 'react-native';
import SVGImage from 'react-native-remote-svg';
import ls from 'react-native-local-storage';

import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const sliderWidth = viewportWidth;

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWalletAddressForRename: ''
        };

        this.editWalletName = this.editWalletName.bind(this);
    }

    editWalletName(walletName) {
        this.setState({ selectedWalletAddressForRename: walletName})
        AlertIOS.prompt(
            'Change wallet name',
            'Enter new name for wallet',
            [{
                text: 'Cancel',
                onPress: () => this.cancelRenameWallet,
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: (newWalletName) => this.renameWallet(newWalletName),
            }],
          'plain-text'
        );
    }

    cancelRenameWallet() {
        this.setState({selectedWalletAddressForRename: ''})
    }

    renameWallet(newWalletName) {
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/rename', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    walletAddress: this.state.selectedWalletAddressForRename,
                    newWalletName: newWalletName
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    selectedWalletAddressForRename: ''
                });
                Alert.alert(responseJson.message)
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    _renderItem ({item}) {
        return (
            <View style={{ backgroundColor: '#e7ebee', padding: 20, borderRadius: 6, height: 150 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ backgroundColor: 'transparent', color: '#091628', fontSize: 18, textAlign: 'left' }}>{ item.name }</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <Text style={{ color: '#091628', fontSize: 24 }}>{item.balance}</Text>
                            <SVGImage
                                style={{width: wp(5), height: wp(5), paddingLeft: 5 }}
                                source={require('../../assets/images/icons/icon_ale-icon.svg')}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableHighlight onPress={(e) => this.editWalletName(item.address)}>
                            <SVGImage
                                style={{width: wp(8), height: wp(8)}}
                                source={require('../../assets/images/icons/icon_edit-wallet.svg')}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '45%' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#091628', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center' }}
                            onPress={e => this.props.sendMoney(item.address)}
                        >
                            <SVGImage
                                style={{width: wp(5), height: wp(5), marginRight: 10 }}
                                source={require('../../assets/images/icons/icon_send.svg')}
                            />
                            <Text style={{ color: '#ffffff', fontSize: wp(5) }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '45%' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#FFBB00', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center' }}
                            onPress={e => this.props.requestMoney(item.address)}
                        >
                            <SVGImage
                                style={{width: wp(5), height: wp(5), marginRight: 5 }}
                                source={require('../../assets/images/icons/icon_request.svg')}
                            />
                            <Text style={{ color: '#000000', fontSize: wp(5) }}>Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    layout={'default'}
                    loop={false}
                    layoutCardOffset={50}
                    hasParallaxImages={true}
                    containerCustomStyle={{ marginTop: 20, overflow: 'visible' }}
                    data={this.props.walletsList}
                    renderItem={item => this._renderItem(item)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc'
    },
    sliderRow: {
        backgroundColor: '#cccccc',
        height: 170
    },
    sliderWalletBlock: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    sliderWalletBlock_name: {
        fontSize: 20,
        marginBottom: 10
    },
    sliderWalletBlock_actions: {
        flex: 1,
        flexDirection: 'row'
    }
});