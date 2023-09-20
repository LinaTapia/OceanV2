import {Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors';

const ProductItem = ({item, navigation}) => {
  return (
      <Pressable style={styles.items} onPress={() => navigation.navigate("productDetail", {item: item})}>
        <Image
          style={styles.image}
          source={{
            uri: item.images[0],
          }}
        />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>${item.price.toLocaleString("de")}</Text>
      </Pressable>
  )
}

const styles = StyleSheet.create({
    items: {
        textTransform: 'capitalize',
        padding: 12,
        borderWidth: 1,
        backgroundColor: colors.white,
        margin:8,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: colors.black,
        fontSize: 18,
        fontFamily: "BarlowSemiBold"
    },
    image:{
      width: "100%",
      height: 200
    }
});


export default ProductItem