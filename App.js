import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { NavigatorIOS } from 'react-native';

// MobX
import ListStore from './mobX/test/listStore';

import LoginScreen from './components/LoginScreen';
import NewwalletScreen from './components/NewwalletScreen';
import ImportwalletScreen from './components/ImportwalletScreen';
import GenerateSecretKeyScreen from './components/GenerateSecretKeyScreen';
import WalletsScreen from './components/WalletsScreen';
import SendScreen from './components/SendScreen';
import ReceiveScreen from './components/ReceiveScreen';
import SettingsScreen from './components/SettingsScreen';

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
    initialRouteName: 'Wallets'
}, {
    transitionConfig: () => ({
        screenInterpolator: () => null
    }),
});

export default class App extends React.Component {
  render() {
    return (
        <RootStack />
    );
  }
}