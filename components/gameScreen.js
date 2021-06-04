import React from 'react';
import { Text, View } from 'react-native';

function GameScreen({ navigation }) {
    const roomCode = navigation.getParam('roomCode');
    const questions = navigation.getParam('questions');
    const playerName = navigation.getParam('playerName');
    const socket = navigation.getParam('socket');
    
    return (
        <View>
            <Text>{JSON.stringify(navigation.getParam('questions'))}</Text>
        </View>
    )
}

export default GameScreen;