import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';

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
        Alert.alert(123)
    }

    render() {
        return (
            <View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({});