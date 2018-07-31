import React from 'react';
import ls from 'react-native-local-storage';

import Pageloader from './layouts/Pageloader';

export default class InitialScreen extends React.Component {
	constructor(props) {
        super(props);
	    this.state = {};
    }

    componentDidMount() {
        ls.get('userToken').then((data) => {
            if (data !== null) {
                return this.props.navigation.navigate('Wallets');
            }
            return this.props.navigation.navigate('Login');
        });
    }

    render() {
        return(
            <Pageloader title="Loading application..." />
        );
    }
}