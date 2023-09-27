import { Image, Pressable, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  Header  from '../components/Header'
import { colors } from '../theme/colors';

const Profile = () => {
  return (
    <SafeAreaView>
        <Header title="Mi Perfil" />
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"}}/>
            <Pressable>
                <Text style={styles.button}>Cámara</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.button}>Galeria</Text>
            </Pressable>
            <Pressable>
                <Text style={styles.button}>Mapa</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 100
    },
    button: {
        fontSize: 20,
        fontFamily: "BarlowBold",
        color: colors.white,
        backgroundColor: colors.black,
        marginTop: 16,
        padding: 8,
        textAlign: 'center',
        width: 200
    }
});

export default Profile