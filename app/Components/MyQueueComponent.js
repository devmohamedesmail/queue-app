import { Modal, Div, Text } from 'react-native-magnus'
import React from 'react'
import ModalCloseBtn from './ModalCloseBtn'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../config/colors'
import Swiper from 'react-native-swiper'

import { StyleSheet, View } from 'react-native'
import QueueItem from '../Screens/MyQueue/parts/QueueItem'
import MyQueues from '../Screens/MyQueue/parts/MyQueues'

const MyQueueComponent = ({ queueModalVisible, setQueueModalVisible }) => {
    const { theme } = useTheme();
    const { t,i18n } = useTranslation();
    return (
        <Modal isVisible={queueModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setQueueModalVisible(false)} />


            <Div h="100%" position='relative' pointerEvents="box-none">

                <Div mt={80}>
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontWeight='bold'
                        fontSize={20}
                        textAlign='center'
                        mb={20}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        >{t('my-queues')} 
                    </Text>






                    <Div h="90%">
                        <MyQueues />
                    </Div>





                </Div>

            </Div>

        </Modal>
    )
}






export default MyQueueComponent