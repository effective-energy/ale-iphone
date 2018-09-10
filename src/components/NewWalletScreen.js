import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, Alert, TextInput } from 'react-native';
import Image from 'react-native-remote-svg';
import isIphoneX from '../config/isIphoneX';
import { CachedImage } from "react-native-img-cache";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class NewWalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newWalletName: ''
        };

        this.restoreWallet = this.restoreWallet.bind(this);
        this.createNewWallet = this.createNewWallet.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        let isHideBackArrow = params.disableBackArrow === true ? null : undefined;
        return {
            title: 'Add new wallet',
            headerLeft: isHideBackArrow,
            headerTitleStyle: {
                color: '#ffbb00'
            },
            headerStyle: {
                backgroundColor: '#08142F',
                borderBottomWidth: 0,
            },
            headerTintColor: '#ffbb00',
        };
    };

    restoreWallet() {
        this.props.navigation.navigate('RestoreWallet');
    }

    createNewWallet() {
        if (this.state.newWalletName === '') {
            return Alert.alert('Enter wallet name');
        } else {
            return this.props.navigation.navigate('Attention', { walletName: this.state.newWalletName });
        }
    }

    render() {
        return (
            <View
                style={styles.pageContainer}
            >
                <StatusBar barStyle='light-content' />
                <View>
                    <TextInput
                        placeholder="Wallet name"
                        placeholderTextColor="#455578"
                        style={styles.new_wallet_input}
                        onChangeText={(newWalletName) => this.setState({newWalletName})}
                        value={this.state.newWalletName}
                    />
                    <TouchableOpacity
                        onPress={this.createNewWallet}
                        style={styles.new_wallet_button}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/new-wallet.png')}
                            style={styles.new_wallet_button_icon}
                            resizeMode='contain'
                        />
                        <Text
                            style={styles.new_wallet_button_text}
                        >
                            Create wallet
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={this.restoreWallet}
                        style={styles.restore_wallet_block}
                    >
                        <CachedImage
                            source={require('../assets/images/icons/restore-wallet.png')}
                            style={styles.restore_wallet_block_icon}
                        />
                        <Text
                            style={styles.restore_wallet_block_text}
                        >
                            Restore wallet
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#08142F',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: isIphoneX === true ? 50 : 20,
    },
    new_wallet_input: {
        height: 40,
        borderWidth: 1,
        width: wp(80),
        marginBottom: 20,
        borderRadius: 2,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        fontSize: 18,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
    },
    new_wallet_button: {
        backgroundColor: '#16203a',
        width: wp(80),
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    new_wallet_button_icon: {
        width: wp(7),
        height: wp(7),
        marginRight: 10
    },
    new_wallet_button_text: {
        color: '#f0b721',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    restore_wallet_block: {
        backgroundColor: '#ffbb00',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    restore_wallet_block_icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    restore_wallet_block_text: {
        color: '#000000',
        fontSize: 18
    }
});