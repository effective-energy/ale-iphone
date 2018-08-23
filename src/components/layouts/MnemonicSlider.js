import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SVGImage from 'react-native-remote-svg';

export default class MnemonicSlider extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        return (
            <View style={styles.sliderContainer}>
                <TouchableOpacity onPress={() => this.props.prevMnemonicWord()}>
                    <SVGImage
                        source={require('../../assets/images/icons/back-arrow.svg')}
                        style={styles.sliderIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.slideCurrentWord}>{this.props.mnemonicPhrase[this.props.currentWord]}</Text>
                <TouchableOpacity onPress={() => this.props.nextMnemonicWord()}>
                    <SVGImage
                        source={require('../../assets/images/icons/next-arrow.svg')}
                        style={styles.sliderIcon}
                    />
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
    sliderIcon: {
       width: 20,
       height: 20 
    },
    slideCurrentWord: {
        color: '#091529',
        fontSize: 16
    }
});