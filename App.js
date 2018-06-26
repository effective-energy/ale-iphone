import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { NavigatorIOS, YellowBox, Alert } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import ls from 'react-native-local-storage';

// MobX
import { Provider } from "mobx-react";
import stores from "./mobX";

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
    TwoFactorAuth: { screen: TwoFactorAuthScreen }
}, {
    initialRouteName: initialRouteName()
}, {
    transitionConfig: () => ({
        screenInterpolator: () => null
    }),
});

export default class App extends React.Component {
    constructor(props: Object) {
        super(props);
    }

    render() {
        return (
            <Provider {...stores}>
                <RootStack />
            </Provider>
        );
    }
}