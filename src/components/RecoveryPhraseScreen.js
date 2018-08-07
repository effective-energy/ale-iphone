import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert, Clipboard, TextInput } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import Pageloader from './layouts/Pageloader';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

@inject("walletsStore")
@observer
export default class RecoveryPhraseScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            currentMnemonicWordIndex: 0
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Recovery Phrase'
        };
    };

    componentDidMount() {
        this.props.walletsStore.getMnemonic();
    }

    prevMnemonicWord () {
        if (this.state.currentMnemonicWordIndex === 0) {
            return false;
        }
        this.setState({
            currentMnemonicWordIndex: Number(this.state.currentMnemonicWordIndex-1)
        });
    }

    nextMnemonicWord () {
        if (this.state.currentMnemonicWordIndex >= 11) {
            return false;
        }
        this.setState({
            currentMnemonicWordIndex: Number(this.state.currentMnemonicWordIndex+1)
        });
    }

    render() {
        if (this.props.walletsStore.isLoaderPage) {
            return (<Pageloader title="Loading wallets..." />);
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{width: wp(80), height: 150, marginTop: 50, display: 'flex', flexDirection: 'column'}}>
                    <Text style={{textAlign: 'center', marginBottom: 50}}>Word {this.state.currentMnemonicWordIndex+1} of 12</Text>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={this.prevMnemonicWord.bind(this)}
                        >
                            <Text>PREV</Text>
                        </TouchableOpacity>
                        <Text>{this.props.walletsStore.mnemonicPhrase[this.state.currentMnemonicWordIndex]}</Text>
                        <TouchableOpacity
                            onPress={this.nextMnemonicWord.bind(this)}
                        >
                            <Text>NEXT</Text>
                        </TouchableOpacity>
                    </View>
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