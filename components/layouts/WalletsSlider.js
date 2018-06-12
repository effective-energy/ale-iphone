import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Carousel from 'react-native-carousel-view';

export default class WalletsSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Carousel
                delay={2000}
                indicatorAtBottom={true}
                indicatorSize={10}
                loop={true}
                animate={false}
                indicatorColor="red"
            >
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#cccccc', height: 170 }}>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>Wallet 1</Text>
                            <Text>9,999,999.1 ALE</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                <Button
                                    onPress={this.sendTokens}
                                    title="Send"
                                    color="#34343e"
                                    />
                                </View>
                            </View>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                    <Button
                                        onPress={this.receiveTokens}
                                        title="Receive"
                                        color="#34343e"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ backgroundColor: '#cccccc', height: 170 }}>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>Wallet 2</Text>
                            <Text>500 ALE</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                <Button
                                    onPress={this.sendTokens}
                                    title="Send"
                                    color="#34343e"
                                    />
                                </View>
                            </View>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                    <Button
                                        onPress={this.receiveTokens}
                                        title="Receive"
                                        color="#34343e"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ backgroundColor: '#cccccc', height: 170 }}>
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 20, marginBottom: 10 }}>Wallet 3</Text>
                            <Text>0 ALE</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                <Button
                                    onPress={this.sendTokens}
                                    title="Send"
                                    color="#34343e"
                                    />
                                </View>
                            </View>
                            <View style={{ width: '50%', height: 40, alignItems: 'center' }}>
                                <View style={{ width: '80%', height: 40, backgroundColor: '#ffd24f', borderRadius: 4 }}>
                                    <Button
                                        onPress={this.receiveTokens}
                                        title="Receive"
                                        color="#34343e"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Carousel>
        )
    }

    sendTokens() {

    }

    receiveTokens() {

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc'
  }
});