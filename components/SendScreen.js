import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';

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
                    <Button
                        title="QR scanner"
                        onPress={this.scannerQR}
                        color="#34343e"
                    />
                </View>
                <BottomNavigator
                    onPress={this.changePage}
                    activePage="send"
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