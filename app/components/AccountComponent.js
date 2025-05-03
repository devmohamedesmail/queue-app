import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React, { useContext, useState } from 'react'
import { Modal, Button, Div, Text } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAccountButton from '../custom/CustomAccountButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import CustomButton from '../custom/CustomButton';
import ModalCloseBtn from './ModalCloseBtn';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';



const AccountComponent = ({ accountModalVisible, setAccountModalVisible }) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const navigation = useNavigation();
    const [editInfoModalVisible, setEditInfoModalVisible] = useState(false);

    return (
        <>
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
                            title={t('update-your-information')}
                            onPress={() => {
                                auth ? navigation.navigate('EditInfo') : navigation.navigate('Login')
                            }}

                        />

                        <CustomAccountButton

                            icon={<MaterialIcons name="history" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                            title={t('history')}
                            onPress={() => {
                                auth ? navigation.navigate('History') : navigation.navigate('Login')
                            }}
                        />


                        <CustomAccountButton
                            icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                            title={t('favourite')}
                            onPress={() => {
                                auth ? navigation.navigate('Favourite') : navigation.navigate('Login')
                            }}

                        />


                        <CustomAccountButton
                            icon={<Feather name="help-circle" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />}
                            title={t('need-help')}
                            onPress={() => {
                                auth ? navigation.navigate('Help') : navigation.navigate('Login')
                            }}

                        />
                    </Div>



                    <Div px={10} bottom={20} position='absolute' right={0} left={0}>



                        {auth && auth.user ? (
                            <>
                                <Div mb={10}>
                                    <CustomButton
                                        onPress={() => logout()}

                                        title={t('logout')} w="100%" bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                                </Div>

                                <Div mb={20}>
                                    <CustomButton title={t('delete-account')} w="100%" bg="red600" />
                                </Div>

                            </>

                        ) : (
                            <Div mb={10}>
                                <CustomButton
                                    onPress={() => navigation.navigate('Login')}
                                    title={t('login')} w="100%" bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                            </Div>
                        )}



                    </Div>
                </Div>






            </Modal>





        </>

    )
}

export default AccountComponent