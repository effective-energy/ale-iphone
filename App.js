import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { NavigatorIOS, YellowBox, Alert } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import ls from 'react-native-local-storage';

// MobX
import { Provider } from "mobx-react";
import stores from "./mobX";

import LoginScreen from './components/LoginScreen';
import NewwalletScreen from './components/NewwalletScreen';
import ImportwalletScreen from './components/ImportwalletScreen';
import GenerateSecretKeyScreen from './components/GenerateSecretKeyScreen';
import WalletsScreen from './components/WalletsScreen';
import SendScreen from './components/SendScreen';
import ReceiveScreen from './components/ReceiveScreen';
import SettingsScreen from './components/SettingsScreen';

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
    Newwallet: { screen: NewwalletScreen },
    Importwallet: { screen: ImportwalletScreen },
    GenerateSecretKey: { screen: GenerateSecretKeyScreen },
    Wallets: { screen: WalletsScreen },
    SendTokens: { screen: SendScreen },
    ReceiveTokens: { screen: ReceiveScreen },
    Settings: { screen: SettingsScreen }
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