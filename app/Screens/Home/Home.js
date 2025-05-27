import React, { useEffect, useState } from 'react'
import { Div} from 'react-native-magnus'
import SearchComponent from '../../components/SearchComponent'
import DrawerComponent from '../../components/DrawerComponent';
import PlaceListSection from './parts/PlaceListSection';
import MapViewSection from './parts/MapViewSection';
import { api } from '../../config/api';
import { ActivityIndicator } from 'react-native'
import { Button, Overlay, Text } from 'react-native-magnus'
import CustomText from '../../custom/CustomText';
import { useTranslation } from 'react-i18next';
import {darkMapStyle, lightMapStyle} from '../../config/mapStyles';

export default function Home() {
  const [places, setPlaces] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const {t}=useTranslation();

  const fetchPlaces = async () => {
    try {
      const response = await fetch(`${api.url}api/v1/places`);
      const data = await response.json();
      setPlaces(data.data);
    } catch (error) {
      console.log("Error fetching places", error);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, [])







  return (
    <Div style={{ flex: 1 }}   >

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
        <Div style={{ flex: 1 }}>
          <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
            <SearchComponent places={places} />
            <DrawerComponent />
          </Div>
          <MapViewSection places={places} />
          <PlaceListSection places={places} />
          <Overlay visible={overlayVisible} p="xl">
            <ActivityIndicator size={"large"} />
            <CustomText content={t('please-wait')} fontWeight='bold' textAlign='center'  mt={20} />
          </Overlay>
        </Div>
      )}
    </Div>


  )
}


