import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Platform, StatusBar } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import userWallets from '../../wallets/MyWallets.json';

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
            wallets: userWallets.wallets
        };
    }

    sendTokens() {

    }

    receiveTokens() {

    }

    _renderItem ({item}) {
        return (
            <View style={{ backgroundColor: '#e7ebee', padding: 20, borderRadius: 6, height: 150 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ backgroundColor: 'transparent', color: '#091628', fontSize: 18, textAlign: 'left' }}>{ item.title }</Text>
                    <Text style={{ textAlign: 'left', color: '#091628', fontSize: 24 }}>{item.balance} ALE</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '45%' }}>
                        <View style={{ backgroundColor: '#091628', borderRadius: 10 }}>
                            <Button title="Send" color="#ffffff" onPress={this.sendTokens} />
                        </View>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={{ backgroundColor: '#091628', borderRadius: 10 }}>
                            <Button title="Receive" color="#ffffff" onPress={this.receiveTokens} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <StatusBar barStyle='light-content' />
                <Carousel
                    ref={c => this._slider1Ref = c}
                    layout={'default'}
                    loop={true}
                    layoutCardOffset={50}
                    hasParallaxImages={true}
                    containerCustomStyle={{ marginTop: 50, overflow: 'visible' }}
                    data={[{
                        title: 'Wallet 1',
                        balance: '9.999,00'
                    }, {
                        title: 'Wallet 2',
                        balance: '10.999,00'
                    }]}
                    renderItem={this._renderItem}
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