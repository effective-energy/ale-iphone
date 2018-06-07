import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class WelcomeScreen extends React.Component {
	static navigationOptions = {
        title: 'ALE Wallet'
    };

    render() {
	    return (
	      <View style={styles.container}>
	          <View>
	              <Image
	                  style={{width: 320, height: 66, resizeMode: 'contain' }}
	                  source={require('../assets/logo/ale.png')}
	              />
	          </View>
	          <View>
	              <View style={styles.buttonContainer}>
	                <Button
	                    title="Create new wallet"
	                    onPress={() => this.props.navigation.navigate('Newwallet')}
	                    color="#34343e"
	                  />
	              </View>
	              <View style={styles.buttonContainer}>
	                <Button
	                    title="Restore wallet"
	                    onPress={() => this.props.navigation.navigate('Restorewallet')}
	                    color="#34343e"
	                  />
	              </View>
	          </View>
	      </View>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    backgroundColor: '#ffd24f',
    borderRadius: 4,
    padding: 10,
    width: 300,
    marginBottom: 20
  }
});