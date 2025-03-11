import { Modal, Div, Text } from 'react-native-magnus'
import React from 'react'
import ModalCloseBtn from './ModalCloseBtn'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../config/colors'
import Swiper from 'react-native-swiper'
import QueueItem from '../Screens/MyQueue/QueueItem'
import { StyleSheet, View } from 'react-native'

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
                        >{t('my-queue')}
                    </Text>






                    <Div h="90%">
                        <Swiper showsButtons={false} autoplay={true} autoplayTimeout={300} loop={true} dotColor='gray' activeDotColor={colors.lightTheme.primary}>
                            <QueueItem />
                            <QueueItem />
                            <QueueItem />
                            <QueueItem />
                            <QueueItem />
                            <QueueItem />
                        </Swiper>
                    </Div>





                </Div>

            </Div>

        </Modal>
    )
}






export default MyQueueComponent