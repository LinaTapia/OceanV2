import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { categories } from "../data/categories";
import CategoryItem from './CategoryItem';

const Categories = () => {
  return (
    <View>
      <FlatList data={categories}
      keyExtractor={key => key}
      renderItem={({item}) => <CategoryItem item={item} />}/>
    </View>
  )
}

export default Categories