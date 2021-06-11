import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

function EndScreen({ navigation }) {
    const isWinner = navigation.getParam('isWinner');
    const winnerName = navigation.getParam('winner');
    const roomCode = navigation.getParam('roomCode');
    const socket = navigation.getParam('socket');

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }, []);

    return (
        <View style={styles.container}>
            {
                isWinner ?
                <Text style={styles.headline}>You are the Winner!</Text> :
                <Text style={styles.headline}>{`${winnerName} is the Winner!`}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginLeft: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        textAlign: 'center',
        fontSize: 35,
        color: 'grey',
        margin: 30,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTitle: {
        fontSize: 30,
        fontWeight: '600',
        padding: 20,
    }
});

export default EndScreen;