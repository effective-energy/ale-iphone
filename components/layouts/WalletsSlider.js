import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Platform, Alert } from 'react-native';

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
        this.state = {};
    }

    _renderItem ({item}) {
        return (
            <View style={{ backgroundColor: '#e7ebee', padding: 20, borderRadius: 6, height: 150 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ backgroundColor: 'transparent', color: '#091628', fontSize: 18, textAlign: 'left' }}>{ item.name }</Text>
                    <Text style={{ textAlign: 'left', color: '#091628', fontSize: 24 }}>{item.balance} ALE</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '45%' }}>
                        <View style={{ backgroundColor: '#091628', borderRadius: 10 }}>
                            <Button
                                title="Send"
                                color="#ffffff"
                                onPress={e => this.props.sendMoney(item.address)}
                            />
                        </View>
                    </View>
                    <View style={{ width: '45%' }}>
                        <View style={{ backgroundColor: '#091628', borderRadius: 10 }}>
                            <Button
                                title="Request"
                                color="#ffffff"
                                onPress={e => this.props.requestMoney(item.address)}
                            />
                        </View>
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
                    containerCustomStyle={{ marginTop: 50, overflow: 'visible' }}
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