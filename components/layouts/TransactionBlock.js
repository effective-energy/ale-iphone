import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class TransactionBlock extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View style={styles.transactionBlockContainer}>
                <View style={styles.transactionBlockRow}>
                    <View style={styles.transactionBlockType}></View>
                    <View style={styles.transactionBlockInfo}>
                        <Text>Satoshi Nakamoto</Text>
                        <Text>17.03.18 7:25 PM</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.transactionBlockAmount}>-999 ALE</Text>
                    <Text style={styles.transactionBlockDescription}>Money send</Text>
                </View>
            </View>
    	)
    }
}

const styles = StyleSheet.create({
    transactionBlockContainer: {
        padding: 10,
        backgroundColor: '#cccccc',
        width: wp(90),
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    transactionBlockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionBlockType: {
        width: 50,
        height: 50,
        backgroundColor: '#091629',
        borderRadius: 5
    },
    transactionBlockInfo: {
        marginLeft: 10
    },
    transactionBlockAmount: {
        textAlign: 'right',
        fontSize: 18
    },
    transactionBlockDescription: {
        textAlign: 'right'
    }
});