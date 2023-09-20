import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Products from '../screens/Products'
import ProductDetail from '../screens/ProductDetail'
import  Header  from '../components/Header'

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='home'>
        <Stack.Screen component={Home} name='home' options={{headerShown: false}}/>  
        <Stack.Screen component={Products} name='products' options={{headerShown: false}}/>  
        <Stack.Screen component={ProductDetail} name='productDetail' options={{headerShown: false}}/>  
        <Stack.Screen component={Header} name='header'/>  
    </Stack.Navigator>
  )
}

export default RootNavigation