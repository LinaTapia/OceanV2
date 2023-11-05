import { Image, Pressable, StyleSheet, View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  Header  from '../components/Header'
import { colors } from '../theme/colors'
import * as ImagePicker from 'expo-image-picker'
import { usePutImageMutation } from '../services/ecApi'
import { useGetImageQuery } from '../services/ecApi'
import { ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import * as Location from 'expo-location';
import { clearUser } from '../redux/slice/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {
    const [putImage, result] = usePutImageMutation()
    const { data, isLoading, error, isError, refetch } = useGetImageQuery();
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch()
    // Función para seleccionar una imagen de la biblioteca
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
          base64: true,
        })
        // Si la selección de la imagen no fue cancelada, la sube y refresca los datos
        if (!result.canceled) {
          await putImage({
            image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          });
    
          refetch()
        }
    }
    // Función para abrir la cámara y tomar una foto
    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("No le has dado permiso a la App para acceder a tu cámara")
          return
        } else {
          const result = await ImagePicker.launchCameraAsync({
            base64: true,
          });

          // Si la captura de la imagen no fue cancelada, la sube y refresca los datos
          if (!result.canceled) {
            await putImage({
              image: `data:image/jpeg;base64,${result.assets[0].base64}`,
            })
            refetch()
          }
        }
      }
      // Función para obtener las coordenadas del usuario
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
      // Función para manejar el cierre de sesión
      const handleLogout = async () => {
        try {
            dispatch(clearUser())
            await AsyncStorage.removeItem("userEmail")
            navigation.navigate("rootNavigation")
        } catch (error) {
          console.log(error)
        }
      }
      // Función para mostrar un diálogo de confirmación antes de cerrar sesión
      const onLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro que deseas cerrar sesión?', [
          {
            text: 'No',
          },
          {text: 'Si', onPress: () => handleLogout()},
        ]);
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
            <Pressable onPress={() => onLogout()}>
                <Text style={styles.button}>Cerrar Sesión</Text>
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