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
import PlaceDetails from './parts/PlaceDetails'

export default function BankQueue({ route }) {
    const navigation = useNavigation()
    const { theme, toggleTheme } = useTheme()
    const { t, i18n } = useTranslation();
    const { place } = route.params;
    const [placeServices, setPlaceServices] = useState(null)
    const [loading, setLoading] = useState(false)






    // Fetch Place Services 
    const fetch_place_services = async () => {
        try {
            const response = await axios.get(`https://queue-app-express-js.onrender.com/api/v1/services/place/services/${place._id}`)

            const data = response.data.services
            if (data.length > 0) {
                setPlaceServices(data)
            } else {
                setPlaceServices(0)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetch_place_services()
    }, [])





    // Get Last Quaue
    const get_last_queue = async (service) => {
        try {
            const response = await axios.get(`https://queue-app-express-js.onrender.com/api/v1/services/last/queue/${place._id}/${service._id}`)
            const queue = response.data.queue;

            navigation.navigate("BookQueue", { queue: queue, place: place, service: service })
        } catch (error) {
            console.log(error)
        }
    }






    // book_new_queue
    const book_new_queue = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`https://queue-app-express-js.onrender.com/api/v1/queues/book/new/queue/${place._id}`)
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

                {/* Bank name And Address Start */}
               <PlaceDetails place={place} />

                {/* Bank name And Address Start */}




                {placeServices !== null && placeServices.length > 0 ? (
                    <Div px={10} mt={50}>
                        {placeServices.map((service) => (
                            <Button
                                w="100%"
                                h={70}
                                onPress={() => get_last_queue(service)}
                                key={service._id}
                                rounded={10}
                                my={5}
                                bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>


                                <Text 
                                  fontWeight='bold' 
                                  fontSize={15} 
                                  fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                  color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white} textAlign='center'>
                                    {i18n.language === "ar" ? service.nameAr : service.nameEn}
                                </Text>
                            </Button>
                        ))}
                    </Div>) : (

                    <>
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
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        shadowColor={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.white}>
                                        {t('book')}
                                    </Button>
                                )
                            }
                        </Div>
                    </>)}













                <>










                    {/* Queue status   */}


                </>
            </Div>


        </SafeAreaView>

    )
}
