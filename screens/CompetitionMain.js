import React from "react";
import {useEffect, useState} from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Filesystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import * as Progress from 'react-native-progress';

function LoggedMain({navigation, route}) {

    const [user_data, set_user_data] = useState({name: "", surname: "", team_number: ""});
    const [points, setPoints] = useState(0);
    
    let trigger = false;
  
    useEffect(() => {
        (async () => {
        const fileUri = Filesystem.documentDirectory + 'user_data.json';
        //await Filesystem.deleteAsync(fileUri);
        const fileInfo = await Filesystem.getInfoAsync(fileUri);

        if (fileInfo.exists) {
            const data_file = await Filesystem.readAsStringAsync(fileUri);
             set_user_data(JSON.parse(data_file));
            //console.log('string_user_data ');
            //console.log(user_data);
            //console.log('user_data: ' + user_data.surname);
        }  else {
            
            const response = fetch('https://qr-tag-competition.herokuapp.com/userinfo',
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({hash: route.params?.user_id})
            }).then(response => response.json())
            .then((responseJson) => {
                //console.log("endpoint data " + JSON.stringify(responseJson));
                set_user_data(responseJson)
                Filesystem.writeAsStringAsync(fileUri, JSON.stringify(responseJson))
                .then(() => {
                })
            })
            .catch((error) => {
              console.error(error);
            }); 
        }
    })();
    }, []);
    useEffect(() => {
      
      if (route.params ?. hash) {
        //console.log(route.params?.hash);
        //console.log(route.params?.id);
        const response = fetch('https://qr-tag-competition.herokuapp.com/question',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({qr_id: route.params?.hash})
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.ok === false) {
            //console.log(responseJson);
            alert('Niepoprawny kod QR');
          } else {
              console.log('response');
              console.log(responseJson);
              navigation.navigate('Question', {response: responseJson});
          }
        })//, route.params?.trigger    , trigger: route.params?.trigger
        .catch((error) => {
          console.error(error);
        });
          
      }
  }, [route.params ?. uid]); 
  useEffect(() => {
    if(route.params?.aid) {
      console.log(route.params?.answer);
      

    const response = fetch('https://qr-tag-competition.herokuapp.com/answer',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({qr_id: route.params?.qr_id, hash: user_data.hash, answer: route.params?.answer})
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.ok === false) {
            
            alert('Odpowiedź na to pytanie została już udzielona');
          } else {
            alert('OK');
              //TODO message seny green indicator
          }
        })//, route.params?.trigger    , trigger: route.params?.trigger
        .catch((error) => {
          console.error(error);
        });
    }


  }, [route.params?.aid])

    return (
        <View style={{...styles.screen, flex:1}}>
           <Text style={{position: 'absolute', top: '5%', left: '1%'}}> Lider:  {user_data.name} {user_data.surname}</Text>
         <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{...styles.button_text, color: '#000', margin: 60}}>Zdobyte punkty</Text>
           <Text style={{position: 'absolute', top: '35%', left: '29%', color:'#00f'}}>{points}/18</Text>
           <Progress.Pie styles={styles.pie} progress={0.6} size={200}/>
         </View>
         <View style={styles.screen}>
             <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('ScanQR', {text: "Zeskanuj kod QR pytania", link_back: "Logged"})}}>
                 <Text style={styles.button_text}>Skanuj kod QR</Text>
             </TouchableOpacity>
         </View>
       </View>
       );
  }

  const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      button: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    button_text: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    pie: {
      alignSelf: 'center',
    }
  })

  export default LoggedMain;