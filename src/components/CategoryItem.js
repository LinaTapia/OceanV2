import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import { setCategory } from '../redux/slice/homeSlice'
import { useDispatch } from 'react-redux'

const CategoryItem = ({item, navigation}) => {
  const dispatch = useDispatch()
  return (
    <Pressable onPress={() => {
        dispatch(setCategory(item))
        navigation.navigate("products", {item: item})
      }}>
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