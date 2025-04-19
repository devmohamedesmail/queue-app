
import React, { useMemo } from 'react'
import { ScrollDiv, Div, Button } from 'react-native-magnus'
import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'
import PlaceItem from './PlaceItem'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet';

export default function PlaceListSection({ places }) {

  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t, i18n } = useTranslation()
  const snapPoints = useMemo(() => ['20%', '50%', '80%'], [])
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
              onPress={() => navigation.navigate("BankQueue", { place })} />
          ))}
        </ScrollDiv>
      </BottomSheet>
    


  )
}

