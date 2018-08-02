import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

export default class CircleProgress extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View style={styles.progressContainer}>
                <View style={[styles.progressItem, {width: 30, height: 30, borderRadius: 15}]}></View>
                <View style={[styles.progressItem, {width: 25, height: 25, borderRadius: 12.5}]}></View>
                <View style={[styles.progressItem, {width: 20, height: 20, borderRadius: 10}]}></View>
                <View style={[styles.progressItem, {width: 15, height: 15, borderRadius: 7.5}]}></View>
            </View>
    	);
    }
}

const styles = StyleSheet.create({
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressItem: {
        backgroundColor: '#556B98',
        marginLeft: 5,
        marginRight: 5
    }
});