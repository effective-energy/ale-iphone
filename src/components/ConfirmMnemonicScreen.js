import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import ls from 'react-native-local-storage';
import { observer, inject } from "mobx-react";
import CheckBox from './layouts/CheckBox';

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
            currentMnemonicWordIndex: 0,
            selecredWordsForConfirm: []
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Confirm the key',
        };
    };

    componentDidMount () {
        let array = [1,2,3,4,5,6,7,8,9];
        let shuffled = array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
        shuffled = shuffled.splice(0, 3);
    }

    confirmMnemonic () {

    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={{width: wp(80)}}>
                    <Text
                        style={{textAlign: 'center', color: '#091529', fontSize: 16}}
                    >
                        Type each word in the correct order to verify your recover phrase
                    </Text>
                    <View style={{marginTop: 20, marginBottom: 10}}>
                        <TextInput
                            placeholder="3th word"
                            placeholderTextColor="#ABB8C6"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="8th word"
                            placeholderTextColor="#ABB8C6"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="10th word"
                            placeholderTextColor="#ABB8C6"
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <CheckBox
                            isCheked={false}
                            value='I understand that my money are held securely on this device only, not on the company servers'
                        />
                        <CheckBox
                            isCheked={false}
                            value='I understand that if this application is moved to another device or deleted, my money can be only recovered with the backup phrase which were written down in a secure place'
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={this.confirmMnemonic.bind(this)}
                            style={{backgroundColor: '#D1D8DD', width: wp(80), padding: 10, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}
                        >
                            <Text style={{color: '#091529', fontSize: 18}}>
                                Continue
                            </Text>
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
        paddingTop: 30,
        paddingBottom: 20
    },
    textInput: {
        height: 40,
        width: wp(80),
        marginBottom: 20,
        padding: 6,
        color: '#ABB8C6',
        borderBottomColor: '#ABB8C6',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16,
        textAlign: 'center'
    }
});