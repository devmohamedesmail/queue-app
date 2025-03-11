import React from 'react'
import { Button } from 'react-native-magnus'

export default function CustomButton({title,onPress,bg,w}) {
  return (
    <Button onPress={onPress} bg={bg} w={w} h={60} fontWeight='bold' alignSelf='center' rounded={10}>
        {title}
    </Button>
  )
}
