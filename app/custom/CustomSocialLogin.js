
import React from 'react'
import { Button, Text } from 'react-native-magnus'
import { Image } from "react-native-magnus";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';

const CustomSocialLogin = ({ title, onPress, image, bg, text }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  return (
    <Button onPress={onPress} bg={bg} mb={10} p={0} w='100%' h={50} borderColor='gray400' borderWidth={0} rounded={10} flexDir='row' alignItems='center' justifyContent='center'>
      <Image
        h={30}
        w={30}
        mr={30}
        rounded="circle"
        source={image}
      />
      <Text 
        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'} 
        mx={20}
        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}

      >{title}</Text>
    </Button>
  )
}

export default CustomSocialLogin