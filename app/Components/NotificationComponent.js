import React from 'react'
import { Button ,Text ,Div} from 'react-native-magnus'
import Fontisto from '@expo/vector-icons/Fontisto';
import colors from '../config/colors';
export default function NotificationComponent() {
  return (
   <Button bg='transparent' position='relative' mx={10}>
      
       <Div w={20} h={20} bg={colors.primary} flexDir='row' justifyContent='center' alignItems='center' rounded={100} position='absolute' top={-10} right={-10}>
           <Text color='white'>4</Text>
       </Div>
      <Fontisto name="bell" size={24} color="black" />
   </Button>
  )
}
