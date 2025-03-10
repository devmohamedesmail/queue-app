import React from 'react'
import { Button } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';


const CustomIconBtn = ({icon,onPress}) => {
    const {theme,toggleTheme}=useTheme()
    return (
        <Button
            h={45}
            w={45}
            p={0}
            bg={theme === 'light' ? colors.lightTheme.white : colors.lightTheme.black}
            rounded="md"
            shadow="lg"
            onPress={onPress}
        >
            {icon}
           
        </Button>
    )
}

export default CustomIconBtn