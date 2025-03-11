import React from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../Components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'

export default function BankQueue() {
    const navigation = useNavigation()
    const { theme, toggleTheme } = useTheme()
    const { t } = useTranslation();
    return (
        <SafeAreaView>

            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">



                <CloseBtn />


                {/* <Button onPress={() => toggleTheme()}>toff</Button> */}

                {/* Bank name And Address Start */}
                <Div flexDir='column' justifyContent='center' alignItems='center' mt={70}>
                    <Text fontWeight='bold' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} >Global Village</Text>
                    <Text my={2} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>Dubai, United Arab Emirates</Text>
                </Div>

                {/* Bank name And Address Start */}





                {/* Queue status   */}
                <Div bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} py={20} my={60} w="97%" m="auto" rounded={10}>
                    <Div flexDir='column' justifyContent='center' alignItems='center'>
                        <Text fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>{t('clients-in-queue')}</Text>
                        <Text my={10} fontWeight='bold' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>20</Text>
                    </Div>

                    <Div w="100%" h={2} bg='white'></Div>
                    <Div flexDir='row' justifyContent='space-between' alignItems='center' pt={20} px={20}>
                        <Text fontWeight='bold' fontSize={16} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{t('estimate-time')}</Text>
                        <Text fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.primary}>1:30 H</Text>
                    </Div>
                </Div>


                <Div flexDir='row' justifyContent='center' alignItems='center' position='absolute' left="50%" bottom={110} style={{ transform: [{ translateX: "-50%" }] }}>
                    <Button
                        onPress={() => navigation.navigate("MyQueue")}
                        bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        h={200}
                        w={200}
                        fontWeight='bold'
                        fontSize={30}
                        rounded="circle"
                        shadow="md"
                        shadowColor={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.white}>
                        {t('book')}
                    </Button>
                </Div>


            </Div>


        </SafeAreaView>

    )
}
