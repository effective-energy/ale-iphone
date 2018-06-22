import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Image from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class NewWalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.restoreWallet = this.restoreWallet.bind(this);
    }

    static navigationOptions = {
        title: 'Add new wallet',
    };

    restoreWallet() {
        this.props.navigation.navigate('RestoreWallet', { animation: null });
    }

    render() {
        return (
            <View
                style={{ flex: 1, backgroundColor: '#08142F', alignItems: 'center', justifyContent: 'space-between', paddingTop: 30, paddingBottom: 30 }}
            >
                <StatusBar barStyle='dark-content' />
                <View>
                    <Text>123</Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={this.restoreWallet}
                        style={{ backgroundColor: '#ffbb00', width: wp(80), padding: 5, borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('../assets/images/icons/icon_restore-wallet.svg')}
                            style={{width: 30, height: 30, marginRight: 10 }}
                        />
                        <Text
                            style={{ color: '#000000', fontSize: 18}}
                        >
                            Restore wallet
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});