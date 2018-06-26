import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class RecoveryPhraseScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
	    	isChecked: false
	    };

	    this.generateMnemonicPhrase = this.generateMnemonicPhrase.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }
    
    static navigationOptions = {
        title: "Recovery Phrase"
    };

    generateMnemonicPhrase() {
        if (this.state.isChecked === false) {
            return Alert.alert('Press on checkbox');
        } else {
            return Alert.alert('Next..')
        }
    }

    toggleCheckBox() {
        this.setState({isChecked: !this.state.isChecked})
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View>
                    <Text style={styles.mnemonicGenerateDescription}>
                    	On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet’s funds and private key.
                    </Text>
                    <CheckBox
                        onClick={() => this.toggleCheckBox}
                        style={styles.checkBox}
                        isChecked={this.state.isChecked}
                        rightText="Make sure nobody looks into your screen unless you want them to have access to your funds."
                    />
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
    checkBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center'
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