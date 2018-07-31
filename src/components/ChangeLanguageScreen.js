import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Alert } from 'react-native';
import ls from 'react-native-local-storage';
import Image from 'react-native-remote-svg';

import langList from '../i18n/languagesList';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

// I18n 
import I18n from '../i18n/index';

export default class ChangeLanguageScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            systemLanguage: ''
        };

        this.changeLanguage = this.changeLanguage.bind(this);
    }
    
    static navigationOptions = {
        title: 'Change language'
    };

    componentDidMount() {
        this.getSystemLanguage();
    }

    getSystemLanguage() {
        ls.get('systemLanguage').then((result) => {
            return this.setState({systemLanguage: result});
        });
    }

    changeLanguage(code) {
        if (code === this.state.systemLanguage) {
            return false;
        }
        ls.save('systemLanguage', code).then(() => {
            this.setState({systemLanguage: code});
            Alert.alert('Language successfully changed');
            I18n.locale = code;
            return this.props.navigation.navigate('Settings');
        });
    }

    render() {
        let languagesList = langList.map(function (el, i) {
            let isActiveLanguage = this.state.systemLanguage === el.code ? require('../assets/images/icons/check-small.svg') : null;
            return (
                <TouchableOpacity
                    onPress={() => this.changeLanguage(el.code)}
                    key={i}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 1 }}
                >
                    <Text style={{ fontSize: wp(5), color: '#34343e' }}>{el.name}</Text>
                    <Image
                        source={isActiveLanguage}
                        style={{ width: 20, height: 20 }}
                    />
                </TouchableOpacity>
            )
        }, this);

        return (
            <View style={styles.pageContainer}>
            	<StatusBar barStyle='dark-content' />
            	<View style={{ marginTop: 20 }}>
                    {languagesList}
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