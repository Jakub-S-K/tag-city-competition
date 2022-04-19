// Homescreen.js
import React from 'react';
import { useState, useEffect } from 'react';
import {TouchableOpacity, Text, View, Alert, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';




function HomeScreen({navigation, route}) {
    useEffect(() => {
        if (route.params ?. hash) {
            console.log(route.params?.hash);
            const response = fetch('https://qr-tag-competition.herokuapp.com/checkuser',
            {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({hash: route.params?.hash})
            }).then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.ok == true) {
                navigation.replace('Logged', {user_id: route.params?.hash});
              } else {
                  alert("Kod niepoprawny");
              }
            })
            .catch((error) => {
              console.error(error);
            });
            
        }
    }, [route.params ?. uid]);

    return (
        <View style={styles.main_view}>
            <View style= {{justifyContent: 'center', flex: 1}}>
                <Text style={{
                    padding: 20,
                    fontSize: 20,
                }}>Powiatowy Konkurs języka niemieckiego</Text>
            </View>
            <View style={{flex:1}}>
            <TouchableOpacity 
                style={styles.button}
                onPress={
                    () => navigation.navigate('ScanQR', {text: "Zeskanuj kod otrzymany podczas rejestracji", link_back: "Home"})
                }>
                    <Text style={styles.button_text}>
                    Rozpocznij
                    </Text>

                    </TouchableOpacity>

            </View>
                
        </View>
    );
}
const styles = StyleSheet.create({
    main_view: {
        flexDirection: "column",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})
export default HomeScreen;