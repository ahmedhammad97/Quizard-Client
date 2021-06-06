import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function GameScreen({ navigation }) {
    const roomCode = navigation.getParam('roomCode');
    const questions = navigation.getParam('questions');
    const playerName = navigation.getParam('playerName');
    const settings = navigation.getParam('settings');
    const socket = navigation.getParam('socket');
    const iconNames = ['arrow-up', 'arrow-down', 'repeat', 'undo']

    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentTimer, setCurrentTimer] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.firstHeadlineContainer}>
                <Text styles={styles.firstHeadline}>{`Room Code: ${roomCode}`}</Text>
                <Text styles={styles.firstHeadline}>{`Your Nick Name: ${playerName}`}</Text>
            </View>
            <Text style={styles.headline}>{`Timer: ${currentTimer} | Score: ${score}`}</Text>
            <Text style={styles.question}>{questions[questionIndex].question}</Text>
            <View style={styles.answerPanel}>
                {
                    questions[questionIndex].answers.map((answer, index) => {
                        return (
                            <Button 
                            key={index}
                            style={styles.answer}
                            type='outline'
                            title={'  ' + answer}
                            onPress={() => { setQuestionIndex(questionIndex+1); }}
                            icon={
                                <Icon
                                    name={iconNames[index]}
                                    size={30}
                                />
                            }
                            />
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginLeft: '10%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstHeadlineContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    firstHeadline: {
        fontSize: 15,
        flexGrow: 1
    },
    headline: {
        textAlign: 'center',
        fontSize: 20,
        color: 'grey',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        margin: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    answer: {
        margin: 10,
        flexGrow: 1,
        flexBasis: '40%'
    },
    answerPanel: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
});

export default GameScreen;