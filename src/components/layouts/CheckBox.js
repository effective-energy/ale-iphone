import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import SVGImage from 'react-native-remote-svg';

export default class CheckBox extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
        let isCheked = this.props.isCheked ? require('../../assets/images/icons/check-small.svg') : null;
    	return (
    		<TouchableOpacity
                onPress={this.props.toggleCheckBox}
                style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
                <View
                    style={styles.checkBoxContainer}
                >
                    <SVGImage
                        source={isCheked}
                        style={{ width: 15, height: 15 }}
                    />
                </View>
                <Text style={{ paddingLeft: 10 }}>{this.props.value}</Text>
            </TouchableOpacity>
    	)
    }
}

const styles = StyleSheet.create({
    checkBoxContainer: {
        width: 20,
        height: 20,
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});