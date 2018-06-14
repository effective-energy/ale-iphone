import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Carousel from 'react-native-carousel-view';

import userWallets from '../../wallets/MyWallets.json';

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wallets: userWallets.wallets
        };
    }

    render() {
        let slidersData = this.state.wallets.map(function (el, i) {
            return (
                <View style={styles.container} key={i}>
                    <View style={styles.sliderRow}>
                        <View style={styles.sliderWalletBlock}>
                            <Text style={styles.sliderWalletBlock_name}>
                                {el.name}
                            </Text>
                            <Text>9,999,999.1 ALE</Text>
                        </View>

                        <View style={styles.sliderWalletBlock_actions}>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }} >
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                    <Button onPress={this.sendTokens} title="Send" color="#34343e" />
                                </View>
                            </View>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                    <Button onPress={this.receiveTokens} title="Receive" color="#34343e" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }, this);
        
        return (
            <Carousel
                delay={2000}
                indicatorAtBottom={true}
                indicatorSize={10}
                loop={true}
                animate={false}
                indicatorColor="red"
            >
                {slidersData}
            </Carousel>
        )
    }

    sendTokens() {

    }

    receiveTokens() {

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
        flexDirection: 'row',
        marginTop: 10
    }
});