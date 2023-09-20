import { View, FlatList } from 'react-native'
import React from 'react'
import { categories } from "../data/categories";
import CategoryItem from './CategoryItem';

const Categories = ({navigation}) => {
  return (
    <View>
      <FlatList data={categories}
      keyExtractor={key => key}
      renderItem={({item}) => <CategoryItem navigation={navigation} item={item} />}/>
    </View>
  )
}

export default Categories