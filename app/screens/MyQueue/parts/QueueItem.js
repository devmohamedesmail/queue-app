import React, { useContext, useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import CustomButton from '../../../custom/CustomButton';

import { useTranslation } from 'react-i18next';
import colors from '../../../config/colors';
import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { InfoContext } from '../../../context/InfoContext';
import CustomActivityIndicator from '../../../custom/CustomActivityIndicator';
import Toast from 'react-native-toast-message';

const QueueItem = ({ queue, fetch_today_queues_for_user }) => {
    const [queueModalVisible, setQueueModalVisible] = useState(false);
    const [existModalVisible, setExistModalVisible] = useState(false);
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [queueId, setQueueId] = useState(null)
    const [loading, setLoading] = useState(false)
    const { info } = useContext(InfoContext)



    // ************************************ Move queue Start function ******************************
    const queueToggleModal = () => {
        setQueueModalVisible(!queueModalVisible);
    };
    // ************************************ Move queue End function ******************************





    // ************************************ Exit queue Start function ******************************
    const exitToggleModal = () => {
        setExistModalVisible(!existModalVisible);
    };
    // ************************************ Exit queue End function ******************************



    // ************************************ Cancel queue Start function ******************************

    const cancel_queue = async (queueId) => {
        try {

            setLoading(true)
            const response = await axios.get(`${info.appUrl}/api/v1/queues/cancel/queue/${queueId}`)
            const data = response.status
            if (data === "sucess" || data === 200) {
                setExistModalVisible(false)
                Toast.show({
                    type: 'success',
                    text1: t('queue-cancel-success'),
                    visibilityTime: 3000,
                    position: 'top',
                })
                setQueueId(null)
                setLoading(false)
                fetch_today_queues_for_user()
                

            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('queue-cancel-error'),
                visibilityTime: 3000,
                position: 'top',
            })
            setLoading(false)
            setExistModalVisible(false)
            setQueueId(null)

            console.log(error)
        } finally {
            setLoading(false)
            setExistModalVisible(false)
            setQueueId(null)
        }
    }

    // ****************************** Cancel queue End function *************************************


    // move queue function 
    const move_queue = async (queueId) => {
        try {

            setLoading(true)
            const response = await axios.get(`${info.appUrl}/api/v1/queues/move/queue/${queueId}`)
            const data = response.status
            if (data === "sucess" || data === 200) {
                setQueueModalVisible(false)
                Toast.show({
                    type: 'success',
                    text1: t('queue-move-success'),
                    visibilityTime: 3000,
                    position: 'top',
                })
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('queue-move-error'),
                visibilityTime: 3000,
                position: 'top',
            })
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Div borderColor={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} borderWidth={1} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.voilet} m='auto' rounded={20} mx={10}>

            <Div flexDir='column' justifyContent='center' alignItems='center' mt={30}>
                <Text
                    fontWeight='bold'
                    fontSize={16}
                    textAlign='center'
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>
                    {i18n.language === "ar" ? queue.queue.place.nameAr : queue.queue.place.nameEn}
                </Text>


                <Text
                    textAlign='center'
                    mt={4}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    fontSize={12}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>
                    {i18n.language === "ar" ? queue.queue.place.addressAr : queue.queue.place.addressEn}
                </Text>
            </Div>




            <Div bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} mt={30} py={20}>
                <Div flexDir='column' justifyContent='center' alignItems='center' pb={20}>
                    <Text
                        fontWeight='bold'
                        fontSize={20}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        mb={10}
                    >{t('head-of-queue')}
                    </Text>
                    <Text
                        fontWeight='bold'
                        fontSize={14}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >
                        {queue.aheadOfYou > 1 ? queue.aheadOfYou : t('your-turn-now')}
                    </Text>
                </Div>


                <Div flexDir='row' justifyContent='center' borderBottomColor='gray500' h={80} borderBottomWidth={1} borderTopColor='gray500' borderTopWidth={1}>


                    <Div flexDir='column' justifyContent='center' w="49%" alignItems='center' borderRightColor='gray500' borderRightWidth={1}>
                        <Text
                            fontWeight='bold'
                            fontSize={15}
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            mb={10}
                        >{t('your-number')}</Text>
                        <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >{queue.queue.queue}</Text>
                    </Div>


                    <Div flexDir='column' justifyContent='center' w="49%" alignItems='center'>
                        <Text
                            fontWeight='bold'
                            fontSize={15}
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            mb={10}
                        >{t('now-serving')}</Text>
                        <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >{queue.nowServingQueue}</Text>
                    </Div>
                </Div>

                <Div flexDir='column' justifyContent='center' alignItems='center' pt={20}>
                    <Text
                        fontWeight='bold'
                        fontSize={15}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        mb={10}
                    >{t('estimate-time')}</Text>
                    <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >{queue.estimatedTime}</Text>
                </Div>

            </Div>




            {/* Action Buttons */}
            <Div flexDir='column' justifyContent='center' alignItems='center' w="100%" my={5}>

                <Div my={10} w={"100%"}>
                    <CustomButton title={t('moveQueue')} onPress={() => {
                        queueToggleModal(queue.queue._id)
                        setQueueId(queue.queue._id)
                    }} w="90%" />
                </Div>



                <Div my={10} w={"100%"}>
                    <CustomButton
                        title={t('exitQueue')}
                        onPress={() => {
                            exitToggleModal(queue.queue._id)
                            setQueueId(queue.queue._id)
                        }}
                        bg="red600"
                        w="90%" />
                </Div>

            </Div>






            {/* queue choose modal start */}
            <Modal isVisible={queueModalVisible}>
                <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={10} px={10} py={40}>


                    <Text
                        textAlign='center'

                        mb={30}
                        fontSize={15}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    >
                        {t('move-alert')}

                    </Text>






                    {loading ? <CustomActivityIndicator /> :
                        <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                            <CustomButton onPress={() => move_queue(queueId)} title={t('ok')} w="48%" />
                            <CustomButton onPress={queueToggleModal} title={t('close')} bg="red600" w="48%" />
                        </Div>}

                </Div>
            </Modal>
            {/* queue choose modal end */}








            {/* ********************************* Exit Queue  modal start ****************************** */}
            <Modal isVisible={existModalVisible} animationIn={"bounceIn"} animationOut="bounceOut" animationInTiming={500} animationOutTiming={500}>
                <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={10} px={10} py={40}>
                    <Text
                        textAlign='center'

                        mb={30}
                        fontSize={15}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    >
                        {t('exist-alert')}

                    </Text>

                    <Div flexDir='row' alignItems='center' justifyContent='space-between'>

                        {loading ? <CustomActivityIndicator /> :
                            <>
                                <CustomButton onPress={() => cancel_queue(queueId)} title={t('ok')} bg={colors.lightTheme.primary} w="48%" />
                                <CustomButton onPress={exitToggleModal} title={t('close')} bg="red600" w="48%" /></>


                        }

                    </Div>

                </Div>
            </Modal>
            {/* ********************************* Exit Queue  modal End ****************************** */}






        </Div>
    )
}

export default QueueItem