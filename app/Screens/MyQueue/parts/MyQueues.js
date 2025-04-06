import Swiper from 'react-native-swiper'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../../../config/colors'
import QueueItem from './QueueItem'
import { InfoContext } from '../../../context/InfoContext'
import axios from 'axios'
import { Text } from 'react-native-magnus'

const MyQueues = () => {
    const [queues, setQueues] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { info } = useContext(InfoContext);



    const fetch_queues = async () => {
        try {
            const response = await axios.get(`${info.appUrl}/api/v1/queues/user/queues/sdk_gphone64_x86_64-1743846232806`)
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
    }, [])





    return (
        <Swiper showsButtons={false} loop={false} dotColor='gray' activeDotColor={colors.primary}>

            {queues && queues.length > 0 ? (
                queues.map((queue, index) => (
                    <QueueItem key={index} queue={queue} />
                ))
            ) : (
                <Text>No queues available</Text> // You can show a fallback message or empty state here
            )}
        </Swiper>
    )
}

export default MyQueues