import React from "react";
import { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Buffer } from 'buffer';
import  uuid  from 'react-native-uuid';
import * as Progress from 'react-native-progress';

function Question({navigation, route}) {
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState({a: "", b: "", c: ""})
    const [timer, setTimer] = useState(100);
    useEffect(() => {
        const splittedQuestion = route.params.response;
        
        setQuestion(Buffer.from(splittedQuestion.question, 'base64').toString('utf-8'));
        let a = Buffer.from(splittedQuestion.a, 'base64').toString('utf-8')
        let b = Buffer.from(splittedQuestion.b, 'base64').toString('utf-8')
        let c = Buffer.from(splittedQuestion.c, 'base64').toString('utf-8')
        setAnswers({a: a, b: b, c:c});

        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval) 
                return lastTimerCount - 1
            })
          }, 250);
          
          return () => {
              clearInterval(interval)
          }

    }, []);

      useEffect(() => {
        if (timer <= 0) {
            answerQuestion('d');
        }
      }, [timer]);

    const answerQuestion = (e) => {
        navigation.navigate('Logged', {answer: e, aid: uuid.v4(), qr_id: route.params?.response.qr_id});
    };
    return (
        <View style={styles.screen}>
            <Progress.Bar style={{margin: 40, alignSelf: 'center'}} progress={timer/100} width={200}/>
            <View style={styles.top_side}>
                <Text style={styles.title}>
                    {question}
                </Text>
                <Text style={styles.top_side}>
                Pozostało: {Math.floor(timer/4)}s
                </Text>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity id='a' style={styles.button} onPress={() => {answerQuestion('a')}}>
                    <Text style={styles.button_text}>
                        {answers.a}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity id='b' style={styles.button} onPress={() => {answerQuestion('b')}}>
                    <Text style={styles.button_text}>
                        {answers.b}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity id='c' style={styles.button} onPress={() => {answerQuestion('c')}}>
                    <Text style={styles.button_text}>
                        {answers.c}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        flex: 1,
        margin: 20
        //position: 'absolute',
        //top: '20%'
    },
    top_side: {
        flex: 1,
        alignSelf: 'center'
    },
    button: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 25,
        margin: 10
        
    },
    button_text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default Question;