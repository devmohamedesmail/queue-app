
import React, { useMemo, useState, useEffect } from 'react'
import { ScrollDiv, Div, Button } from 'react-native-magnus'
import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'
import PlaceItem from './PlaceItem'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux'
import { add_To_wishlist } from '../../../redux/reducers/wishlistSlice'
import Toast from 'react-native-toast-message'

export default function PlaceListSection({ places }) {

  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation()
  const snapPoints = useMemo(() => ['30%', '50%', '80%'], [])
  const [userLocation, setUserLocation] = useState(null);
  const dispatch = useDispatch();

  const handle_add_to_favorites = (place) => {
    dispatch(add_To_wishlist({
      id: place._id,
      name_en: place.nameEn,
      name_ar: place.nameAr,
      address_en: place.addressEn,
      address_ar: place.addressAr,
      
    }));

    Toast.show({
      type: 'success',
      text1: t('added-to-favourite'),
      text2: `${place.nameEn} has been added!`, // أو place.nameAr حسب اللغة
      position: 'top',
    });
  }

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
            onPress={() => navigation.navigate("BankQueue", { place })}
            add_to_favorites={() => handle_add_to_favorites(place)}

          />
        ))}
      </ScrollDiv>
    </BottomSheet>



  )
}

