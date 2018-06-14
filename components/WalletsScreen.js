import React from 'react';
import { View } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';

export default class WalletsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: 'My wallets',
        headerLeft: null,
        gesturesEnabled: false
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <WalletsSlider />
                <BottomNavigator onPress={this.changePage} />
            </View>
        );
    }
}