import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors'

const CustomAccountButton = ({icon,title,onPress}) => {
  const {theme}=useTheme();
  return (
    <Button onPress={onPress} bg='transparent' borderBottomWidth={1} borderBottomColor='gray400'>
        <Div flexDir='row'  w="100%">
            {icon}
            <Text 
              mx={10} fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >{title}</Text>
        </Div>
    </Button>
  )
}

export default CustomAccountButton