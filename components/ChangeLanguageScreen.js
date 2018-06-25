import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, StatusBar, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class ChangeLanguageScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }
    
    static navigationOptions = {
        title: 'Change language'
    };

    render() {
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='dark-content' />
            	<View>
                    <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 20 }}
                    >
                        <Text style={{ fontSize: wp(5), color: '#34343e' }}>English</Text>
                        <Text style={{ fontSize: wp(5), color: '#34343e' }}>(current)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 20 }}
                    >
                        <Text style={{ fontSize: wp(5), color: '#34343e' }}>Russian</Text>
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
        width: wp(100)
    }
});