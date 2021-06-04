import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as ScreenOrientation from 'expo-screen-orientation';

function HomeScreen({ navigation }) {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Quizard App</Text>

            <Button
                title="Create Room"
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('CreateRoom')}
            />

            <Button
                title="  Join Room  "
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('JoinRoom')}
            />
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

export default HomeScreen;