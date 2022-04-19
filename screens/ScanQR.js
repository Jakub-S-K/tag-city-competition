import React from "react";
import { useState, useEffect } from "react";
import { Text, Button, Alert, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import  uuid  from 'react-native-uuid';


function ScanQR({navigation, route}) {
    const [hasPermission, setHasPermission] = useState(null);
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        navigation.navigate({
            name: route.params.link_back,
            params: {
                hash: data,
                uid: uuid.v4()
            },
            merge: true
        });

    };

    if (hasPermission === null) {
      return <Text>Oczekiwanie na pozwolenie użycia kamery</Text>;
    }
    if (hasPermission === false) {
      return <Text>Brak dostępu do kamery</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={{margin:10}}>{route.params.text}</Text>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex:1
    }
})

export default ScanQR;