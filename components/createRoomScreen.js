import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { Button } from 'react-native-elements';
import { uniqueNamesGenerator, colors, names } from 'unique-names-generator';
import Configs from '../config';

function createRoomScreen({ navigation }) {
    const [numberValue, setNumberValue] = useState(10);
    const [numberItems, setNumberItems] = useState([
        {label: '10', value: 10},
        {label: '15', value: 15},
        {label: '20', value: 20},
    ]);

    const [timeValue, setTimeValue] = useState(15);
    const [timeItems, setTimeItems] = useState([
        {label: '15 seconds', value: 15},
        {label: '10 seconds', value: 10},
        {label: '5 seconds', value: 5},
    ]);

    const [categoryValue, setCategoryValue] = useState('geography');
    const [categoryItems, setCategoryItems] = useState([
        {label: ' Geography ', value: 'geography'},
        {label: 'Celebrities', value: 'celebrities'},
        {label: '  Brands   ', value: 'brands'},
        {label: '  Sports   ', value: 'sports'},
        {label: '  Animals  ', value: 'animals'}
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Select Game Settings</Text>

            <Text style={styles.radioTitle}>Number of Questions</Text>
            <RadioForm
            style={styles.radioGroup}
            radio_props={numberItems}
            formHorizontal={true}
            labelHorizontal={false}
            initial={0}
            onPress={(value) => {setNumberValue(value);}}
            />

            <Text style={styles.radioTitle}>Time Per Question</Text>
            <RadioForm
            style={styles.radioGroup}
            formHorizontal={true}
            labelHorizontal={false}
            radio_props={timeItems}
            initial={0}
            onPress={(value) => {setTimeValue(value);}}
            />

            <Text style={styles.radioTitle}>Category</Text>
            <RadioForm
            style={styles.radioGroup}
            radio_props={categoryItems}
            initial={0}
            onPress={(value) => {setCategoryValue(value);}}
            />

            <Button
                title="Create Room"
                titleStyle={styles.btnTitle}
                buttonStyle={styles.btn}
                onPress={() => {
                    createRoomRequest(numberValue, timeValue, categoryValue, navigation)
                }}
            />
            
        </View>
    )

    function createRoomRequest(number, time, category, navigation) {
        // Send Request
        console.log("Sending request to " + Configs.serverURL)
        fetch(`${Configs.serverURL}/create`, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
                'settings': {
                    'number': number,
                    'time': time,
                    'category': category
                }
           })
        })
        .then(jresponse => jresponse.json())
        .then(res => {
            // Get the Code
            let roomCode = res.code.toString();
            // Navigate to Waiting Room
            navigation.navigate('WaitingRoom', {
                'roomCode': roomCode,
                'isAdmin': true,
                'playerName': uniqueNamesGenerator({
                    dictionaries: [colors, names],
                    style: 'capital',
                    separator: ' '
                })
            })
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

export default createRoomScreen;