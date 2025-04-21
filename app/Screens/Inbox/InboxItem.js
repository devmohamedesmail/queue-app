
import React from 'react'
import { Button, Div,Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import colors from '../../config/colors'

const InboxItem = () => {
    const {theme}=useTheme();
  return (
    <Button h={100} w={"100%"} px={10} py={10} my={5} bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark}>
        <Div w={"100%"} flexDir='column'  alignItems='flex-start'>
            <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} fontWeight='bold' fontSize={15}>Topic Name</Text>
            <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}>Since day ago</Text>
        </Div>
    </Button>
  )
}

export default InboxItem