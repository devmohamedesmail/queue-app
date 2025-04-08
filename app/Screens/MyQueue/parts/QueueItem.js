import React, { useContext, useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import CustomButton from '../../../CustomComponents/CustomButton';

import { useTranslation } from 'react-i18next';
import colors from '../../../config/colors';
import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { InfoContext } from '../../../context/InfoContext';
import CustomActivityIndicator from '../../../CustomComponents/CustomActivityIndicator';

const QueueItem = ({ queue }) => {
    const [queueModalVisible, setQueueModalVisible] = useState(false);
    const [existModalVisible, setExistModalVisible] = useState(false);
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [queueId, setQueueId] = useState(null)
    const [loading, setLoading] = useState(false)
    const { info } = useContext(InfoContext)

    const [aheadOfYou, setAheadOfYou] = useState(0);
    const [nowServing, setNowServing] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState("0:00 H");




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
            if (data === "sucess") {
                setExistModalVisible(false)
                setQueueId(null)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
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



    return (
        <Div borderColor={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} borderWidth={1} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.voilet} m='auto' rounded={20} mx={10}>

            <Div flexDir='column' justifyContent='center' alignItems='center' mt={30}>
                <Text
                    fontWeight='bold'
                    fontSize={16}
                    textAlign='center'
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>
                    {i18n.language === "ar" ? queue.place.nameAr : queue.place.nameEn}
                </Text>


                <Text
                    mt={4}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    fontSize={12}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>
                    {i18n.language === "ar" ? queue.place.addressAr : queue.place.addressEn}
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
                    <Text fontWeight='bold' fontSize={14} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >10</Text>
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
                        <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >{queue.queue}</Text>
                    </Div>


                    <Div flexDir='column' justifyContent='center' w="49%" alignItems='center'>
                        <Text
                            fontWeight='bold'
                            fontSize={15}
                            color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            mb={10}
                        >{t('now-serving')}</Text>
                        <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >90</Text>
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
                    <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} >1:50 H</Text>
                </Div>

            </Div>




            {/* Action Buttons */}
            <Div flexDir='column' justifyContent='center' alignItems='center' w="100%" my={5}>

                <Button
                    onPress={queueToggleModal}
                    w="90%"
                    alignSelf='center'
                    my={10}
                    h={60}
                    bg={colors.lightTheme.primary}
                    shadow="md"
                    color="white"
                    fontWeight='bold'
                    fontSize={20}
                    rounded={15}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                >
                    {t('moveQueue')}
                </Button>



                <Button
                    onPress={() => {
                        exitToggleModal(queue._id)
                        setQueueId(queue._id)
                    }}
                    w="90%"
                    alignSelf='center'
                    my={7}
                    h={60}
                    bg="red600"
                    shadow="md"
                    color="white"
                    fontWeight='bold'
                    fontSize={20}
                    rounded={15}
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                >
                    {t('exitQueue')}
                </Button>
            </Div>






            {/* queue choose modal start */}
            <Modal isVisible={queueModalVisible}>
                <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={10} px={10} py={40}>
                    <Text
                        textAlign='center'
                        fontWeight='bold'
                        fontSize={20}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                        mb={30}>
                        Select Your New Turn  ?
                    </Text>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={0}
                        maximumValue={300}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor="#000000"
                        tapToSeek={true}
                        onValueChange={(e) => console.log(e)}
                        value={20}
                    />
                    <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                        <CustomButton onPress={queueToggleModal} title={t('ok')} bg={colors.lightTheme.primary} w="48%" />
                        <CustomButton onPress={queueToggleModal} title={t('close')} bg="red600" w="48%" />

                    </Div>

                </Div>
            </Modal>
            {/* queue choose modal end */}








            {/* ********************************* Exit Queue  modal start ****************************** */}
            <Modal isVisible={existModalVisible} animationIn={"bounceIn"} animationOut="bounceOut" animationInTiming={500} animationOutTiming={500}>
                <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={10} px={10} py={40}>
                    <Text
                        textAlign='center'
                        fontWeight='bold'
                        mb={30}
                        fontSize={20}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                    >
                        {t('exist-alert')}

                    </Text>

                    <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                        {loading ?
                        <CustomActivityIndicator />
                        : 
                        <CustomButton onPress={() => cancel_queue(queueId)} title={t('ok')} bg={colors.lightTheme.primary} w="48%" />
                        }
                        
                        <CustomButton onPress={exitToggleModal} title={t('close')} bg="red600" w="48%" />

                    </Div>

                </Div>
            </Modal>
            {/* ********************************* Exit Queue  modal End ****************************** */}






        </Div>
    )
}

export default QueueItem