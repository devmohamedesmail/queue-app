import React from 'react'
import { Div, ScrollDiv } from 'react-native-magnus'
import FavouriteItem from './FavouriteItem'
import { FlatList, SafeAreaView } from 'react-native'
import BackBtn from '../../Components/BackBtn'
import NotificationComponent from '../../Components/NotificationComponent'
import DrawerComponent from '../../Components/DrawerComponent'
import colors from '../../config/colors'
import StatusBarComponent from '../../Components/StatusBarComponent'
import places from '../../config/places'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Ball from '../../Components/Ball'
import SwipeComponent from './SwipeComponent'
import CloseBtn from '../../Components/CloseBtn'

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
