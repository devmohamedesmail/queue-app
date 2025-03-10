import {  SafeAreaView } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../Components/StatusBarComponent'
import { Button, Div,Text } from 'react-native-magnus'
import CustomInput from '../../CustomComponents/CustomInput'
import colors from '../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../CustomComponents/CustomButton'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Login = () => {
  return (
    <SafeAreaView>
        <StatusBarComponent />
        <Div bg={colors.screen} px={10} h="100%" flexDir='column' justifyContent='center' alignItems='center'>
            <CustomInput icon={<SimpleLineIcons name="envelope" size={24} color="black" />} placeholder="Email" />
            <CustomInput icon={<AntDesign name="lock1" size={24} color="black" />} placeholder="password" />
            <CustomButton title="login" bg={colors.primary} w="100%" />
            <Div flexDir='row' justifyContent='flex-start' w="100%" px={10}>
                <Text>I Don't Have Account</Text>
                <Button bg='transparent' mx={10} color={colors.primary} fontWeight='bold'>Register</Button>
            </Div>
        </Div>
    </SafeAreaView>
  )
}

export default Login
