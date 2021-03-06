import React from 'react';
import { StyleSheet, Text, View, Alert, AppRegistry, Button, TextInput, ScrollView } from 'react-native';

export default class ImportwalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: ''
        };
    }
    
    importWallet() {
        if (this.state.privateKey.length === 0) {
            return Alert.alert('Invalid secret key');
        } else {
            return this.props.navigation.navigate('Newwallet')
        }
    }
    static navigationOptions = {
        title: 'Import wallet',
    };
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.pageContainer}
                keyboardShouldPersistTaps='handled'
            >
                <View style={{ marginTop: 20, flex: 1, alignItems: 'center' }}>
                    <Text>Enter your private Key</Text>
                    <View style={{ width: '90%', height: 150, padding: 16, opacity: 1 }}>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, marginBottom: 20, borderRadius: 2, padding: 6 }}
                            onChangeText={(privateKey) => this.setState({privateKey})}
                            value={this.state.privateKey}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Import"
                                onPress={this.importWallet.bind(this)}
                                color="#34343e"
                              />
                          </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        backgroundColor: '#ffd24f',
        borderRadius: 4,
        padding: 10,
        width: 300,
        marginBottom: 20
    }
});