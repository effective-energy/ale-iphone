import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Carousel from 'react-native-carousel-view';

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    sendTokens() {

    }

    receiveTokens() {

    }

	render() {
		return (
			<View>
            	<View style={styles.container}>
                    <Carousel
                        width={400}
                        height={200}
                        delay={2000}
                        indicatorAtBottom={true}
                        indicatorSize={10}
                        loop={true}
                        animate={false}
                        indicatorColor="red"
                    >
                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={{ textAlign: 'center' }}>Wallet 1</Text>
                                <Text style={{ textAlign: 'center' }}>9,999,999.1 ALE</Text>
                            </View>
                        </View>

                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={{ textAlign: 'center' }}>Wallet 2</Text>
                                <Text style={{ textAlign: 'center' }}>9,999,999.1 ALE</Text>
                            </View>
                        </View>

                        <View style={styles.contentContainer}>
                            <View>
                                <Text style={{ textAlign: 'center' }}>Wallet 3</Text>
                                <Text style={{ textAlign: 'center' }}>9,999,999.1 ALE</Text>
                            </View>
                        </View>

                    </Carousel>
                </View>
            </View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc'
  }
});