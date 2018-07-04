import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, AlertIOS, Alert } from 'react-native';
import SVGImage from 'react-native-remote-svg';
import ls from 'react-native-local-storage';

import BottomNavigator from './layouts/BottomNavigator';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class WalletDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            walletName: ''
        };

        this.changePage = this.changePage.bind(this);
        this.receiveMoney = this.receiveMoney.bind(this);
        this.editWalletName = this.editWalletName.bind(this);
        this.deleteWallet = this.deleteWallet.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: params.walletData.name,
            headerTitleStyle: {
                color: '#000000'
            },
            headerTintColor: '#ffbb00',
        };
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            walletName: params.walletData.name
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    receiveMoney(address) {
        this.props.navigation.navigate('RequestMoney', { walletAddress: address });
    }

    editWalletName() {
        AlertIOS.prompt(
            'Change wallet name',
            'Enter new name for wallet',
            [{
                text: 'Cancel',
                style: 'cancel',
            }, {
                text: 'OK',
                onPress: (newWalletName) => this.renameWallet(newWalletName),
            }],
          'plain-text',
          this.state.walletName
        );
    }

    renameWallet(newWalletName) {
        const { params } = this.props.navigation.state;
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/rename', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    walletAddress: params.walletData.address,
                    newWalletName: newWalletName
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.navigation.setParams({
                    walletData: {
                        name: newWalletName,
                        address: params.walletData.params,
                        balance: params.walletData.balance
                    }
                });
                return Alert.alert(responseJson.message);
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    deleteWallet() {
        AlertIOS.prompt(
            'Delete wallet',
            'Type wallet name to confirm deletion',
            [{
                text: 'Cancel',
                style: 'cancel',
            }, {
                text: 'Confirm',
                onPress: (walletName) => this.confirmDeleteWallet(walletName)
            }],
          'plain-text'
        );
    }

    confirmDeleteWallet(walletName) {
        const { params } = this.props.navigation.state;

        if (walletName !== params.walletData.name) {
            return Alert.alert('Incorrect wallet name');
        }

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/wallet/'+params.walletData.address, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message === 'Wallet successfully disabled by this user') {
                    Alert.alert('Wallet successfully deleted');
                } else {
                    Alert.alert(responseJson.message);
                }
                return this.props.navigation.navigate('Wallets');
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.walletInfoBlock}>
                    <View style={styles.walletInfoBlock_row}>
                        <Text style={styles.walletInfoBlock_row_balance_text}>
                            Balance
                        </Text>
                        <View style={styles.walletInfoBlock_balanceBlock}>
                            <Text style={styles.walletInfoBlock_balanceBlock_amount}>
                                {params.walletData.balance}
                            </Text>
                            <SVGImage
                                style={styles.walletInfoBlock_balanceBlock_amount_icon}
                                source={require('../assets/images/icons/icon_ale-icon.svg')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.receiveMoney(params.walletData.address)}
                    >
                        <SVGImage
                            style={styles.walletInfoBlock_receive_icon}
                            source={require('../assets/images/icons/icon_plus-balance.svg')}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.walletActionBlock}>
                    <TouchableOpacity
                        onPress={this.editWalletName}
                        style={[styles.walletInfoBlock_button, styles.walletInfoBlock_button_edit]}
                    >
                        <SVGImage
                            style={styles.walletActionBlock_icon}
                            source={require('../assets/images/icons/icon_edit-wallet.svg')}
                        />
                        <Text style={styles.walletActionBlock_text}>
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.deleteWallet}
                        style={[styles.walletInfoBlock_button, styles.walletInfoBlock_button_delete]}
                    >
                        <SVGImage
                            style={styles.walletActionBlock_icon}
                            source={require('../assets/images/icons/icon_delete-wallet.svg')}
                        />
                        <Text style={styles.walletActionBlock_text}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

                <BottomNavigator
                    changePage={this.changePage}
                    activePage="wallets"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    },
    walletInfoBlock: {
        width: wp(80),
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletInfoBlock_row: {
        display: 'flex',
        flexDirection: 'column',
    },
    walletInfoBlock_balanceBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletInfoBlock_balanceBlock_amount: {
        fontSize: 24,
    },
    walletInfoBlock_balanceBlock_amount_icon: {
        width: 20,
        height: 20,
        paddingLeft: 5,
    },
    walletInfoBlock_row_balance_text: {
        fontSize: 18,
    },
    walletInfoBlock_receive_icon: {
        width: 25,
        height: 25,
    },
    walletActionBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        width: wp(80),
    },
    walletInfoBlock_button: {
        padding: 10,
        backgroundColor: '#0a1627',
        width: wp(38),
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    walletInfoBlock_button_edit: {
        backgroundColor: '#0a1627',
    },
    walletInfoBlock_button_delete: {
        backgroundColor: '#ec1972',
    },
    walletActionBlock_icon: {
        width: 20,
        height: 20,
    },
    walletActionBlock_text: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingLeft: 5,
    }
});