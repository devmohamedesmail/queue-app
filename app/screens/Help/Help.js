import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import CustomHeader from '../../custom/CustomHeader';
import colors from '../../config/colors';
import CustomInput from '../../custom/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../custom/CustomButton';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import CustomActivityIndicator from '../../custom/CustomActivityIndicator';

const Help = () => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const { info } = useContext(InfoContext)
    const { auth } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)



    const send_help = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${info.appUrl}/api/v1/send/help`, {
                userId: auth.user.user._id,
                topic,
                message
            })
            if (response.status === 200) {
                setLoading(false)

                Toast.show({
                    type: 'success',
                    text1: t('help-send-success'),
                   
                })

            }

        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: t('send-error'),
                
            })
        } finally {
            setLoading(false)
        }
    }





    return (
        <SafeAreaView>
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
                <CustomHeader />
                <Div px={10} mt={20}>
                    <Text 
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    
                    textAlign='center' fontSize={15} fontWeight='bold' mb={20}>{t('help-title')}</Text>
                    <CustomInput placeholder={t('topic')} value={topic} onChange={(text) => setTopic(text)} />
                    <CustomInput h={300} placeholder={t('message')} value={message} onChange={(text) => setMessage(text)} />
                    <Div>
                        {loading ? (
                            <CustomActivityIndicator />
                        ) : (
                            <CustomButton onPress={send_help} title={t('send')} w='100%' bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                        )}

                    </Div>
                </Div>
            </Div>
        </SafeAreaView>
    )
}

export default Help