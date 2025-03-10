import { View, Text } from 'react-native'
import React from 'react'
import { Input, Icon } from "react-native-magnus";
import colors from '../config/colors';

const CustomInput = ({placeholder,icon,value}) => {
    return (
        <Input
           value={value}
            placeholder={placeholder}
            p={10}
            h={60}
            mb={15}
            focusBorderColor={colors.primary}
            suffix={icon}
        />
    )
}

export default CustomInput