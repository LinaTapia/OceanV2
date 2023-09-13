import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from "../theme/colors";

const Header = ({title}) => {
  return (
    <View style={styles.container}>
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
      padding: 16,
    },
    text: {
      color: colors.white,
      fontSize: 24,
      fontFamily: "BarlowBold"
    }
});

export default Header