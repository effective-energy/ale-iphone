import React from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class SendScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: 'Send tokens',
        headerLeft: null,
        gesturesEnabled: false
    };

    scannerQR() {
        Alert.alert('123213')
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View>
                    <Counter />
                </View>
                <View>
                    <Button
                        title="QR scanner"
                        onPress={this.scannerQR}
                        color="#34343e"
                    />
                </View>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="send"
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
        backgroundColor: '#ffffff'
    }
});