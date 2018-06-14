import React from 'react';
import { View, StyleSheet } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';

export default class ReceiveScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: 'Receive tokens',
        headerLeft: null,
        gesturesEnabled: false
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <WalletsSlider />
                <BottomNavigator
                    onPress={this.changePage}
                    activePage="receive"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});