import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            isOpenLeftMenu: false
        };
        this.changePage = this.changePage.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
    };

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    render() {
        return (
            <SideMenu menu={<Leftmenu />} isOpen={this.state.isOpenLeftMenu}>
                <View style={styles.pageContainer}>
                    <StatusBar barStyle='light-content' />
                    <WalletsSlider />
                    <NewWalletBlock />
                    {/*<View>
                        <Counter />
                    </View>
                    <View>
                        <Button
                            onPress={() => this.props.counterStore.increment()}
                            title="Increment Counter"
                            color="#805841"
                        />
                    </View>*/}
                    <BottomNavigator
                        changePage={this.changePage}
                        activePage="wallets"
                    />
                </View>
            </SideMenu>
        );
    }
}

class Leftmenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        return this.props.navigation.navigate('Login', { animation: null });
        AsyncStorage.getItem('userToken').then((value) => {
            return Alert.alert(value)
        })
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
                                source={{uri: 'https://pbs.twimg.com/profile_images/984770070571175936/aHxPljnr_bigger.jpg'}}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center' }}>
                            <Text style={{ color: '#ffffff', fontSize: 18 }}>User name</Text>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>username@alehub.io</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginRight: 10, marginTop: 20 }}>
                    <View style={{ backgroundColor: '#ffbb00', width: 200 }}>
                        <Button
                            title="Sign out"
                            color="#000000"
                            onPress={this.signOut}
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

@inject("counterStore")
@observer
class Counter extends React.Component {
  render() {
    return <Text>Count: {this.props.counterStore.count}</Text>;
  }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#091430'
    }
});