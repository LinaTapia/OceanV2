import { Text, TextInput, Pressable, StyleSheet, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme/colors'
import { auth_firebase } from '../firebase/auth_firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    // Función para manejar el registro de usuario
    const handleRegister = async () => {
        try {
          // Intenta crear un nuevo usuario con el correo electrónico y la contraseña proporcionados
          const response = await createUserWithEmailAndPassword(
            auth_firebase,
            email,
            password
          )
          // Navega a la pantalla de inicio de sesión después de un registro exitoso
          navigation.navigate('login')
        } catch (e) {
          console.log('Error en registro', e)
           // Manejo de errores específicos y actualización de mensajes de error
          if(e.message === 'Firebase: Error (auth/missing-email).'){
            setEmailError('Este campo es obligatorio')
          }else if(e.message === 'Firebase: Error (auth/missing-password).'){
            setPasswordError('Este campo es obligatorio')
          }else if(e.message === 'Firebase: Error (auth/invalid-email).'){
            setEmailError('Email Inválido')
          }else if(e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setPasswordError('La contraseña debe contener más de 6 carácteres')
          }else if(e.message === 'Firebase: Error (auth/email-already-in-use).'){
            setEmailError('Este correo ya existe')
          }
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text  style={styles.title}>Registro</Text>
      <TextInput
        placeholder='Email'
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {emailError &&  <Text style={styles.textError}>{emailError}</Text>}
      <TextInput
            placeholder='Contraseña'
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
      />
      {passwordError &&  <Text style={styles.textError}>{passwordError}</Text>}
       <TouchableOpacity onPress={() => handleRegister()}>
            <Text style={styles.button}>Registrarse</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.navigate('login')}>
            <Text style={styles.text}>¿Ya tienes una cuenta? Inicia sesión.</Text>
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
    },
    textError:{
        fontSize: 16,
        color: colors.red,
    }
});


export default Register