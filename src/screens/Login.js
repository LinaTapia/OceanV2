import { Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/colors'
import { auth_firebase } from '../firebase/auth_firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setIdToken, setUser } from '../redux/slice/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
        
    const handleLogin = async () => {
        try {
            // Intenta autenticar al usuario utilizando el método signInWithEmailAndPassword de Firebase
            const response = await signInWithEmailAndPassword(
                auth_firebase,
                email,
                password
            )
             // Almacenar el correo electrónico del usuario en el almacenamiento local (AsyncStorage)
            AsyncStorage.setItem('userEmail', response.user.email)
            // Despacha una acción Redux para establecer el correo electrónico y Token del usuario en el estado de la aplicación
            dispatch(setUser(response.user.email));
            dispatch(setIdToken(response._tokenResponse.idToken)) 
        } catch (e) {
            // En caso de error, registra un mensaje de error en la consola
            console.log('Error en Login', e)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
            placeholder='Usuario'
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            placeholder='Contraseña'
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button}>Iniciar</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('register')}>
            <Text style={styles.text}>¿No tienes cuenta? ¡Registrate!</Text>
        </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: '100%'
    },
    title: {
        fontSize: 24,
        fontFamily: 'BarlowBold',
        color: colors.black,
        marginBottom: 8
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
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }, 
    text:{
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        color: colors.blue,
    }
});


export default Login