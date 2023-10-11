import { Image, Pressable, StyleSheet, View, Text,  } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  Header  from '../components/Header'
import { colors } from '../theme/colors'
import * as ImagePicker from 'expo-image-picker'
import { usePutImageMutation } from '../services/ecApi'
import { useGetImageQuery } from '../services/ecApi'
import { ActivityIndicator } from 'react-native'

import * as Location from 'expo-location';

const Profile = ({navigation}) => {
    const [putImage, result] = usePutImageMutation()
    const { data, isLoading, error, isError, refetch } = useGetImageQuery();
    const [location, setLocation] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64: true,
        })
    
        if (!result.canceled) {
          await putImage({
            image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          });
    
          refetch()
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("No le has dado permiso a la App para acceder a tu cámara")
          return
        } else {
          const result = await ImagePicker.launchCameraAsync({
            base64: true,
          });

    
          if (!result.canceled) {
            await putImage({
              image: `data:image/jpeg;base64,${result.assets[0].base64}`,
            })
            refetch()
          }
        }
      }

      const getCoords = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
    
        if (status !== "granted") {
          console.log("El permiso fue denegado")
          return
        }
        let location = await Location.getCurrentPositionAsync({})
        setLocation(location);
        navigation.navigate("mapaLoc", { location }) 
      }
    
  return (
    <SafeAreaView>
        <Header title='Mi Perfil' />
        <View style={styles.container}>
        {isLoading ? (<ActivityIndicator style={{ flex: 1, margin: 12 }} size="large"/>) 
            :
         (<Image style={styles.image} source={{uri: data ? data.image : 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png'}}/>)}
            <Pressable onPress={() => openCamera()}>
                <Text style={styles.button}>Cámara</Text>
            </Pressable>
            <Pressable onPress={() => pickImage()}>
                <Text style={styles.button}>Galeria</Text>
            </Pressable>
            <Pressable onPress={() => getCoords()}>
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
        fontFamily: 'BarlowBold',
        color: colors.white,
        backgroundColor: colors.black,
        marginTop: 16,
        padding: 8,
        textAlign: 'center',
        width: 200
    }
});

export default Profile