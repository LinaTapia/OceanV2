import { View, FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem';
import { useGetCategoriesQuery } from '../services/ecApi';
const Categories = ({navigation}) => {
  const { data:categories, isLoading, error} = useGetCategoriesQuery()
  return (
    <View>
      <FlatList data={categories}
      keyExtractor={key => key}
      renderItem={({item}) => <CategoryItem navigation={navigation} item={item} />}/>
    </View>
  )
}

export default Categories