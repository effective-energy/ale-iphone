import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import SVGImage from 'react-native-remote-svg';
import isIphoneX from '../../config/isIphoneX';
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
            <View style={styles.walletsSlider_container}>
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
                        <TouchableHighlight
                            onPress={() => this.props.openWalletDetailsScreen(item)}
                        >
                            <SVGImage
                                style={{width: wp(8), height: wp(8)}}
                                source={require('../../assets/images/icons/icon_wallet-menu.svg')}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ maxWidth: wp(75), display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#091628', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center', width: wp(32) }}
                        onPress={e => this.props.sendMoney(item.address)}
                    >
                        <SVGImage
                            style={{width: wp(5), height: wp(5), marginRight: 10 }}
                            source={require('../../assets/images/icons/icon_send.svg')}
                        />
                        <Text style={{ color: '#ffffff', fontSize: 16 }}>Send</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: '#FFBB00', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, alignItems: 'center', width: wp(32) }}
                        onPress={e => this.props.requestMoney(item.address)}
                    >
                        <SVGImage
                            style={{width: wp(5), height: wp(5), marginRight: 5 }}
                            source={require('../../assets/images/icons/icon_request.svg')}
                        />
                        <Text style={{ color: '#000000', fontSize: 16 }}>Request</Text>
                    </TouchableOpacity>
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
                    containerCustomStyle={styles.walletsSlider_container_custom}
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
    walletsSlider_container: {
        backgroundColor: '#e7ebee',
        padding: 20,
        borderRadius: 6,
    },
    walletsSlider_container_custom: {
        marginTop: isIphoneX === true ? 30 : 20,
        overflow: 'visible',
    },
});