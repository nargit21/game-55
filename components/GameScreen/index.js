import React, { Component } from 'react';
import {
    Text,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
    getRandomColor,
    styles,
    submitRecord,
    fetchRecord
} from '../../utils/helpers';

export default class GameScreen extends Component {
    state = {
        rotateValue: new Animated.Value(0),
        rotateBack: true,
        clickCount: 55,
        rotationSpeed: 3000,
        currColor: null,
        record: 55,
        targetColor: {
            index: 0,
            color: '#c1ffb2'
        },
    }

    startAnimation() {
        const { rotateBack, rotateValue } = this.state;
        const rotateDirection = rotateBack ? 0 : 1;
        const reverseRotateDirection = Number(rotateBack);

        Animated.timing(
            rotateValue,
            {
                toValue: rotateDirection,
                duration: this.calculateRotationSpeed(),
                easing: Easing.linear,
            }
        ).start(() => {
            if (rotateValue._value === rotateDirection) {
                rotateValue.setValue(reverseRotateDirection)
                this.startAnimation()
            }
        })

    }

    calculateRotationSpeed() {
        const { rotationSpeed, rotateBack, rotateValue } = this.state;
        const value = rotateValue._value;

        if (rotateBack) {
            return value * rotationSpeed;
        } else if (!rotateBack) {
            return (1 - value) * rotationSpeed;
        }
    }

    pressHandler() {
        const { rotateValue } = this.state;
        this.pressLoseTracker()

        this.setState((curr) => {
            return {
                rotateBack: !curr.rotateBack,
                clickCount: curr.clickCount - 1,
                rotationSpeed: curr.rotationSpeed - 40,
                targetColor: getRandomColor(curr.targetColor.index)
            }
        }, () => {
            this.winTracker()
            this.startAnimation()
        })
    }

    winTracker() {
        const { clickCount } = this.state;
        const { navigate } = this.props.navigation;

        clickCount === 0 && navigate('WinScreen')
    }

    pressLoseTracker() {
        const { rotateValue, targetColor } = this.state;
        const value = rotateValue._value.toFixed(2);
        const { navigate } = this.props.navigation;

        if (value >= 0 && value <= 0.25) {
            targetColor.index !== 0 && navigate('LoseScreen')
        } else if (value >= 0.25 && value <= 0.5) {
            targetColor.index !== 1 && navigate('LoseScreen')
        } else if (value >= 0.5 && value <= 0.75) {
            targetColor.index !== 2 && navigate('LoseScreen')
        } else if (value >= 0.75 && value <= 1) {
            targetColor.index !== 3 && navigate('LoseScreen')
        }
    }

    rotationLoseTracker(colorIndex) {
        const { targetColor, rotateBack, rotateValue } = this.state;
        const { navigate } = this.props.navigation;

        if (!rotateBack && targetColor.index === colorIndex) {
            rotateValue.stopAnimation()
            navigate('LoseScreen')
        } else if (
            rotateBack &&
            (
                targetColor.index === colorIndex + 1 ||
                targetColor.index === colorIndex - 3
            )) {
            rotateValue.stopAnimation()
            navigate('LoseScreen')
        }
    }

    componentDidMount() {
        const { rotateValue } = this.state;
        fetchRecord().then(value => this.setState({ record: value }));

        rotateValue.addListener(callback => {
            const value = callback.value.toFixed(2) + '';

            switch (value) {
                case '0.25': {
                    this.rotationLoseTracker(0)
                    break;
                } case '0.50': {
                    this.rotationLoseTracker(1)
                    break;
                } case '0.75': {
                    this.rotationLoseTracker(2)
                    break;
                } case '1.00': {
                    this.rotationLoseTracker(3)
                    break;
                }
            }
        })
    }

    componentWillUnmount() {
        const { clickCount, record, rotateValue } = this.state;


        rotateValue.removeAllListeners()

        if (record > clickCount) {
            submitRecord(clickCount)
        }
    }

    currRotationAmount() {
        const { rotateValue } = this.state;
        const amount = rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
            useNativeDriver: true
        })

        return amount;
    }

    render() {
        const { clickCount, targetColor, record } = this.state;

        return (
            <ImageBackground source={require('../../assets/img/back.jpg')} style={styles.backgroundImage}>
                <TouchableWithoutFeedback onPress={() => this.pressHandler()} >
                    <View style={styles.container}>
                        {
                            record !== 55 && <Text style={styles.record}>
                                {`YOUR BEST: ${record}`}
                            </Text>
                        }
                        <Text style={[styles.count, style = { color: targetColor.color }]}>
                            {clickCount}
                        </Text>
                        <Animated.Image
                            source={require('../../assets/img/circle.png')}
                            style={[styles.image, { transform: [{ "rotate": this.currRotationAmount() }] }]}
                        />
                        <Entypo name='arrow-bold-up' size={100} color={targetColor.color} />
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        );
    }
}