import React from 'react';
import { Text, View, Button } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';

export default class WalletsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }
    
    static navigationOptions = {
        title: 'My wallets',
        headerLeft: null
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <WalletsSlider />
                <BottomNavigator />
            </View>
        );
    }
}