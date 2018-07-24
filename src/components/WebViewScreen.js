import React from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;

        return {
            title: params.title
        };
    };

    render() {
    	const { params } = this.props.navigation.state;
    	return (
    		<WebView source={{uri: params.url}} />
    	);
    }
}