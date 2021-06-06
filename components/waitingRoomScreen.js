import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { io } from "socket.io-client";
import Configs from '../config'
import { Button } from 'react-native-elements';

function WaitingRoomScreen({ navigation }) {
    const roomCode = navigation.getParam('roomCode');
    const isAdmin = navigation.getParam('isAdmin');
    const playerName = navigation.getParam('playerName');

    const [socket, setSocket] = useState(io(Configs.serverURL, { autoConnect: false }));
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        // Rotate Screen
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }, []);

    useEffect(() => {
        socket.connect();
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to Socket Server");
        });

        socket.on('initialConnection', data => {
            socket.emit('initialConnectionResponse', {
                'name' : playerName,
                'roomCode' : roomCode
            });
        });

        // Listen to PlayerCount event
        socket.on("playerCounter", data => {
            setPlayerCount(data);
        });

        // Listen to StartGame Fail
        socket.on("gameStartFailed", data => {
            console.log("Game Start Failed");
        });

        // Listen to StartGame event
        socket.on("questions", data => {
            navigation.navigate('Game', {
                'questions': data.questions,
                'settings': data.settings,
                'roomCode': roomCode,
                'playerName': playerName,
                'socket': socket
            });
        });
    });

        
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>{`Room Code: ${roomCode} | Your Nickname: ${playerName}`}</Text>
            <Text>{`Waiting for Admin to Start | Current Players: ${playerCount}`}</Text>
            {
                isAdmin && <Button
                    titleStyle={styles.btnTitle}
                    buttonStyle={styles.btn}
                    title={"Start Game"}
                    disabled={!(playerCount > 1 && playerCount < 5)}
                    onPress={() => {
                        socket.emit('startGame', {'roomCode': roomCode});
                    }}
                /> 
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
        fontSize: 20,
        color: 'grey',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioTitle: {
        fontSize: 15,
        marginTop: 10
    },
    radioGroup: {
        marginBottom: 20,
        padding: 10,
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

export default WaitingRoomScreen;