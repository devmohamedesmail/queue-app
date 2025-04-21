import { View, Text } from 'react-native'
import React from 'react'
import { Input, Icon } from "react-native-magnus";
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const CustomInput = ({ placeholder, icon, value, onChange ,secureTextEntry = false, ...props }) => {

    const { t, i18n } = useTranslation();
    const { theme } = useTheme()

    return (
        <Input
             {...props}
            value={value}
            placeholder={placeholder}
            p={10}
            // h={60}
            mb={15}
            secureTextEntry={secureTextEntry}
            focusBorderColor={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
            suffix={icon}
            onChangeText={onChange}
            borderWidth={1}
            borderColor="gray400"
            textAlign={i18n.language === 'ar' ? 'right' : 'left'}


        />
    )
}

export default CustomInput