import React from 'react'
import Header  from '../components/Header'
import Categories from '../components/Categories'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native'


const Home = ({navigation}) => {
  return (
/*     <SafeAreaView>
      { isLoading ? (
      <SafeAreaView>
        <ActivityIndicator size="big"/>
      </SafeAreaView>) : (
         <>
            <Header title="Categorias" navigation={navigation}/>
            <Categories navigation={navigation}/>
          </>
        )
      }
    </SafeAreaView> */

    <SafeAreaView>
      <Header title="Categorias" navigation={navigation}/>
      <Categories navigation={navigation}/> 
    </SafeAreaView>
  )
}

export default Home