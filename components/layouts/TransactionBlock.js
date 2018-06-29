import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import Image from 'react-native-remote-svg';

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
        let transactions = this.props.data.map(function (el, i) {
            let transactionType = this.props.activeWalletAddress === el.walletAddress ? 'SENT' : 'RECIEVED';
            let transactionTypeBlockColor = this.props.activeWalletAddress === el.walletAddress ? '#091629' : '#FFBB00';
            let transactionTypeBlockImage = this.props.activeWalletAddress === el.walletAddress ? require('../../assets/images/icons/icon_Send-history.svg') : require('../../assets/images/icons/icon_Request-history.svg');
            return (
                <View style={styles.transactionBlockContainer} key={i}>
                    <View style={styles.transactionBlockRow}>
                        <View style={[styles.transactionBlockType, {backgroundColor: transactionTypeBlockColor}]}>
                            <Image
                                source={transactionTypeBlockImage}
                                style={{ width: 20, height: 20 }}
                            />
                        </View>
                        <View style={styles.transactionBlockInfo}>
                            <Text>{transactionType}</Text>
                            <Moment element={Text} format="YYYY MM DD HH:mm">{el.timestamp}</Moment>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.transactionBlockAmount}>{el.count} ALE</Text>
                    </View>
                </View>
            )
        }, this);

        return (
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
                {transactions}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    transactionBlockContainer: {
        padding: 10,
        backgroundColor: '#c1c4cb',
        width: wp(80),
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
        marginBottom: 20
    },
    transactionBlockRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionBlockType: {
        width: 40,
        height: 40,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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