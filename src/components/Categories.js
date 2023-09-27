import { View, FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem';
import { useSelector } from 'react-redux';

const Categories = ({navigation}) => {
  const categories = useSelector( state => state.homeSlice.allCategories)
  console.log(categories)
  return (
    <View>
      <FlatList data={categories}
      keyExtractor={key => key}
      renderItem={({item}) => <CategoryItem navigation={navigation} item={item} />}/>
    </View>
  )
}

export default Categories