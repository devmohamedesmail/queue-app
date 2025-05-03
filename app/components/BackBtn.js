import React from 'react'
import { Button } from 'react-native-magnus'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function BackBtn() {
  const navigation = useNavigation();
  return (
    <Button bg='transparent' onPress={()=>navigation.goBack()}>
       <Ionicons name="arrow-back-circle-outline" size={35} color="black" />
    </Button>
  )
}
