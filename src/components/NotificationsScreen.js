import React from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text, Dimensions, Switch, Alert, ScrollView, FlatList, RefreshControl } from 'react-native';
import ls from 'react-native-local-storage';
import Markdown from 'react-native-simple-markdown';
import { observer, inject } from "mobx-react";
import BottomNavigator from './layouts/BottomNavigator';
import Pageloader from './layouts/Pageloader';
import isIphoneX from '../config/isIphoneX';
import Moment from 'react-moment';

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

function parseNotificationText (text) {
    return text.replace(/(<([^>]+)>)/ig,'');
}

@inject("notificationsStore")
@observer
export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isLoaderPage: true,
            notificationsList: [],
            isRefreshShow: false
        };

        this.changePage = this.changePage.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }
    
    static navigationOptions = {
        title: "Notifications",
        headerLeft: null,
        gesturesEnabled: false,
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    componentDidMount() {
        this.props.notificationsStore.getNotifications();
    }

    changePage(e) {
        this.props.navigation.navigate(e);
    }

    removeNotification(id, index) {
        this.props.notificationsStore.removeNotification({
            id: id,
            index: index
        });
    }

    render() {
        if (this.props.notificationsStore.isLoader) {
            return (<Pageloader title="Loading notifications..." />);
        }

        let notifications = this.props.notificationsStore.notifications.map(function (el, i) {
            return (
                <View style={styles.row}>
                    <View style={styles.rowFront}>
                        <Markdown>
                            {parseNotificationText(el.title)}
                        </Markdown>
                         <Moment
                            element={Text}
                            format="DD MMM in HH:mm"
                            style={{marginTop: 10}}
                        >
                            {el.date}
                        </Moment>
                    </View>
                </View>
            )
        }, this);

        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                <ScrollView
                    contentInset={{bottom: isIphoneX === true ? 104 : 80}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.props.notificationsStore.refreshNotifications()}
                            refreshing={this.props.notificationsStore.isRefreshLoader}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <View style={{ width: wp(100), display: 'flex', alignItems: 'center' }}>
                        {this.props.notificationsStore.notifications.length !== 0 ? notifications : <EmptyNotifications />}
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
    row: {
        width: wp(80),
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowOpacity: 0.5,
        shadowRadius: 50,
        shadowColor: '#535968',
        shadowOffset: {
            height: 20,
            width: 20
        }
    },
    rowFront: {
        backgroundColor: '#E8EBEE',
        height: 'auto',
        padding: 15,
        borderRadius: 5,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#F44336',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15,
        borderRadius: 5,
    },
    rowBack_text: {
        color: '#FFFFFF'
    },
});