import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

@inject("walletsStore")
@observer
export default class ConfirmMnemonicScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            currentMnemonicWordIndex: 0
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Confirm mnemonic'
        };
    };

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
    },
});