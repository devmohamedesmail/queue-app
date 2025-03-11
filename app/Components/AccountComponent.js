import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React from 'react'
import { Modal, Button, Div, Text } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAccountButton from '../CustomComponents/CustomAccountButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import CustomButton from '../CustomComponents/CustomButton';
import ModalCloseBtn from './ModalCloseBtn';

const AccountComponent = ({ accountModalVisible, setAccountModalVisible }) => {
    const { theme } = useTheme();
    const { t , i18n} = useTranslation();
    return (
        <Modal isVisible={accountModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>
            
            <ModalCloseBtn onPress={() => setAccountModalVisible(false)} />


            <Div h="100%" position='relative'>

                <Div mt={100}>
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontWeight='bold'
                        fontSize={20}
                        textAlign='center'
                        mb={20} 
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}>
                            
                            {t('account')}
                        
                    </Text>


                    <CustomAccountButton
                        icon={<FontAwesome name="edit" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                        title={t('update-your-information')} />

                    <CustomAccountButton
                        icon={<MaterialIcons name="history" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                        title={t('history')} />


                    <CustomAccountButton
                        icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                        title={t('favourite')} />


                    <CustomAccountButton icon={<Feather name="help-circle" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />} title="Need Help" />
                </Div>



                <Div px={10} bottom={20} position='absolute' right={0} left={0}>

                    <Div mb={10}>
                        <CustomButton title={t('logout')} w="100%" bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                    </Div>


                    <Div mb={20}>
                        <CustomButton title={t('delete-account')} w="100%" bg="red600" />
                    </Div>
                </Div>
            </Div>






        </Modal>
    )
}

export default AccountComponent