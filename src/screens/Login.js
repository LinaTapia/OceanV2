import { Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/colors'
import { auth_firebase } from '../firebase/auth_firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setIdToken, setUser } from '../redux/slice/authSlice'

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
        
    const handleLogin = async () => {
        try {
        const response = await signInWithEmailAndPassword(
            auth_firebase,
            email,
            password
        )
        console.log(response)
        dispatch(setUser(response.user.email));
        dispatch(setIdToken(response._tokenResponse.idToken)) 
        } catch (e) {
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