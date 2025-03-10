import React, { useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import colors from '../../config/colors'
import Modal from 'react-native-modal';
import { Alert } from 'react-native';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import CustomButton from '../../CustomComponents/CustomButton';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';


const QueueItem = () => {
    const [queueModalVisible, setQueueModalVisible] = useState(false);
    const [existModalVisible, setExistModalVisible] = useState(false);
    const {theme}=useTheme();
    const{t}=useTranslation()




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



    return (
        <Div borderColor={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.black} borderWidth={1} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.voilet} m='auto' rounded={20} mx={10}>

            <Div flexDir='column' justifyContent='center' alignItems='center' mt={50}>
                <Text fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>Bank of Dubai</Text>
                <Text mt={4} fontSize={12} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>Dubai, United Arab Emirates</Text>
            </Div>




            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} mt={50} py={20}>
                <Div flexDir='column' justifyContent='center' alignItems='center' pb={20}>
                    <Text fontWeight='bold' fontSize={20}>{t('head-of-queue')}</Text>
                    <Text fontWeight='bold' fontSize={14}>10</Text>
                </Div>


                <Div flexDir='row' justifyContent='center' borderBottomColor='gray500' h={80} borderBottomWidth={1} borderTopColor='gray500' borderTopWidth={1}>


                    <Div flexDir='column' justifyContent='center' w="49%" alignItems='center' borderRightColor='gray500' borderRightWidth={1}>
                        <Text fontWeight='bold' fontSize={15}>{t('your-number')}</Text>
                        <Text fontWeight='bold'>100</Text>
                    </Div>


                    <Div flexDir='column' justifyContent='center' w="49%" alignItems='center'>
                        <Text fontWeight='bold' fontSize={15}>{t('now-serving')}</Text>
                        <Text fontWeight='bold'>90</Text>
                    </Div>
                </Div>

                <Div flexDir='column' justifyContent='center' alignItems='center' pt={20}>
                    <Text fontWeight='bold' fontSize={15}>{t('estimate-time')}</Text>
                    <Text fontWeight='bold'>1:50 H</Text>
                </Div>

            </Div>




            {/* Action Buttons */}
            <Div flexDir='column' justifyContent='center' alignItems='center' w="100%" my={20}>
                <Button
                    onPress={queueToggleModal}
                    w="90%" 
                    alignSelf='center' 
                    my={7} 
                    h={65} 
                    bg='transparent' 
                    borderColor={colors.primary} 
                    borderWidth={2} 
                    color={colors.primary} 
                    fontWeight='bold' 
                    fontSize={20} 
                    rounded={15}>
                        {t('moveQueue')}
                </Button>



                <Button
                    onPress={exitToggleModal}
                    w="90%" 
                    alignSelf='center' 
                    my={7} 
                    h={65} 
                    bg={colors.darkTheme.primary} 
                    borderColor={colors.primary} 
                    borderWidth={2} 
                    color="white" 
                    fontWeight='bold' 
                    fontSize={20} 
                    rounded={15}>
                        {t('exitQueue')}
                </Button>
            </Div>






            {/* queue choose modal start */}
            <Modal isVisible={queueModalVisible}>
                <Div bg='white' rounded={10} px={10} py={40}>
                    <Text textAlign='center' fontWeight='bold' mb={30}>Select Your New Turn  ? </Text>
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
                        <CustomButton onPress={queueToggleModal} title="ok" bg={colors.primary} w="48%" />
                        <CustomButton onPress={queueToggleModal} title="cancel" bg="red600" w="48%" />

                    </Div>

                </Div>
            </Modal>
            {/* queue choose modal end */}








            {/* ********************************* Exit Queue  modal start ****************************** */}
            <Modal isVisible={existModalVisible}>
                <Div bg='white' rounded={10} px={10} py={40}>
                    <Text textAlign='center' fontWeight='bold' mb={30}>Are You Sure To Exist Queue  ? </Text>
                    
                    <Div flexDir='row' alignItems='center' justifyContent='space-between'>
                        <CustomButton onPress={exitToggleModal} title="ok" bg={colors.primary} w="48%" />
                        <CustomButton onPress={exitToggleModal} title="cancel" bg="red600" w="48%" />

                    </Div>

                </Div>
            </Modal>
            {/* ********************************* Exit Queue  modal End ****************************** */}






        </Div>
    )
}

export default QueueItem