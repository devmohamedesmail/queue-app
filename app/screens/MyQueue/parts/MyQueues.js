import Swiper from 'react-native-swiper'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../../config/colors'
import QueueItem from './QueueItem'
import { InfoContext } from '../../../context/InfoContext'
import axios from 'axios'
import { Text, Div, Skeleton } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../../context/AuthContext'
import { api } from '../../../config/api'

const MyQueues = () => {
    const [queues, setQueues] = useState(null)
    const { t } = useTranslation();
    const { auth} = useContext(AuthContext);
    // ********************************* Fetch User Queues Start **********************************
    const fetch_today_queues_for_user = async () => {
        try {
            // const response = await axios.get(`${info.appUrl}api/v1/queues/user/queues/${auth.user.user._id}`)
            const response = await axios.get(`${api.url}api/v1/queues/user/queues/${auth.user.user._id}`)
            const data = response.data;
            if (data.length > 0) {
                setQueues(data)
            } else {
                setQueues([])
            }
        } catch (error) {
            console.log("Error Fetching user queues" + error)

        }
    }


    useEffect(() => {
        fetch_today_queues_for_user()
    }, [auth, queues])


    // ********************************* Fetch User Queues End **********************************
 if (queues === null) {
        return (
            <Div flexDir="row" mt="md">
                <Div flex={1} flexDir='column' justifyContent='center' w="100%" px={10}>
                    <Skeleton.Box mt="sm" alignSelf='center' w={300} h={70} />
                    <Skeleton.Box mt="md" h={500} />
                    <Skeleton.Box mt="md" h={60} />
                    <Skeleton.Box mt="md" h={60} />
                </Div>
            </Div>
        )
    }

    if (queues.length === 0) {
        return <Text textAlign="center" mt="xl">{t('no-queues')}</Text>
    }


    return (
        <Swiper
            showsButtons={false}
            loop={false}
            dotColor='gray'
            activeDotColor={colors.primary}
            key={queues.length} 
        >
            {queues.map((queue, index) => (
                <QueueItem
                    key={queue._id || index}
                    queue={queue}
                    fetch_today_queues_for_user={fetch_today_queues_for_user}
                />
            ))}
        </Swiper>
    )
}

export default MyQueues