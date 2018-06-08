import React from 'react';

import { createStackNavigator } from 'react-navigation';

// MobX
import ListStore from './mobX/test/listStore';

import LoginScreen from './components/LoginScreen';
import NewwalletScreen from './components/NewwalletScreen';
import RestorewalletScreen from './components/RestorewalletScreen';
import GenerateSecretKeyScreen from './components/GenerateSecretKeyScreen';
import WalletsScreen from './components/WalletsScreen';
import SendTokensScreen from './components/SendTokensScreen';
import ReceiveTokensScreen from './components/ReceiveTokensScreen';
import SettingsTokensScreen from './components/SettingsTokensScreen';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Newwallet: NewwalletScreen,
    Restorewallet: RestorewalletScreen,
    GenerateSecretKey: GenerateSecretKeyScreen,
    Wallets: WalletsScreen,
    SendTokens: SendTokensScreen,
    ReceiveTokens: ReceiveTokensScreen,
    SettingsTokens: SettingsTokensScreen
  }, {
    initialRouteName: 'Login',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}