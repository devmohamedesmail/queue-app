import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-native-magnus'

export default function CustomButton({ title, onPress, w, ...props }) {
  const { t, i18n } = useTranslation();
  return (
    <Button
      {...props}
      onPress={onPress}
      w={w}
      h={50}
      p={0}
      fontWeight='bold'
      alignSelf='center'
      rounded={10}

      fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
    >
      {title}
    </Button>
  )
}
