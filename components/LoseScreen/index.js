import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { styles } from '../../utils/helpers'

export default class extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../../assets/img/back.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.loseText}>YOU LOST</Text>
                    <TouchableOpacity onPress={() => navigate('GameScreen')}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Restart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}