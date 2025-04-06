import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../Components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PlaceDetails from './parts/PlaceDetails'
import { InfoContext } from '../../context/InfoContext'
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import QueueDetails from './parts/QueueDetails'
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function BankQueue({ route }) {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const { t, i18n } = useTranslation();
    const { place } = route.params;
    const [placeServices, setPlaceServices] = useState(null)
    const [loading, setLoading] = useState(false)
    const { info } = useContext(InfoContext)

    const [serviceId, setServiceId] = useState(null)
    const [servicesModalVisible, setServicesModalVisible] = useState(false)
    const [last_queue, setLastQueue] = useState(null)
    const [loadingFetchData, setLoadingFetchData] = useState(false)
    const [userId, setUserId] = useState(null);
    const [waitingQueues, setWaitingQueues] = useState(null);


    const toggleServicesModal = () => {
        setServicesModalVisible(!servicesModalVisible);
    };



    // ********************************* Fetch Place Services Start **********************************
    const fetch_place_services = async () => {
        try {
            setLoadingFetchData(true);
            const response = await axios.get(`${info.appUrl}/api/v1/services/place/services/${place._id}`)
            const data = response.data.services
            if (data.length > 0) {
                setPlaceServices(data)
                setServicesModalVisible(true)
            } else {
                setPlaceServices([]);
            }
        } catch (error) {
            console.log("Error Fetching Place Services" + error)
        } finally {
            setLoadingFetchData(false);
        }
    }
    useEffect(() => {
        fetch_place_services()
    }, [])

    // ********************************* Fetch Place Services End **********************************



    // ******************************* Get Last Quaue Start **********************************************
    const get_last_queue = async (service) => {
        try {
            const response = await axios.get(`${info.appUrl}/api/v1/services/last/queue/${place._id}/${service._id}`)
            const lastQueue = response.data.queue;
            setLastQueue(lastQueue)
        } catch (error) {
            console.log(error)
        }
    }

    if (placeServices && placeServices.length === 0) {
        const get_last_queue_for_place = async () => {
            try {
                const response = await axios.get(`${info.appUrl}/api/v1/services/last/queue/${place._id}`)
                const lastQueue = response.data.queue;
                setLastQueue(lastQueue)
                console.log(lastQueue)
            } catch (error) {
                console.log(error)

            }
        }
        get_last_queue_for_place()
    }

    // ******************************* Get Last Quaue End **********************************************



    // ******************************** Get All Waiting Queues Start ********************************
    const get_all_waiting_queues = async () => {
        try {
           
            // const response = await axios.get(`${info.appUrl}/api/v1/queues/all/queue/${place._id}/${serviceId}`)
            const url = serviceId 
            ? `${info.appUrl}/api/v1/queues/all/queue/${place._id}/${serviceId}` 
            : `${info.appUrl}/api/v1/queues/all/queue/${place._id}`;
        
           // Make the GET request
           const response = await axios.get(`${info.appUrl}/api/v1/queues/all/queue/${place._id}/${serviceId}`);

            setWaitingQueues(response.data)

        } catch (error) {
            console.log("Error Fetching Place Services" + error)
        }
    }
    useEffect(()=>{
        get_all_waiting_queues()
    },[])

    // ******************************** Get All Waiting Queues End ********************************




    // *********************************  book_new_queue Start *******************************************
    const book_new_queue = async () => {
        try {
            if (!userId) {
                console.log("User ID is not available yet. Fetching...");
                // Fetch device ID if userId is not available
                await fetchDeviceId(); // Wait for the userId to be set
            }
            console.log("User ID: ", userId)
            setLoading(true)
             fetchDeviceId()
            const response = await axios.post(`${info.appUrl}/api/v1/queues/book/new/queue/${userId}/${place._id}/${serviceId}`)
            setLoading(false)
            const queue = response.data
            
           navigation.navigate("MyQueue", { queue: queue, place: place })
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    // *********************************  book_new_queue End *******************************************









    // ********************************* Get Device ID Start *******************************************
    const fetchDeviceId = async () => {
        const storedDeviceId = await AsyncStorage.getItem('deviceId');
    
        if (storedDeviceId) {
            setUserId(storedDeviceId); // Use the stored device ID
        } else {
            // Generate a unique ID using Device information
            const uniqueDeviceId = `${Device.deviceId || Device.modelName}-${Date.now()}`;
            await AsyncStorage.setItem('deviceId', uniqueDeviceId); // Store the generated ID
            setUserId(uniqueDeviceId); // Update the state with the new ID
        }
    };


    useEffect(()=>{
        fetchDeviceId()
    },[userId])

    // ******************************* Get Device ID End *******************************************




    return (
        <SafeAreaView>

            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
                <CloseBtn />

                {/* Bank name And Address Start */}
                <PlaceDetails place={place} />
                {/* Bank name And Address Start */}



                 
                {placeServices !== null && placeServices.length > 0 ? (
                    <>
                        <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                    </>) : (
                    <>
                        <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                    </>)}

            </Div>





            {/* Modal Services  */}
            <Modal isVisible={servicesModalVisible}>
                <Div bg='white' rounded={20} p={10} position='relative' >
                    {placeServices !== null && placeServices.length > 0 ? (
                        <Div px={10} py={10} mt={70}>
                            <Text textAlign='center' fontWeight='bold' fontSize={20} mb={20}>{t('select-your-service')}</Text>
                            {placeServices.map((service) => (
                                <Button
                                    w="100%"
                                    h={70}
                                    onPress={() => {
                                        setServiceId(service._id)
                                        get_last_queue(service)
                                        get_all_waiting_queues()

                                        setServicesModalVisible(false)

                                    }}
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
                        </Div>
                    ) : (<Text>no</Text>)}


                    <Button
                        onPress={toggleServicesModal} bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        h={40}
                        w={40}
                        mt={20}
                        rounded={10}
                        position='absolute'
                        right={10}
                        top={10}
                        p={0}

                    >
                        <AntDesign name="close" size={20} color="white" />
                    </Button>
                </Div>
            </Modal>

        </SafeAreaView>

    )
}





