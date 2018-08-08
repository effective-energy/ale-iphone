import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class MnemonicSlider extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        return (
            <View style={styles.sliderContainer}>
                <TouchableOpacity onPress={() => this.props.prevMnemonicWord()}>
                    <Text>PREV</Text>
                </TouchableOpacity>
                <Text>{this.props.mnemonicPhrase[this.props.currentWord]}</Text>
                <TouchableOpacity onPress={() => this.props.nextMnemonicWord()}>
                    <Text>NEXT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sliderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
});