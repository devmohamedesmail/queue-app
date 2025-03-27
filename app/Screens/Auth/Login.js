import {  SafeAreaView } from 'react-native'
import React from 'react'
import StatusBarComponent from '../../Components/StatusBarComponent'
import { Button, Div,Text } from 'react-native-magnus'
import CustomInput from '../../CustomComponents/CustomInput'
import colors from '../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../CustomComponents/CustomButton'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const {theme}=useTheme();
  const{t}=useTranslation()
  return (
    <SafeAreaView>
        {/* <StatusBarComponent /> */}
        <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} px={10} h="100%" flexDir='column' justifyContent='center' alignItems='center'>
           <Text mb={20} fontWeight='bold' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}  >{t('Login')}</Text>
            <CustomInput icon={<SimpleLineIcons name="envelope" size={24} color="black" />} placeholder="Email" />
            <CustomInput icon={<AntDesign name="lock1" size={24} color="black" />} placeholder="password" />
            <CustomButton title="login" bg={colors.lightTheme.primary} w="100%" />
            <Div mt={20} w="100%">
               <CustomButton title="Login With Google" bg={colors.lightTheme.primary} w="100%" />

            </Div>
            
            <Div flexDir='row' justifyContent='flex-start' w="100%" px={10} mt={20}>
                <Text>I Don't Have Account</Text>
                <Button bg={colors.lightTheme.primary} mx={10} color={colors.primary} fontWeight='bold'>Register</Button>
            </Div>
        </Div>
    </SafeAreaView>
  )
}

export default Login
