import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import ls from 'react-native-local-storage';

export default class EditAccountScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {};

        this.setAvatar = this.setAvatar.bind(this);
    }
    
    static navigationOptions = {
        title: 'Edit account'
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
            <View>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            this.setAvatar(avatar)
                        }
                    }}
                >
                    <Image
                        style={{
                            paddingVertical: 30,
                            width: 150,
                            height: 150,
                            borderRadius: 75
                        }}
                        resizeMode='cover'
                        source={{
                            uri: 'https://ale-demo-4550.nodechef.com/assets/9dd0578525ef3e4f2c8185ec169ebed365292c6d6d61848513d7e5c830a929b0%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202018-07-06%20%D0%B2%2022.23.50.png'
                        }}
                    />
                </PhotoUpload>  
            </View>
        );
    }
}

const styles = StyleSheet.create({});