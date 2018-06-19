import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

export default class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    static navigationOptions = {
        title: 'Create account',
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <StatusBar barStyle='dark-content' />
                <Text>Create account</Text>
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