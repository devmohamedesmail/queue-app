import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Skeleton,Image, Button } from 'react-native-magnus'
import SearchComponent from '../../components/SearchComponent'
import DrawerComponent from '../../components/DrawerComponent';
import PlaceListSection from './parts/PlaceListSection';
import MapViewSection from './parts/MapViewSection';
import { InfoContext } from '../../context/InfoContext';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { api } from '../../config/api';
import CustomIconBtn from '../../custom/CustomIconBtn';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import Octicons from '@expo/vector-icons/Octicons';

export default function Home() {
  const [places, setPlaces] = useState([]);
  const { info } = useContext(InfoContext)
  const {theme}=useTheme();

  
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




  const navigation = useNavigation();


  return (
    <Div style={{ flex: 1 }}   >
      
      {places && places.length > 0 ? (
        <Div style={{ flex: 1 }} >
          <Div mt={30} flexDir='row' justifyContent='space-between' alignItems='center' position='absolute' top={30} zIndex={1000} px={20} w="100%">
            <SearchComponent places={places} />

            {/* <DrawerComponent /> */}
           
            <CustomIconBtn 
            icon={<Octicons name="three-bars" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}      
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
          </Div>
          <MapViewSection places={places} />
          <PlaceListSection places={places} />

        </Div>
      ) : (
        <Div flexDir='row' justifyContent='center' alignItems='center' h="100%">
          <Div flexDir="row" >
            <Div flex={1} flexDir='column' justifyContent='flex-start' position='relative' h="100%">
              <Skeleton.Box h='100%' />
              <Image
                h={200}
                w={200}
                m={10}
                position='absolute'
                top="50%"
                left="50%"
                
                source={require('../../../assets/logo.png')}
                style={{
                  transform: [
                    { translateX: -100 }, 
                    { translateY: -100 }, 
                  ],
                }}
              />
            </Div>
          </Div>
        </Div>
      )}
    </Div>


  )
}


