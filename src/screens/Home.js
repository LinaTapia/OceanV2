import React from 'react'
import Header  from '../components/Header'
import Categories from '../components/Categories'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header title="Categorias" navigation={navigation}/>
      <Categories navigation={navigation}/> 
    </SafeAreaView>
  )
}

export default Home