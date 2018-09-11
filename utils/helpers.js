import { StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

const colors = ['#FFC90E', '#A349A4', '#FF7F27', '#22B14C']

export function getRandomColor(currNum) {
    let result;
    const randomNum = () => result = Math.floor(Math.random() * 4);

    randomNum()

    while(result === currNum) {
        randomNum()
    }

    return {
        index: result,
        color: colors[result]
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
        top: 150,
        zIndex: 100,
        fontSize: 80,
        fontWeight: 'bold',
    },
    arrow: {
    },
    loseText: {
        fontSize: 50,
        color: '#2b2dd8',
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#2b2dd8',
        width: 200,
        height: 50
    },
    record: {
        fontSize: 50,
        color: '#2b2dd8',
        fontWeight: 'bold',
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    buttonText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
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