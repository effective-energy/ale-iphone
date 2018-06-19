import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Image, StatusBar } from 'react-native';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class RequestMoneyScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};
    }
    
    static navigationOptions = {
        title: 'Request money'
    };

    render() {
    	const { params } = this.props.navigation.state;
        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='dark-content' />
            	<View style={styles.qrCodeContainer}>
            		<View style={{ marginBottom: 20 }}>
            			<Image
	            			source={{uri: 'https://internationalbarcodes.net/wp-content/uploads/2017/04/QR%20code%20example.jpg'}}
	            			style={{ width: wp(70), height: wp(70), margin: 0, padding: 0 }}
						/>
					</View>
					<View>
						<Text style={{ fontSize: 24, marginBottom: 10, textAlign: 'center' }}>RECEIVER ADDRESS:</Text>
						<Text style={{ textAlign: 'center' }}>{params.walletAddress}</Text>
					</View>
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
        paddingTop: 50
    },
    qrCodeContainer: {
    	width: screenWidth,
    	backgroundColor: '#ffffff',
    	padding: wp(5),
    	borderRadius: 6
    }
});