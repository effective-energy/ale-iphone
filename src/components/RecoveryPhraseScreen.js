import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert, Clipboard } from 'react-native';

import CheckBox from './layouts/CheckBox';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class RecoveryPhraseScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isShowMnemonicPhrase: false,
            isCheked: false,
            mnemonicPhrase: 'note curious sibling anchor praise calm then whisper wrestle suspect fancy slab',
            isShowMnemonicConfirm: false
        };

	    this.generateMnemonicPhrase = this.generateMnemonicPhrase.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.confirmMnemonic = this.confirmMnemonic.bind(this);
    }
    
    static navigationOptions = {
        title: "Recovery Phrase"
    };

    generateMnemonicPhrase() {
        this.setState({
            isShowMnemonicPhrase: true
        })
    }

    toggleCheckBox() {
        this.setState({
            isCheked: !this.state.isCheked
        });
    }

    copyMnemonicToClipboard = async () => {
        await Clipboard.setString(this.state.mnemonicPhrase);
        return Alert.alert('Copied to clipboard');
    };

    confirmMnemonic() {
        this.setState({
            isShowMnemonicPhrase: false,
            isShowMnemonicConfirm: true
        })
    }

    render() {
        if (this.state.isShowMnemonicPhrase) {
            return (
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='dark-content'
                    />
                    <View>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>
                            Please, make sure you have carefully writen down your recovery phrase somewhere safe. You will need this phrase later for next use and recover. Phrase is case sensitive.
                        </Text>
                        <View
                            style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5, marginTop: 20 }}
                        >
                            <Text
                                style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
                            >
                                {this.state.mnemonicPhrase}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={this.copyMnemonicToClipboard}
                            style={{ backgroundColor: '#d1d8dd', padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 20, padding: 15 }}
                        >
                            <Text
                                style={{ color: '#000000', fontSize: 18 }}
                            >
                                Copy mnemonic
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.confirmMnemonic}
                            style={{ backgroundColor: '#FFBB00', padding: 5, borderRadius: 5, display: 'flex', alignItems: 'center', marginTop: 10, padding: 15 }}
                        >
                            <Text
                                style={{ color: '#000000', fontSize: 18 }}
                            >
                                Yes, I’ve written it down
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        if (this.state.isShowMnemonicConfirm) {
            return (
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='dark-content'
                    />
                    <View>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View>
                    <Text style={styles.mnemonicGenerateDescription}>
                    	On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet’s funds and private key.
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                        <CheckBox
                            isCheked={this.state.isCheked}
                            toggleCheckBox={this.toggleCheckBox}
                            value="Make sure nobody looks into your screen unless you want them to have access to your funds."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={this.generateMnemonicPhrase}
                        style={styles.nextBtn}
                    >
                        <Text style={styles.nextBtnText}>Continue</Text>
                    </TouchableOpacity>
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
        width: wp(100),
        padding: 20
    },
    mnemonicGenerateDescription: {
        textAlign: 'center'
    },
    nextBtn: {
        backgroundColor: '#d1d8dd',
        padding: 5,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        padding: 15
    },
    nextBtnText: {
        color: '#000000',
        fontSize: 18
    }
});