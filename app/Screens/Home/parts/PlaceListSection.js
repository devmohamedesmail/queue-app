
import React, { useState } from 'react'
import { Div, Button, Text, ScrollDiv } from 'react-native-magnus'
import places from '../../../config/places'
import colors from '../../../config/colors'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../context/ThemeContext'





export default function PlaceListSection() {
  const [height, setHeight] = useState(300)
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  return (

    <Div w="100%" bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} position='absolute' shadow="lg" zIndex={1000} bottom={0} m="auto" h={height} roundedTopLeft={20} roundedTopRight={20} >

      <Div flexDir='row' justifyContent='center'>
        <Button bg={colors.primary} h={5} w={70} p={0}></Button>
      </Div>

      <ScrollDiv roundedTopLeft={20} roundedTopRight={20} >
        {places.map((place, index) => (
          <Button bg='transparent' onPress={() => navigation.navigate("BankQueue")} key={index} flexDir='row' alignItems='center' px={15} my={5} borderBottomWidth={1} borderBottomColor='gray300' h={70}>
            <Div flex={1}>
              <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mb={5}>{place.title}</Text>
              <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>{place.address}</Text>
            </Div>
            <Div>
              <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} fontSize={16}>2.2 Km</Text>
            </Div>
          </Button>
        ))}
      </ScrollDiv>

    </Div>


  )
}

