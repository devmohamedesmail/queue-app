import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'

const CustomAccountButton = ({icon,title,onPress}) => {
  return (
    <Button onPress={onPress} bg='transparent' borderBottomWidth={1} borderBottomColor='gray400'>
        <Div flexDir='row'  w="100%">
            {icon}
            <Text mx={10} fontWeight='semibold'>{title}</Text>
        </Div>
    </Button>
  )
}

export default CustomAccountButton