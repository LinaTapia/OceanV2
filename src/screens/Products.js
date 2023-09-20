import {FlatList, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState }  from 'react'
import Search from '../components/Search'
import { products } from '../data/products'
import ProductItem from '../components/ProductItem'
import { colors } from '../theme/colors'
import  Header  from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

const Products = ({ route , navigation}) => {

  const [productFiltered, setFilterByCategory] = useState([])
  const [textInput, setTextInput] = useState(null)
  const { item } = route.params;

  const removeSpecialChars = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  useEffect(() => {
    const filterByCategory = products.filter((el) => el.category === item)
    setFilterByCategory(filterByCategory)

    if(textInput){
      const titleProduct = products.filter((el) => removeSpecialChars(el.title).includes(removeSpecialChars(textInput)))
      setFilterByCategory(titleProduct)
    }
  }, [item, textInput])
  
  return (
    <SafeAreaView>
        <Header title={ item } navigation={navigation} />
        <Search textInput={textInput} setTextInput={setTextInput}/>
        {(productFiltered.length === 0 && textInput) && <Text style={styles.textError}>Producto no encontrado</Text> }
        <FlatList data={productFiltered}
        keyExtractor={products.id}
        renderItem={({item}) => <ProductItem navigation={navigation} item={item} />}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textError: {
    color: colors.red,
    fontFamily: 'BarlowBold',
    textAlign: 'center'
  },
});


export default Products