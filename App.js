import { useContext, createContext } from 'react';
import {AppRegistry, Text, TextInput, View, Button, StyleSheet, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/LoginScreen';
import ScanQR from './screens/ScanQR';
import LoggedMain from './screens/CompetitionMain';
import Question from './screens/Question';

const UserContext = createContext()
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator mode="modal" initialRouteName="Home">
                <Stack.Screen name="Home"
                    component={HomeScreen}
                    options={{
                      headerShown: false
                    }}/>
                <Stack.Screen name="ScanQR"
                    component={ScanQR}
                    options={{
                      title: 'Zeskanuj kod QR',
                    }}/>
                <Stack.Screen name="Logged"
                    component={LoggedMain}
                    options={{
                      headerShown: false
                    }}/>
                <Stack.Screen name="Question"
                    component={Question}
                    options={{
                      headerShown: false
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);