import React from 'react'
import colors from '../../../config/colors'
import Modal from "react-native-modal";
import { Div, Text, Button } from 'react-native-magnus';
import { useTheme } from '../../../context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../../CustomComponents/CustomButton';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';



export default function PlaceModal({ isModalVisible, toggleModal, selectedPlace }) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
   
    return (
        <Modal isVisible={isModalVisible} animationIn="bounceIn" animationOut="bounceOut" animationInTiming={500} animationOutTiming={500}>
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark} rounded={20}>

                <Div flexDir='row' justifyContent='flex-end'>
                    <Button onPress={() => toggleModal()} bg='transparent'>
                        <AntDesign name="close" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} />
                    </Button>
                </Div>


                <Div flexDir='column' justifyContent='center' alignItems='center'>
                    <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white} my={20} fontSize={13}> {t('book-confirm')} </Text>

                    <Text
                        fontWeight='bold'
                        my={20}
                        fontSize={12}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                        textAlign='center'
                    >
                        {selectedPlace ? (i18n.language === "ar" ? selectedPlace.nameAr : selectedPlace.nameEn) : "جارٍ التحميل..."}


                    </Text>
                </Div>


                <Div flexDir='row' px={20} my={20} justifyContent='space-evenly'>
                    <CustomButton title={t('close')} bg="red600" w="45%" onPress={() => toggleModal()} />
                    <CustomButton title={t('ok')} bg={colors.lightTheme.primary} w="45%" onPress={() => navigation.navigate("BankQueue", { place: selectedPlace })} />
                </Div>



            </Div>
        </Modal>
    )
}
