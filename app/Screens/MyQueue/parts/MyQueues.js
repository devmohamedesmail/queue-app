import Swiper from 'react-native-swiper'
import React, { use, useContext, useEffect, useState } from 'react'
import colors from '../../../config/colors'
import QueueItem from './QueueItem'
import { InfoContext } from '../../../context/InfoContext'
import axios from 'axios'
import { Text, Div } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyQueues = () => {
    const [queues, setQueues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { info } = useContext(InfoContext);
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [userId, setUserId] = useState(null);


    // ********************************* Fetch User ID Start **********************************
    const get_user_id = async () => {
        const result = await AsyncStorage.getItem('deviceId');
        setUserId(result);
    }

    useEffect(() => {
        get_user_id()
    }, [])

    // ********************************* Fetch User ID End ***************************************



    // ********************************* Fetch User Queues Start **********************************
    const fetch_queues = async () => {
        try {
            const response = await axios.get(`${info.appUrl}/api/v1/queues/user/queues/${userId}`)
            const data = response.data;

            if (data.length > 0) {
                setQueues(data)
            } else {
                setQueues([])
            }
        } catch (error) {
            console.log("Error Fetching Place Services" + error)

        }
    }


    useEffect(() => {
        fetch_queues()
    }, [userId])


    // ********************************* Fetch User Queues End **********************************

    

    // get the first Active Queue
    const get_first_active_queue = async () => {
        try {
            const response = await axios.get(`${info.appUrl}/api/v1/queues/first/queue/${place._id}/${serviceId}`)
        } catch (error) {
            
        }
    }
   




    return (
        <Swiper showsButtons={false} loop={false} dotColor='gray' activeDotColor={colors.primary}>

            {queues && queues.length > 0 ? (
                queues.map((queue, index) => (
                    <QueueItem key={index} queue={queue} />
                ))
            ) : (
                <Div flexDir='column' justifyContent='center' alignItems='center' h="50%">
                    <MaterialCommunityIcons name="human-queue" size={40} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                    <Text textAlign='center' mt={20} fontWeight='bold' fontSize={15} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>
                        {t('no-queues')}
                    </Text>
                </Div>
            )}
        </Swiper>
    )
}

export default MyQueues