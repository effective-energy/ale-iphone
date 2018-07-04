import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Spinner extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    render() {
    	return (
    		<View>
                <Image
                    style={{ width: 44, height: 44 }}
                    source={require('../../assets/images/icons/spinner.svg')}
                />
            </View>
    	)
    }
}

const styles = StyleSheet.create({

});