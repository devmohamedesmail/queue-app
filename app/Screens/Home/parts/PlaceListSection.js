
import React, { useMemo, useState, useEffect } from 'react'
import { ScrollDiv,Div,Text } from 'react-native-magnus'
import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'
import PlaceItem from './PlaceItem'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux'
import { add_To_wishlist } from '../../../redux/reducers/wishlistSlice'

import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from '../../../custom/CustomText'

export default function PlaceListSection({ places }) {

  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation()
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], [])
  const [userLocation, setUserLocation] = useState(null);
  const dispatch = useDispatch();

  const items = useSelector((state) => state.wishlist.items);


  const handle_add_to_favorites = (place) => {
    dispatch(add_To_wishlist({
      id: place._id,
      name_en: place.nameEn,
      name_ar: place.nameAr,
      address_en: place.addressEn,
      address_ar: place.addressAr,



    }));


  }




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (



    <BottomSheet snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
    >

      <ScrollDiv  >
        <CustomText textAlign="center" px={10} fontSize={20} color={theme === 'light' ? "black" : "white"} content={t('select-place')} />
        {places && places.length > 0 ? (<>
          {places.map((place) => {
            const placeLat = parseFloat(place.location.lat);
            const placeLng = parseFloat(place.location.lng);
            const distance = userLocation
              ? (getDistance(userLocation, { latitude: placeLat, longitude: placeLng }) / 1000).toFixed(1) // كم كيلومتر
              : null;

            const isFavorite = items.some(item => item.id === place._id);
            return (
              <PlaceItem
                key={place._id}
                name={i18n.language === 'en' ? place.nameEn : place.nameAr}
                address={i18n.language === 'en' ? place.addressEn : place.addressAr}
                distance={distance}
                onPress={() => navigation.navigate("BankQueue", { place })}
                add_to_favorites={() => handle_add_to_favorites(place)}
                isFavorite={isFavorite}
              />
            );
          })}</>) : (
          <Div  px={20} py={20}>
            <AntDesign name="search1" size={40} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
          </Div>)}






      </ScrollDiv>
    </BottomSheet>



  )
}

