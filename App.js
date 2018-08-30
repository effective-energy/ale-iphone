import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { YellowBox, NetInfo, StyleSheet, View, Text, StatusBar, Platform } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Warning', 'Class RCTCxxModule']);

import ls from 'react-native-local-storage';

// MobX
import { Provider } from "mobx-react";
import stores from "./src/store";

import LoginScreen from './src/components/LoginScreen';
import NewWalletScreen from './src/components/NewWalletScreen';
import ImportwalletScreen from './src/components/ImportwalletScreen';
import WalletsScreen from './src/components/WalletsScreen';
import SettingsScreen from './src/components/SettingsScreen';
import CreateAccountScreen from './src/components/CreateAccountScreen';
import RecoverAccountScreen from './src/components/RecoverAccountScreen';
import SuccessPaymentScreen from './src/components/SuccessPaymentScreen';
import RestoreWalletScreen from './src/components/RestoreWalletScreen';
import HistoryScreen from './src/components/HistoryScreen';
import NotificationsScreen from './src/components/NotificationsScreen';
import ChangeLanguageScreen from './src/components/ChangeLanguageScreen';
import RecoveryPhraseScreen from './src/components/RecoveryPhraseScreen';
import TwoFactorAuthScreen from './src/components/TwoFactorAuthScreen';
import WalletDetailsScreen from './src/components/WalletDetailsScreen';
import ChangePasswordScreen from './src/components/ChangePasswordScreen';
import RequestMoneyScreen from './src/components/RequestMoneyScreen';
import SendMoneyScreen from './src/components/SendMoneyScreen';
import WebViewScreen from './src/components/WebViewScreen';
import InitialScreen from './src/components/InitialScreen';
import AttentionScreen from './src/components/AttentionScreen';
import TwoFactorLoginScreen from './src/components/TwoFactorLoginScreen';
import ConfirmMnemonicScreen from './src/components/ConfirmMnemonicScreen';
import ConfirmRegisterScreen from './src/components/ConfirmRegisterScreen';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 0
    }
  }
}

const RootStack = createStackNavigator({
    Login: { screen: LoginScreen },
    NewWallet: { screen: NewWalletScreen },
    Importwallet: { screen: ImportwalletScreen },
    Wallets: { screen: WalletsScreen },
    Settings: { screen: SettingsScreen },
    RequestMoney: { screen: RequestMoneyScreen },
    SendMoney: { screen: SendMoneyScreen },
    CreateAccount: { screen: CreateAccountScreen },
    RecoverAccount: { screen: RecoverAccountScreen },
    SuccessPayment: { screen: SuccessPaymentScreen },
    RestoreWallet: { screen: RestoreWalletScreen },
    History: { screen: HistoryScreen },
    Notifications: { screen: NotificationsScreen },
    ChangeLanguage: { screen: ChangeLanguageScreen },
    RecoveryPhrase: { screen: RecoveryPhraseScreen },
    TwoFactorAuth: { screen: TwoFactorAuthScreen },
    WalletDetails: { screen: WalletDetailsScreen },
    ChangePassword: { screen: ChangePasswordScreen },
    WebView: { screen: WebViewScreen },
    InitialPage: { screen: InitialScreen },
    Attention: { screen: AttentionScreen },
    TwoFactorLogin: { screen: TwoFactorLoginScreen },
    ConfirmMnemonic: { screen: ConfirmMnemonicScreen },
    ConfirmRegister: { screen: ConfirmRegisterScreen },
}, {
    initialRouteName: 'InitialPage',
    transitionConfig,
});

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

const prefix = Platform.OS == 'android' ? 'alewallet://alewallet/' : 'alewallet://';

export default class App extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected: true });
        } else {
            this.setState({ isConnected: false });
        }
    };

    render() {
        if (!this.state.isConnected) {
            return (
                <View>
                    <StatusBar barStyle='light-content' />
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>No Internet Connection</Text>
                    </View>
                </View>
            );
        }

        return (
            <Provider {...stores}>
                <RootStack uriPrefix={prefix} />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#07132f',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    offlineText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});