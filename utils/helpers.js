import { StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

const colors = ['#FFC90E', '#A349A4', '#FF7F27', '#22B14C']

export function getRandomColor(currNum) {
    const randomNum = Math.floor(Math.random() * 4);
    if (randomNum === currNum) {
        return getRandomColor(currNum)
    }
    return {
        index: randomNum,
        color: colors[randomNum]
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200
    },
    count: {
        top: 130,
        zIndex: 100,
        fontSize: 50
    },
    loseText: {
        fontSize: 50,
        color: '#ff5959'
    },
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ff5959',
    },
    record: {
        fontSize: 20,
        color: '#c1ffb2'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    buttonText: {
        fontSize: 30
    }
});

export function fetchRecord() {
    return AsyncStorage.getItem('record').then((value) => {
        if (value) {
            return JSON.parse(value).record
        }

        return 55
    })
}

export function submitRecord(value) {
    AsyncStorage.mergeItem('record', JSON.stringify({
        'record': value
    }))
}