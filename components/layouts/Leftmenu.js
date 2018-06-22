import React from 'react';
import { Text, View, StyleSheet, Image, Button, Dimensions } from 'react-native';
import ls from 'react-native-local-storage';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');

export default class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getUserAvatar() {
        return `https://ale-demo-4550.nodechef.com/${this.props.userData.userAvatar}`;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#091529', paddingTop: 50, paddingLeft: wp(5), justifyContent: 'space-between' }}>
                <View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Account</Text>
                    </View>
                    <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', borderBottomColor: '#47315a', borderBottomWidth: 3, paddingBottom: 10 }}>
                        <View style={{ marginRight: 10 }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: this.getUserAvatar()}}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 20, maxWidth: wp(45) }}>{this.props.userData.userName}</Text>
                            <Text style={{ color: '#ffffff', fontSize: 16, maxWidth: wp(45) }}>{this.props.userData.userEmail}</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#ffffff', fontSize: 20 }}>Total balance</Text>
                        <Text style={{ color: '#ffffff', fontSize: 26 }}>1 999 900 990</Text>
                    </View>
                </View>
                <View style={{ marginRight: 10, marginBottom: 25, display: 'flex', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#ffbb00', width: wp(55), borderRadius: 10, marginBottom: 30 }}>
                        <Button
                            title="Sign out"
                            color="#000000"
                            onPress={this.props.signOut}
                        />
                    </View>
                    <View style={{ backgroundColor: '#152038', width: wp(20), padding: 10, borderRadius: 15 }}>
                        <Text style={{ color: '#ffffff', textAlign: 'center' }}>0.0.1</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});