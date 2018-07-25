import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, ScrollView, FlatList, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import Markdown from 'react-native-simple-markdown';
import Swipeout from 'react-native-swipeout';

import BottomNavigator from './layouts/BottomNavigator';
import Pageloader from './layouts/Pageloader';

import Config from '../config';

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
            isLoaderPage: true,
            notificationsList: [],
            checked: true,
            isRefreshShow: false
        };

        this.changePage = this.changePage.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }
    
    static navigationOptions = {
        title: "Notifications",
        headerLeft: null,
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount() {
        this.getNotifications(false).done();
    }

    async getNotifications(isRefresh) {
        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        const params = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            }
        }

        const response = await fetch(`${Config.SERVER_URL}/notifications`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        await this.setStateAsync({
            notificationsList: responseJson,
            isLoaderPage: false,
            isRefreshShow: false,
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    async removeNotification(id, index) {
        const userToken = await ls.get('userToken');
        if (!userToken) {
            throw userToken
        }

        let notifications = [];
        notifications.push(id);

        const params = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({
                list: notifications
            })
        }

        const response = await fetch(`${Config.SERVER_URL}/notifications/list`, params);
        if (!response) {
            throw response
        }

        const responseJson = await response.json();

        Alert.alert(responseJson.message);
        
        let notificationsList = [...this.state.notificationsList];
        notificationsList.splice(index, 1);

        await this.setStateAsync({
            notificationsList: notificationsList,
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
                    sensitivity={0}
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
                            onRefresh={() => this.getNotifications(true)}
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