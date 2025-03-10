import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';

export default function CustomDrawerBoxIcon({title,icon,onPress}) {
  const{theme,toggleTheme}=useTheme();
  return (
    <Button onPress={onPress}  bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} w="48%" mb={5} h={85} rounded={10}>
      <Div flexDir='column' justifyContent='center' alignItems='center'>
        {icon}
        <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mt={10} fontWeight='bold'>{title}</Text>
      </Div>
    </Button>
  )
}
