import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Search = ({textInput, setTextInput}) => {

  const clearText = () => {
    setTextInput(null)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(value) => setTextInput(value)}
        placeholder="Buscar Producto"
      />
      <Pressable onPress={()  =>  clearText()}>
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default Search