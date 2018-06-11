import React from 'react';

import { createStackNavigator } from 'react-navigation';

// MobX
import ListStore from './mobX/test/listStore';

import LoginScreen from './components/LoginScreen';
import NewwalletScreen from './components/NewwalletScreen';
import ImportwalletScreen from './components/ImportwalletScreen';
import GenerateSecretKeyScreen from './components/GenerateSecretKeyScreen';
import WalletsScreen from './components/WalletsScreen';
import SendTokensScreen from './components/SendTokensScreen';
import ReceiveTokensScreen from './components/ReceiveTokensScreen';
import SettingsScreen from './components/SettingsScreen';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    Newwallet: NewwalletScreen,
    Importwallet: ImportwalletScreen,
    GenerateSecretKey: GenerateSecretKeyScreen,
    Wallets: WalletsScreen,
    SendTokens: SendTokensScreen,
    ReceiveTokens: ReceiveTokensScreen,
    Settings: SettingsScreen
  }, {
    initialRouteName: 'Login'
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}