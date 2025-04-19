import React, { useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Div, Text, Skeleton } from 'react-native-magnus'
import SearchComponent from '../../Components/SearchComponent'
import DrawerComponent from '../../Components/DrawerComponent';
import PlaceListSection from './parts/PlaceListSection';
import MapViewSection from './parts/MapViewSection';
import { SafeAreaView } from 'react-native';
import { InfoContext } from '../../context/InfoContext';
import CustomLoading from '../../CustomComponents/CustomLoading';



import { View, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Home() {
  const [places, setPlaces] = useState([]);
  const { info } = useContext(InfoContext)

  const fetchPlaces = async () => {
    try {
      const response = await fetch(`https://queue-app-express-js.onrender.com/api/v1/places`);
      const data = await response.json();

      setPlaces(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, [])




  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {places && places.length > 0 ? (
        <Div style={{ flex: 1 }} >
          <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
            <SearchComponent places={places} />
            <DrawerComponent />
          </Div>
          <MapViewSection places={places} />
          <PlaceListSection places={places} />

        </Div>
      ) : (
        <Div flexDir='row'  justifyContent='center' alignItems='center' h="100%">
          <Div flexDir="row" >
            <Div flex={1}  flexDir='column' justifyContent='flex-start' h="100%">
              <Skeleton.Box  h='95%' />
              <Skeleton.Box  h='60%' />
            </Div>
          </Div>
        </Div>
      )}

    </SafeAreaView>


  )
}


