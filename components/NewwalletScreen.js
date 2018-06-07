import React from 'react';
import { Text, View, Button } from 'react-native';

export default class NewwalletScreen extends React.Component {
    static navigationOptions = {
        title: 'New wallet',
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>NEW WALLET</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Welcome')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}