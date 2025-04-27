
import React, { useMemo,useState,useEffect } from 'react'
import { ScrollDiv, Div, Button } from 'react-native-magnus'
import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'
import PlaceItem from './PlaceItem'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';

export default function PlaceListSection({ places }) {

  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation()
  const snapPoints = useMemo(() => ['20%', '50%', '80%'], [])
  const [userLocation, setUserLocation] = useState(null);




// Haversine formula to calculate the distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

useEffect(() => {
  // Request permission and fetch user's location
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    console.log('User Location:', loc.coords);

    setUserLocation(loc.coords);
  })();
}, []);

// Update places with distances only when user location is available
const placesWithDistance = useMemo(() => {
  if (!userLocation) return [];

  return places.map((place) => {
    const distance = getDistanceFromLatLonInKm(
      userLocation.latitude,
      userLocation.longitude,
      parseFloat(place.location.lat),
      parseFloat(place.location.lng)
    );
    return { ...place, distance };
  }).sort((a, b) => a.distance - b.distance); // Sort places by distance
}, [places, userLocation]);

















  return (


  
      <BottomSheet snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >

        <ScrollDiv  >
          {places.map((place) => (
            <PlaceItem
              key={place._id}
              name={i18n.language === 'en' ? place.nameEn : place.nameAr}
              address={i18n.language === 'en' ? place.addressEn : place.addressAr}
              distance={place.distance}
              onPress={() => navigation.navigate("BankQueue", { place })} />
          ))}
        </ScrollDiv>
      </BottomSheet>
    


  )
}

