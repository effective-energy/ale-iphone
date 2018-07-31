import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { NavigatorIOS, YellowBox, Alert, NetInfo, StyleSheet, View, Text, AsyncStorage } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Warning']);

import ls from 'react-native-local-storage';

// MobX
import { Provider } from "mobx-react";
import stores from "./src/store";

// I18n 
import I18n from './src/i18n';

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
import CameraScreen from './src/components/CameraScreen';
import EditAccountScreen from './src/components/EditAccountScreen';
import WebViewScreen from './src/components/WebViewScreen';
import initialScreen from './src/components/initialScreen';

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
    Camera: { screen: CameraScreen },
    EditAccount: { screen: EditAccountScreen },
    WebView: { screen: WebViewScreen },
    initialPage: { screen: initialScreen },
}, {
    initialRouteName: 'initialPage',
    transitionConfig,
});

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

export default class App extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            isConnected: true,
        };
    }

    componentDidMount() {
        this.getSystemLanguage();
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

    getSystemLanguage() {
        ls.get('systemLanguage').then((result) => {
            if (result === null) {
                ls.save('systemLanguage', 'en').then(() => {
                    I18n.locale = 'en';
                });
            } else {
                I18n.locale = result;
            }
        });
    }

    render() {
        if (!this.state.isConnected) {
            return (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>No Internet Connection</Text>
                </View>
            );
        }

        return (
            <Provider {...stores}>
                <RootStack />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        flex: 1,
        backgroundColor: '#07132f',
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