import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'
import  Header  from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProductDetail = ({route,navigation}) => {
    const { item } = route.params

    return (
        <SafeAreaView>
            <Header title={ item.title } navigation={navigation} />
            <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.images[0]}}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price.toLocaleString("de")}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
            <Pressable>
                <Text style={styles.button}>Agregar al Carrito</Text>
            </Pressable>
            </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'start',
        justifyContent: 'center',
        padding: 12
    },
    image: {
        height: 200,
        width: '100%'
    },
    title:{
        fontSize: 24,
        fontFamily: "BarlowBold",
        color: colors.black
    },
    description:{
        fontSize: 20,
        fontFamily: "Barlow",
        color: colors.black
    },
    price:{
        fontSize: 22,
        fontFamily: "BarlowBold",
        color: colors.blue
    },
    stock: {
        fontSize: 18,
        fontFamily: "BarlowSemiBold",
        color: colors.black,
        marginTop: 12
    },
    button: {
        fontSize: 20,
        fontFamily: "BarlowBold",
        color: colors.white,
        backgroundColor: colors.blue,
        marginTop: 16,
        padding: 8,
        textAlign: 'center'
    }
  });
  

export default ProductDetail