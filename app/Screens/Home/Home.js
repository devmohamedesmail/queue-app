import React, { useState } from 'react'
import { Div } from 'react-native-magnus'
import SearchComponent from '../../Components/SearchComponent'
import DrawerComponent from '../../Components/DrawerComponent';
import PlaceListSection from './parts/PlaceListSection';
import MapViewSection from './parts/MapViewSection';




export default function Home() {


  return (
    <Div position='relative' >
      <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
        <SearchComponent />
        <DrawerComponent />
      </Div>
      <MapViewSection />
      <PlaceListSection />
    </Div>
  )
}
