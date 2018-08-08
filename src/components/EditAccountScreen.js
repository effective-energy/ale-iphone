import React from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput, Dimensions } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class EditAccountScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};

        this.setAvatar = this.setAvatar.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            title: 'Edit account data',
        };
    };

    setAvatar(avatar) {
        let uploadAvatar = new FormData();
        uploadAvatar.append("avatar", avatar);

        ls.get('userToken').then((data) => {
            return Alert.alert()
            fetch('https://ale-demo-4550.nodechef.com/users/set_avatar', {
                method: 'POST',
                headers: {
                    'Authorization': data
                },
                body: uploadAvatar
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.message)
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={{width: '100%', height: 80, backgroundColor: '#FFFFFF', padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: 'red'}}></View>
                    <View>
                        <TextInput
                            placeholder="ALEHUB"
                            placeholderTextColor="#455578"
                            style={styles.textInput}
                        />
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
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        width: wp(70),
        marginBottom: 20,
        padding: 6,
        color: '#455578',
        borderBottomColor: '#455578',
        borderBottomWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        fontSize: 16
    },
});