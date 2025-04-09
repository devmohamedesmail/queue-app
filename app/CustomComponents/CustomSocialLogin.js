import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-magnus'
import { Image } from "react-native-magnus";

const CustomSocialLogin = ({ title,onPress,image ,bg,text}) => {
  return (
    <Button onPress={onPress} bg={bg} mb={10} p={0} w='100%' h={50} borderColor='gray400' borderWidth={1}  rounded={10} flexDir='row' alignItems='center' justifyContent='center'>
      <Image
        h={30}
        w={30}
        mr={30}
        rounded="circle"
        source={image}
      />
      <Text mx={20} color={text}>{title}</Text>
    </Button>
  )
}

export default CustomSocialLogin