import { View, FlatList, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState }  from 'react'
import Search from '../components/Search'
import { products } from '../data/products'
import ProductItem from '../components/ProductItem'
import { colors } from '../theme/colors'

const Products = ({ category }) => {

  const [productFiltered, setFilterByCategory] = useState([])
  const [textInput, setTextInput] = useState(null)

  const removeSpecialChars = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  useEffect(() => {
    const filterByCategory = products.filter((el) => el.category === category)
    setFilterByCategory(filterByCategory)

    if(textInput){
      const titleProduct = products.filter((el) => removeSpecialChars(el.title).includes(removeSpecialChars(textInput)))
      setFilterByCategory(titleProduct)
    }
  }, [category, textInput])
  
  return (
    <View>
        <Search textInput={textInput} setTextInput={setTextInput}/>
        {(productFiltered.length === 0 && textInput) && <Text style={styles.textError}>Producto no encontrado</Text> }
        <FlatList data={productFiltered}
        keyExtractor={products.id}
        renderItem={({item}) => <ProductItem item={item} />}/>
    </View>
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