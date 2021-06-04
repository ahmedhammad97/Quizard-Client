import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { uniqueNamesGenerator, colors, names } from 'unique-names-generator';
import Configs from '../config';

function JoinRoomScreen({ navigation }) {
    const [roomCode, onChangeCode] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Room Code..."
                keyboardType="numeric"
                style={styles.input}
                maxLength={5}
                onChangeText={onChangeCode}
            />

            <Button
                title="Join Room"
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btn}
                onPress={() => {
                    setErrorMsg('');
                    joinRoomRequest(roomCode, navigation)
                }}
            />

            <Text style={styles.error}>{errorMsg}</Text>
        </View>
    )

    function joinRoomRequest(roomCode, navigation) {
        // Send Request
        console.log("Sending request to " + Configs.serverURL)
        fetch(`${Configs.serverURL}/join`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                 'roomCode': roomCode
            })
         })
         .then(jresponse => jresponse.json())
         .then(res => {
             if (res.status) {
                 // Navigate to Waiting Room
                navigation.navigate('WaitingRoom', {
                    'roomCode': roomCode,
                    'isAdmin': false,
                    'playerName': uniqueNamesGenerator({
                        dictionaries: [colors, names],
                        style: 'capital',
                        separator: ' '
                    })
                })
             }
             else {
                setErrorMsg(res.message);
             }
         })
         .catch(error => {
             console.log(error);
         });
    }
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginLeft: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 25,
        height: 70,
        width: '80%',
        textAlign: 'center',
        margin: 30,
        borderWidth: 1,
        borderColor: 'grey'
    },
    btn: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTitle: {
        fontSize: 30,
        fontWeight: '600',
        padding: 20,
    },
    error: {
        fontSize: 25,
        color: 'red',
        fontWeight: 'bold'
    }
});

export default JoinRoomScreen;