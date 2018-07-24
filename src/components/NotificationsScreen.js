import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, ScrollView, FlatList, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import Markdown from 'react-native-simple-markdown';
import Swipeout from 'react-native-swipeout';

import BottomNavigator from './layouts/BottomNavigator';
import Pageloader from './layouts/Pageloader';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false,
            isLoaderPage: false,
            notificationsList: [],
            checked: true,
            isRefreshShow: false
        };

        this.changePage = this.changePage.bind(this);
        this.refreshNotifications = this.refreshNotifications.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }
    
    static navigationOptions = {
        title: "Notifications",
        headerLeft: null,
    };

    componentDidMount() {
        this.getNotifications(false);
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    getNotifications() {
        this.setState({
            isLoaderPage: true,
        });

        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/notifications', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({
                    notificationsList: responseJson,
                    isLoaderPage: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    refreshNotifications() {
        this.setState({
            isRefreshShow: true,
        });

        ls.get('userToken').then((data) => {
            fetch('https://ale-demo-4550.nodechef.com/notifications', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({
                    notificationsList: responseJson,
                    isRefreshShow: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    removeNotification(id, index) {
        let notifications = [];
        notifications.push(id);

        ls.get('userToken').then((data) => {
            fetch('https://ale-demo-4550.nodechef.com/notifications/list', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: JSON.stringify({
                    list: notifications
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.message);
                let notificationsList = [...this.state.notificationsList];
                notificationsList.splice(index, 1);
                return this.setState({
                    notificationsList: notificationsList
                });
            })
            .catch((error) => {
                Alert.alert(error)
            });
        });
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading notifications..." />);
        }

        let swipeoutBtns = [{
            text: 'Delete',
            backgroundColor: 'red'
        }];

        let notifications = this.state.notificationsList.map(function (el, i) {
            return (
                <Swipeout
                    right={[{
                        text: 'Delete',
                        backgroundColor: 'red',
                        onPress: () => this.removeNotification(el._id, i)
                    }]}
                    key={i}
                    backgroundColor="#FFFFFF"
                    style={{ width: wp(100), marginTop: 20 }}
                    sensitivity="0"
                    autoClose={true}
                >
                    <View style={{ padding: 20 }}>
                        <Markdown>{el.title}</Markdown>
                    </View>
                </Swipeout>
            )
        }, this);

        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <ScrollView
                    contentInset={{bottom:80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={this.refreshNotifications}
                            refreshing={this.state.isRefreshShow}
                            tintColor="#000000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <View style={{ width: wp(100), display: 'flex', alignItems: 'center' }}>
                        {notifications}
                    </View>
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="notifications"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center',
        justifyContent: 'center'
    }
});