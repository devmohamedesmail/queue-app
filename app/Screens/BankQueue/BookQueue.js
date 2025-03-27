import React, { useEffect, useState } from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { ActivityIndicator, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../Components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import Ball from '../../Components/Ball'
import axios from 'axios'




export default function BookQueue({ route }) {
    const { queue, place , service} = route.params;
    const { theme } = useTheme()
    const { t, i18n } = useTranslation();
     const [loading, setLoading] = useState(false)




     const book_new_queue = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`https://queue-app-express-js.onrender.com/api/v1/queues/book/new/queue/${place._id}/${service._id}`)
            setLoading(false)
            const data = response.data
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    return (
        <SafeAreaView>
            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
                <CloseBtn />

                <Div flexDir='column' justifyContent='center' alignItems='center' mt={70} px={10}>


                    <Text fontWeight='bold' fontSize={13} lineHeight={30} textAlign='center' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} >
                        {i18n.language === "ar" ? place.nameAr : place.nameEn}
                    </Text>



                    <Text my={2} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>
                        {i18n.language === "ar" ? place.addressAr : place.addressEn}
                    </Text>



                </Div>



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

{
    loading ? (
        <ActivityIndicator size="large" color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
    ) : (
        <Button
            onPress={() => book_new_queue()}
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
    )
}
</Div>


            </Div>
        </SafeAreaView>
    )
}
