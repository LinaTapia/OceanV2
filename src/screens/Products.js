import {FlatList, Text, StyleSheet, ActivityIndicator  } from 'react-native'
import React, { useEffect, useState }  from 'react'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { colors } from '../theme/colors'
import  Header  from '../components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGetProducstQuery } from '../services/ecApi'

const Products = ({ route , navigation}) => {
   const { data: products, isLoading, isError } = useGetProducstQuery()
 
  const [productFiltered, setFilterByCategory] = useState([])
  const [textInput, setTextInput] = useState(null)
  const { item } = route.params;
  // Función para quitar caracteres especiales y convertir a minúsculas
  const removeSpecialChars = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

  useEffect(() => {
    // Si se está cargando, retorna sin hacer nada
    if(isLoading) return
    // Filtra los productos por categoría si 'item' está definido, de lo contrario muestra todos los productos
    let productCategory =  item ? products.filter( (el) => (el.category == item)) : products
    setFilterByCategory(productCategory)
    // Si 'textInput' tiene un valor, filtra los productos por el texto de búsqueda
    if(textInput){
      const titleProduct = productCategory.filter((el) => removeSpecialChars(el.title).includes(removeSpecialChars(textInput)))
      setFilterByCategory(titleProduct)
    }
  }, [item, textInput, isLoading])

  if(isLoading){
    return (
        <SafeAreaView style={styles.indicator}>
            <ActivityIndicator size={100} color={colors.verdeOscuro}  />
        </SafeAreaView>
    )
  }

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