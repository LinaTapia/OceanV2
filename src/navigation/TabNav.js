import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNav from "./ProfileNav";
import RootNavigation from './RootNavigation';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator initialRouteName='rootNavigation' screenOptions={{title: "", headerShown: false}}>
      <Tab.Screen name="rootNavigation" component={ RootNavigation } options={{ tabBarIcon: ({focused}) => <Octicons name="home" size={24} color={ focused ? colors.blue : colors.black } />}}/>
      <Tab.Screen name="profileNav" component={ ProfileNav } options={{ tabBarIcon: ({focused}) => <FontAwesome5 name="user" size={24} color={ focused ? colors.blue : colors.black } />}}/>
    </Tab.Navigator>
  )
}

export default TabNav