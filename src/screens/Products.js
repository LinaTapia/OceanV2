import {FlatList, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState }  from 'react'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { colors } from '../theme/colors'
import  Header  from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useGetProducstQuery } from '../services/ecApi'

const Products = ({ route , navigation}) => {
  const products = useSelector((state) => state.homeSlice.allProducts) 
/*   const { data, isLoading, isError } = useGetProducstQuery()
 */
  const [productFiltered, setFilterByCategory] = useState([])
  const [textInput, setTextInput] = useState(null)
  const { item } = route.params;

  const removeSpecialChars = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  const productsFilterByCategory = useSelector(
    (state) => state.homeSlice.productsFilterByCategory
  );

  useEffect(() => {
    setFilterByCategory(productsFilterByCategory)

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