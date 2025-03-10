import React, { useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'

export default function HistoryItem() {
    const [date, setDate] = useState(new Date())
    const{theme}=useTheme();
    return (
        <Div 
           flexDir='row' 
           alignItems='center' 
           bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.voilet}
           shadow="sm" 
           mx={10} 
           my={5} 
           px={10} 
           py={10} 
           rounded={10}
           >
            <Div>
             
                <Text fontWeight='bold' bottom={-10}>{date.getDate()}</Text>
                <Text fontSize={35} textAlign='center' fontWeight='bold' color={colors.primary}>{date.getMonth() + 1}</Text>
                <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{date.getFullYear()}</Text>
            </Div>
            <Div mx={20}>
                <Text 
                  fontWeight='bold' 
                  color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                  fontSize={16}> Location Name </Text>
                <Text 
                  fontSize={12}
                  color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                  fontFamily='poppins'> Location Address </Text>
            </Div>

        </Div>
    )
}
