import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions } from 'react-native';
import SVGImage from 'react-native-remote-svg';

import BottomNavigator from './layouts/BottomNavigator';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class WalletDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};

        this.changePage = this.changePage.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: "Wallet 9",
            headerTitleStyle: {
                color: '#000000'
            },
            headerTintColor: '#ffbb00',
        };
    };

    componentDidMount() {
        
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                
                <View style={{ width: wp(80), marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Balance</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 24 }}>999 900 990</Text>
                            <SVGImage
                                style={{ width: 20, height: 20, paddingLeft: 5 }}
                                source={require('../assets/images/icons/icon_ale-icon.svg')}
                            />
                        </View>
                    </View>
                    <TouchableOpacity>
                        <SVGImage
                            style={{ width: 25, height: 25 }}
                            source={require('../assets/images/icons/icon_plus-balance.svg')}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, width: wp(80) }}
                >
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: '#0a1627', width: wp(38), borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <SVGImage
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/images/icons/icon_edit-wallet.svg')}
                        />
                        <Text
                            style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', fontWeight: 'bold', paddingLeft: 5 }}
                        >
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: '#ec1972', width: wp(38), borderRadius: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <SVGImage
                            style={{ width: 20, height: 20 }}
                            source={require('../assets/images/icons/icon_delete-wallet.svg')}
                        />
                        <Text
                            style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', fontWeight: 'bold', paddingLeft: 5 }}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

                <BottomNavigator
                    changePage={this.changePage}
                    activePage="wallets"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center'
    }
});