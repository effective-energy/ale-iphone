import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import SVGImage from 'react-native-remote-svg';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class AttentionScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Attention'
        };
    };

    openRecoveryPhrasePage() {
        this.props.navigation.navigate('RecoveryPhrase');
    }

    render() {
    	return (
    		<View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <View style={styles.pageRow}>
                    <SVGImage
                        style={{width: 120, height: 120, marginBottom: 10}}
                        source={require('../assets/images/icons/icon_lock.svg')}
                    />
                    <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center'}}>
                        On the following screen, you will see a set of X random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet's funds and private key.
                    </Text>
                    <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 20}}>
                        Make sure nobody looks into your screen unless you want them to have access to your funds.
                    </Text>
                    <TouchableOpacity
                        onPress={this.openRecoveryPhrasePage.bind(this)}
                        style={styles.buttonBlock}
                    >
                        <Text style={styles.buttonBlock_text}>
                            My data protected
                        </Text>
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
    },
    pageRow: {
        width: wp(80),
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    buttonBlock: {
        backgroundColor: '#d0d8de',
        width: wp(80),
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonBlock_text: {
        color: '#091529',
        fontSize: 18
    }
});