import React from 'react'
import { Button } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';


const CustomIconBtn = ({icon,onPress,...props}) => {
    const {theme}=useTheme()
    return (
        <Button
            h={45}
            w={45}
            p={0}
            bg={theme === 'light' ? colors.lightTheme.white : colors.lightTheme.black}
            rounded="md"
            shadow="sm"
            onPress={onPress}
            {...props}
        >
            {icon}
           
        </Button>
    )
}

export default CustomIconBtn