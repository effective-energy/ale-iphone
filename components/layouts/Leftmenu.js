import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import ls from 'react-native-local-storage';

export default class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userName: '',
            userAvatar: ''
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserAvatar() {
        return `https://ale-demo-4550.nodechef.com/${this.state.userAvatar}`;
    }

    getUserData() {
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/get-user-data', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    userEmail: responseJson.email,
                    userName: responseJson.name,
                    userAvatar: responseJson.avatar
                })
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#091529', paddingTop: 50, paddingLeft: 20 }}>
                <View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Account</Text>
                    </View>
                    <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
                        <View style={{ marginRight: 10 }}>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: this.getUserAvatar()}}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 18 }}>{this.state.userName}</Text>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>{this.state.userEmail}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginRight: 10, marginTop: 20 }}>
                    <View style={{ backgroundColor: '#ffbb00', width: 200 }}>
                        <Button
                            title="Sign out"
                            color="#000000"
                            onPress={this.props.signOut}
                        />
                    </View>
                    <View>
                        <Text>2.0.1</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});