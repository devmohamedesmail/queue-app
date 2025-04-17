import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React, { useContext, useState } from 'react'
import { Modal, Button, Div, Text } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import ModalCloseBtn from '../ModalCloseBtn';
import { AuthContext } from '../../context/AuthContext';
import CustomInput from '../../CustomComponents/CustomInput';
import CustomButton from '../../CustomComponents/CustomButton';
import { InfoContext } from '../../context/InfoContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator';

const EditInfoModal = ({ editInfoModalVisible, setEditInfoModalVisible }) => {

    const { theme } = useTheme();
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const { t } = useTranslation();
    // const [name, setName] = useState(auth.user.user.name);
    // const [email, setEmail] = useState(auth.user.user.email);
    // const [password, setPassword] = useState('');
    const { info } = useContext(InfoContext)
    const [loading, setLoading] = useState(false);


    const handle_update_info = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${info.appUrl}/edit/user/${auth.user.user.id}`, {
                name: name,
                email: email,
                password: password
            }
            )
            if (response.status === 200) {
                setLoading(false);
                setEditInfoModalVisible(false);
                setAuth({ ...auth, user: { ...auth.user, name: name, email: email } });
            }
            setLoading(false);
            Toast.show({
                type: 'success',
                text1: t('success'),
                text2: t('info-updated-successfully'),
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
            })
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: t('error'),
                text2: error.response.data.message,
                position: 'top',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
            })
        }finally{
            setLoading(false);
            setEditInfoModalVisible(false);
        }
    }




    return (
        <Modal isVisible={editInfoModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setEditInfoModalVisible(false)} />


            {/* <Div h="100%" position='relative'>

                <Div mt={100}>
                    <Text textAlign='center' fontWeight='bold' color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>{t('update-your-information')}</Text>
                    <Div px={10} mt={20}>
                        <CustomInput value={auth.user.user.name} placeholder={t('name')} secureTextEntry={false} />
                        <CustomInput value={auth.user.user.email} placeholder={t('name')} secureTextEntry={false} />
                        <CustomInput placeholder={t('password')} secureTextEntry={false} />

                    </Div>
                    <Div mt={100} px={10}>
                       


                            {loading ? (
                                <CustomActivityIndicator />
                            ):(
                                 <CustomButton
                                 w="100%"
                                 bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                 title={t('update')} onPress={() => handle_update_info(name, email, password)} />
                            )}
                    </Div>

                </Div>



            </Div> */}

        </Modal>
    )
}

export default EditInfoModal