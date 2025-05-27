
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext';
import { Button } from 'react-native-magnus';
import colors from '../config/colors';
const Book_btn = ({onPress}) => {

    const {t,i18n}=useTranslation();
    const {theme}=useTheme();


    return (
        <Button
            onPress={onPress}
            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
            h={200}
            w={200}
            fontWeight='bold'
            fontSize={30}
            rounded="circle"
            shadow="md"
            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
            shadowColor={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.white}>
            {t('book')}
        </Button>
    )
}

export default Book_btn