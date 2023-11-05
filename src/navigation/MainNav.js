import { NavigationContainer } from '@react-navigation/native'
import React, {useState, useEffect} from 'react'
import AuthNav from './AuthNav'
import TabNav from './TabNav'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainNav = () => {
  const [checkedUser, setCheckedUser] = useState(null)
  const user = useSelector((state) => state.authSlice.user)

  useEffect(() => {
      const checkdUser = async () => {
        try {
          const userEmail = await AsyncStorage.getItem("userEmail")
          userEmail ? setCheckedUser(userEmail) : setCheckedUser(user)
        } catch (error) {
            console.log(error)
        }
      }
      checkdUser()
  },[user])
  
  return (
    <NavigationContainer>{checkedUser ? <TabNav /> : <AuthNav />}</NavigationContainer>
  );
};

export default MainNav