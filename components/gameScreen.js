import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Countdown from 'react-countdown';
import { Gyroscope } from 'expo-sensors'

function GameScreen({ navigation }) {
    const roomCode = navigation.getParam('roomCode');
    const questions = navigation.getParam('questions');
    const playerName = navigation.getParam('playerName');
    const settings = navigation.getParam('settings');
    const socket = navigation.getParam('socket');
    const iconNames = ['arrow-up', 'arrow-down', 'repeat', 'undo']
    

    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(Date.now() + (1000 * settings.time));
    const [answerLock, setAnswerLock] = useState(false);
    const [coordinates, setCoordinates] = useState({x: 0, y: 0, z: 0});
    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroscopeData => {
                setCoordinates(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);
        _subscribe();
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        if (coordinates.z > 2) processAnswer(questions[questionIndex].answers[3], questionIndex);
        else if (coordinates.z < -2) processAnswer(questions[questionIndex].answers[2], questionIndex);
        else if (coordinates.y > 2) processAnswer(questions[questionIndex].answers[0], questionIndex);
        else if (coordinates.z < -2) processAnswer(questions[questionIndex].answers[1], questionIndex);
    }, [coordinates]);

    useEffect(() => {
        socket.on("pointConfirmed", () => {
            setScore(score+1);
        });

        socket.on('winner', data => {
            navigation.navigate('End', {
                'isWinner': data === playerName,
                'winner': data,
                'roomCode': roomCode,
                'socket': socket
            })
        });
    });

    return (
        <View style={styles.container}>
            <View style={styles.firstHeadlineContainer}>
                <Text styles={styles.firstHeadline}>{`Room Code: ${roomCode}`}</Text>
                <Text styles={styles.firstHeadline}>{`Your Nick Name: ${playerName}`}</Text>
            </View>
            <View style={styles.secondHeadlineContainer}>
                <Countdown
                    key={questionIndex}
                    date={currentTime}
                    onComplete={() => { processNextQuestion(questionIndex); }}
                    renderer={({ hours, minutes, seconds, completed }) => {
                        if(completed) return <Text style={styles.secondHeadline}>{`Timer: `}</Text>
                        else return <Text style={styles.secondHeadline}>{`Timer: ${seconds}`}</Text>
                    }}
                    
                />
                <Text style={styles.secondHeadline}>{`Score: ${score}`}</Text>
            </View>
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
                            disabled={answerLock}
                            onPress={() => { processAnswer(answer, questionIndex) }}
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

    function processAnswer(answer, index) {
        if(answer === questions[index].correct && !answerLock) 
            socket.emit('correctAnswer', {'roomCode': roomCode, 'questionIndex': index});
        setAnswerLock(true);
    }

    function processNextQuestion(index) {
        if(index < questions.length - 1) {
            setQuestionIndex(index+1);
            setCurrentTime(currentTime + (1000 * settings.time));
            setAnswerLock(false);
        }
        else socket.emit("finalScore", {"roomCode": roomCode, "score": score});
    }
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
    secondHeadlineContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    secondHeadline: {
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