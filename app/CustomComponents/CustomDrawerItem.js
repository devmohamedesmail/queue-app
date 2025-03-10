import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import colors from '../config/colors';

export default function CustomDrawerItem({icon,title,onPress}) {
  const {theme}=useTheme();
  return (
    <Button 
       onPress={onPress} 
       bg='transparent' 
       borderBottomWidth={theme === 'light' ? 1 : .3} 
       h={50}
       borderBottomColor={theme === 'light' ? "gray300" : "gray200"}
       shadow="3xl"
      
       >
        <Div flexDir='row'  w="100%">
            {icon}
            <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mx={10} fontWeight='semibold'>{title}</Text>
        </Div>
    </Button>
  )
}
