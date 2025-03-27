
import React, { useState } from 'react'
import { Div, Button, Text, ScrollDiv } from 'react-native-magnus'

import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'
import PlaceItem from './PlaceItem'
import { useTranslation } from 'react-i18next'



export default function PlaceListSection({ places }) {
  const [height, setHeight] = useState(300)
  const navigation = useNavigation();
  const { theme } = useTheme();
  const {t,i18n}=useTranslation()
  return (

    <Div w="100%" bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} position='absolute' shadow="lg" zIndex={1000} bottom={0} m="auto" h={height} roundedTopLeft={20} roundedTopRight={20} >

      <Div flexDir='row' justifyContent='center'>
        <Button bg={colors.lightTheme.primary} h={5} w={70} p={0}></Button>
      </Div>

      <ScrollDiv roundedTopLeft={20} roundedTopRight={20} >
        {places.map((place) => (
          <PlaceItem 
           key={place._id} 
           name={i18n.language === 'en' ? place.nameEn : place.nameAr} 
           address={i18n.language === 'en' ? place.addressEn : place.addressAr} 
           onPress={() => navigation.navigate("BankQueue",{ place })} />
        ))}
      </ScrollDiv>

    </Div>


  )
}

