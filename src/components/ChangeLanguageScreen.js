import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import I18n from '../i18n/index';
import { CachedImage } from "react-native-img-cache";

import langList from '../i18n/languagesList';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');
let screenWidth = wp(80);

export default class ChangeLanguageScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            systemLanguage: ''
        };

        this.changeLanguage = this.changeLanguage.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Change language',
        };
    };

    componentDidMount() {
        this.getSystemLanguage();
    }

    getSystemLanguage() {
        this.setState({
            systemLanguage: I18n.currentLocale()
        });
    }

    changeLanguage(code) {
        if (code === this.state.systemLanguage) {
            return false;
        }
        this.setState({systemLanguage: code});
        I18n.locale = code;
    }

    render() {
        let languagesList = langList.map(function (el, i) {
            let isActiveLanguage = this.state.systemLanguage === el.code ? require('../assets/images/icons/check.png') : null;
            return (
                <TouchableOpacity
                    onPress={() => this.changeLanguage(el.code)}
                    key={i}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', width: wp(100), paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15, marginTop: 1 }}
                >
                    <Text style={{ fontSize: wp(5), color: '#34343e' }}>{el.name}</Text>
                    {
                        isActiveLanguage !== null && <CachedImage
                            source={isActiveLanguage}
                            style={{ width: 20, height: 20 }}
                            resizeMode='contain'
                        />
                    }
                </TouchableOpacity>
            )
        }, this);

        return (
            <View
                style={styles.pageContainer}
            >
            	<StatusBar
                    barStyle='dark-content'
                />
            	<View
                    style={{ marginTop: 20 }}
                >
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