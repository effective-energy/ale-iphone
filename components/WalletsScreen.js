import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {};
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <WalletsSlider />
                <NewWalletBlock />
                {/*<View>
                    <Counter />
                </View>
                <View>
                    <Button
                        onPress={() => this.props.counterStore.increment()}
                        title="Increment Counter"
                        color="#805841"
                    />
                </View>*/}
                <BottomNavigator
                    onPress={this.changePage}
                    activePage="wallets"
                />
            </View>
        );
    }
}

@inject("counterStore")
@observer
class Counter extends React.Component {
  render() {
    return <Text>Count: {this.props.counterStore.count}</Text>;
  }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#091430'
    }
});