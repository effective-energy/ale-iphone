import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
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
        this.props.navigation.navigate('RecoveryPhrase', {
            walletName: this.props.navigation.state.params.walletName
        });
    }

    render() {
    	return (
    		<View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <ScrollView
                    refreshing={false}
                >
                    <View style={styles.pageRow}>
                        <SVGImage
                            style={{width: 120, height: 120, marginBottom: 10}}
                            source={require('../assets/images/icons/icon_lock.svg')}
                        />
                        <Text style={{fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#091529'}}>
                            On the following screen, you will see a set of 12 random words. This is your wallet backup phrase. It can be entered in any version of ALE application in order to back up or restore your wallet's funds and private key.
                        </Text>
                        <Text style={{fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#091529'}}>
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
                </ScrollView>
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
        backgroundColor: '#D1D8DD',
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