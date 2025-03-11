import React, { useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import { useTheme } from '../../context/ThemeContext'

export default function HistoryItem() {
    const [date, setDate] = useState(new Date())
    const { theme } = useTheme();
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    return (
        <Div
            flexDir='row'
            alignItems='center'
            bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}
            shadow="sm"
            mx={10}
            my={5}
            px={10}
            py={10}
            rounded={10}
        >
            <Div>


                <Text fontSize={35} textAlign='center' fontWeight='bold' color={colors.lightTheme.primary}>{date.getDate()}</Text>
                <Text fontSize={20} textAlign='center' fontWeight='bold' color={colors.lightTheme.primary}>
                    {monthNames[date.getMonth()]} 
                </Text>
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
