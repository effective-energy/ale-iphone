import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { NavigatorIOS, YellowBox, Alert, Easing, Animated } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'], ['Class RCTCxxModule']);

import ls from 'react-native-local-storage';

// MobX
import { Provider } from "mobx-react";
import stores from "./mobX";

// I18n 
import I18n from './i18n/index';

import LoginScreen from './components/LoginScreen';
import NewWalletScreen from './components/NewWalletScreen';
import ImportwalletScreen from './components/ImportwalletScreen';
import WalletsScreen from './components/WalletsScreen';
import SettingsScreen from './components/SettingsScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import RecoverAccountScreen from './components/RecoverAccountScreen';
import SuccessPaymentScreen from './components/SuccessPaymentScreen';
import RestoreWalletScreen from './components/RestoreWalletScreen';
import HistoryScreen from './components/HistoryScreen';
import NotificationsScreen from './components/NotificationsScreen';
import ChangeLanguageScreen from './components/ChangeLanguageScreen';
import RecoveryPhraseScreen from './components/RecoveryPhraseScreen';
import TwoFactorAuthScreen from './components/TwoFactorAuthScreen';
import WalletDetailsScreen from './components/WalletDetailsScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';

//Modals
import RequestMoneyScreen from './components/RequestMoneyScreen';
import SendMoneyScreen from './components/SendMoneyScreen';

const initialRouteName = () => {
    ls.get('userToken').then((data) => {
        if (data !== null) {
            return 'Wallets';
        } else {
            return 'Login';
        }
    });
}

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
    ChangePassword: { screen: ChangePasswordScreen }
}, {
    initialRouteName: initialRouteName(),
    transitionConfig,
});

export default class App extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    componentDidMount() {
        this.getSystemLanguage();
    }

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
        return (
            <Provider {...stores}>
                <RootStack />
            </Provider>
        );
    }
}