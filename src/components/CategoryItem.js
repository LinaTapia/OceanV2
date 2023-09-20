import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors';

const CategoryItem = ({item, navigation}) => {
  return (
    <Pressable onPress={() => navigation.navigate("products", {item: item})}>
      <Text style={styles.items}>{item}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    items: {
        textTransform: 'capitalize',
        padding: 12,
        borderWidth: 1,
        backgroundColor: colors.black,
        color: colors.white,
        fontSize: 18,
        margin:8,
        fontFamily: "BarlowSemiBold"
    }
});

export default CategoryItem