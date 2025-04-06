import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-native-magnus'

export default function CustomButton({title,onPress,bg,w}) {
  const{t,i18n}=useTranslation();
  return (
    <Button 
       onPress={onPress} 
       bg={bg} 
       w={w} 
       h={50} 
       fontWeight='bold' 
       alignSelf='center' 
       rounded={10}
       fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
       >
        {title}
    </Button>
  )
}
