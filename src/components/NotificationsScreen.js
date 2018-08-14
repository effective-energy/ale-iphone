import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, ScrollView, FlatList, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import Markdown from 'react-native-simple-markdown';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import BottomNavigator from './layouts/BottomNavigator';
import Pageloader from './layouts/Pageloader';

import Config from '../config';

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth } = Dimensions.get('window');

class EmptyNotifications extends React.Component {
  render() {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>Notifications not found</Text>
        </View>
    );
  }
}

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

        let notifications = this.state.notificationsList.map(function (el, i) {
            return (
                <SwipeRow
                    disableRightSwipe={true}
                    rightOpenValue={-75}
                    key={i}
                    style={{
                        width: wp(80),
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                        shadowOpacity: 0.5,
                        shadowRadius: 50,
                        shadowColor: '#535968',
                        shadowOffset: {
                            height: 20,
                            width: 20
                        }
                    }}
                >
                    <View style={styles.standaloneRowBack}>
                        <Text style={styles.backTextWhite} onPress={() => this.removeNotification(el._id, i)}>Delete</Text>
                    </View>
                    <View style={styles.standaloneRowFront}>
                        <Markdown>{el.title}</Markdown>
                    </View>
                </SwipeRow>
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
                        {this.state.notificationsList.length !== 0 ? notifications : <EmptyNotifications />}
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
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        alignItems: 'center'
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#E8EBEE',
        justifyContent: 'center',
        height: 'auto',
        padding: 15,
        borderRadius: 5,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        borderRadius: 5,
    },
    backTextWhite: {
        color: '#FFF'
    },
});