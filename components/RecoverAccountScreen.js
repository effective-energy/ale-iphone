import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

export default class RecoverAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    static navigationOptions = {
        title: 'Recover account',
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <StatusBar barStyle='dark-content' />
                <Text>Recover account</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#ffd24f',
    borderRadius: 4,
    padding: 10,
    width: 300,
    marginTop: 20
  }
});