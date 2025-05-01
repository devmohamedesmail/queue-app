import React from 'react'
import { Div} from 'react-native-magnus'
import FavouriteItem from './FavouriteItem'
import { FlatList, SafeAreaView } from 'react-native'
import colors from '../../config/colors'
import places from '../../config/places'



import CloseBtn from '../../components/CloseBtn'

export default function Favourite() {
  return (
    <SafeAreaView>
      
      <Div bg={colors.screen} h="100%">

        <CloseBtn />


        <FlatList
          data={places}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <FavouriteItem item={item} />}
        />

      </Div>
    </SafeAreaView>
  )
}
