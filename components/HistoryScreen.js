import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';

import BottomNavigator from './layouts/BottomNavigator';
import TransactionBlock from './layouts/TransactionBlock';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
            isActive: false
        };

        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        title: "Operations history"
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar barStyle='dark-content' />
                
                <ScrollView
                    contentInset={{bottom:49}}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            tintColor="#000000"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#EBEBEB"
                        />
                    }
                >
                    <View style={{ marginTop: 20 }}>
                        <TransactionBlock />
                    </View>
                </ScrollView>
                <BottomNavigator
                    changePage={this.changePage}
                    activePage="history"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#e8ebee',
        alignItems: 'center'
    }
});