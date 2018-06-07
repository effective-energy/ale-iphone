import React from 'react';

import { createStackNavigator } from 'react-navigation';

import WelcomeScreen from './components/WelcomeScreen';
import NewwalletScreen from './components/NewwalletScreen';
import RestorewalletScreen from './components/RestorewalletScreen';

const RootStack = createStackNavigator({
    Welcome: WelcomeScreen,
    Newwallet: NewwalletScreen,
    Restorewallet: RestorewalletScreen
  }, {
    initialRouteName: 'Welcome',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}