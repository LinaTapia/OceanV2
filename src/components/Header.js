import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from "../theme/colors";
import { AntDesign } from '@expo/vector-icons';

const Header = ({title, navigation}) => {
  console.log(title);
  return (
    <View style={styles.container}>
      { title != "Categorias" ?   
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </Pressable> : ""}
      <Text style={styles.text}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.black,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 16,
    },
    text: {
      color: colors.white,
      fontSize: 24,
      fontFamily: 'BarlowBold',
      textTransform: 'capitalize',
      marginHorizontal:  12
    }
});

export default Header