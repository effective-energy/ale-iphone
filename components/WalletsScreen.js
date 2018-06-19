import React from 'react';
import { View, StyleSheet, Button, Text, StatusBar, Image, Alert } from 'react-native';
import SideMenu from 'react-native-side-menu';
import ls from 'react-native-local-storage';

import BottomNavigator from './layouts/BottomNavigator';
import WalletsSlider from './layouts/WalletsSlider';
import NewWalletBlock from './layouts/NewWalletBlock';
import Pageloader from './layouts/Pageloader';
import Leftmenu from './layouts/Leftmenu';

import { observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("counterStore")
export default class WalletsScreen extends React.Component {
    constructor(props: Object) {
        super(props);
	    this.state = {
            isOpenLeftMenu: false,
            walletsList: [],
            isLoaderPage: false
        };
        this.changePage = this.changePage.bind(this);
        this.requestMoney = this.requestMoney.bind(this);
        this.sendMoney = this.sendMoney.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    static navigationOptions = {
        header: null,
        headerLeft: null,
        gesturesEnabled: false,
        statusBarBackgroundColor: '#ffffff'
    };

    componentDidMount() {
        this.initialUserWallets();
    }

    initialUserWallets() {
        this.setState({ isLoaderPage: !this.state.isLoaderPage });
        ls.get('userToken').then((data) => {
            return fetch('https://ale-demo-4550.nodechef.com/users/user-wallets', {
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
                    walletsList: responseJson,
                    isLoaderPage: !this.state.isLoaderPage
                })
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    changePage(e) {
        this.props.navigation.navigate(e, { animation: null });
    }

    requestMoney(e) {
        this.props.navigation.navigate('RequestMoney', { animation: null, walletAddress: e });
    }

    sendMoney(e) {
        this.props.navigation.navigate('SendMoney', { animation: null, walletAddress: e });
    }

    signOut() {
        ls.remove('userToken').then(() => {
            return this.props.navigation.navigate('Login');
        })
    }

    render() {
        if (this.state.isLoaderPage) {
            return (<Pageloader title="Loading wallets..." />);
        }
        return (
            <SideMenu
                menu={
                    <Leftmenu
                        signOut={this.signOut}
                        huy="huy"
                    />
                }
                isOpen={this.state.isOpenLeftMenu}
            >
                <View
                    style={styles.pageContainer}
                >
                    <StatusBar
                        barStyle='light-content'
                    />
                    <WalletsSlider
                        walletsList={this.state.walletsList}
                        requestMoney={this.requestMoney}
                        sendMoney={this.sendMoney}
                    />
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

// class Leftmenu extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userEmail: '',
    //         userName: '',
    //         userAvatar: ''
    //     };
    // }

//     getUserAvatar() {
//         return `https://ale-demo-4550.nodechef.com/${this.state.userAvatar}`;
//     }

//     componentDidMount() {
//         this.getUserData();
//     }

    // getUserData() {
    //     ls.get('userToken').then((data) => {
    //         return fetch('https://ale-demo-4550.nodechef.com/users/get-user-data', {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': data
    //             },
    //         })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({
    //                 userEmail: responseJson.email,
    //                 userName: responseJson.name,
    //                 userAvatar: responseJson.avatar
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     });
    // }

//     render() {
//         return (
//             <View style={{ flex: 1, backgroundColor: '#091529', paddingTop: 50, paddingLeft: 20 }}>
//                 <View>
//                     <View>
//                         <Text style={{ color: '#ffffff', fontSize: 18 }}>Account</Text>
//                     </View>
//                     <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }}>
//                         <View style={{ marginRight: 10 }}>
//                             <Image
//                                 style={{width: 50, height: 50}}
//                                 source={{uri: this.getUserAvatar()}}
//                             />
//                         </View>
//                         <View style={{ display: 'flex', justifyContent: 'center' }}>
//                             <Text style={{ color: '#ffffff', fontSize: 18 }}>{this.state.userName}</Text>
//                             <Text style={{ color: '#ffffff', fontSize: 16 }}>{this.state.userEmail}</Text>
//                         </View>
//                     </View>
//                 </View>
//                 <View style={{ marginRight: 10, marginTop: 20 }}>
//                     <View style={{ backgroundColor: '#ffbb00', width: 200 }}>
//                         <Button
//                             title="Sign out"
//                             color="#000000"
//                         />
//                     </View>
//                     <View>
//                         <Text>2.0.1</Text>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }

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