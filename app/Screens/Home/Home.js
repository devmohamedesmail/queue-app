import React, { useContext, useEffect, useState } from 'react'
import { Div } from 'react-native-magnus'
import SearchComponent from '../../Components/SearchComponent'
import DrawerComponent from '../../Components/DrawerComponent';
import PlaceListSection from './parts/PlaceListSection';
import MapViewSection from './parts/MapViewSection';
import { SafeAreaView } from 'react-native';
import { InfoContext } from '../../context/InfoContext';





export default function Home() {
  const [places, setPlaces] = useState([]);
  const {info}=useContext(InfoContext)

  const fetchPlaces = async () => {
    try {
      const response = await fetch('https://queue-app-express-js.onrender.com/api/v1/places');
      const data = await response.json();

      setPlaces(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, [])


  return (
    <SafeAreaView>
      <Div position='relative'  >
        <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
          <SearchComponent />
          <DrawerComponent />
        </Div>
        <MapViewSection places={places} />
        <PlaceListSection places={places} />

      </Div>
    </SafeAreaView>


  )
}
