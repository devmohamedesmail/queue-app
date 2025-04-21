import {  SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Div ,Text} from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import CustomHeader from '../../CustomComponents/CustomHeader';
import colors from '../../config/colors';
import CustomInput from '../../CustomComponents/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../CustomComponents/CustomButton';

const Help = () => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation()
    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    return (
        <SafeAreaView>
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
                <CustomHeader />
                <Div px={10} mt={20}>
                    <Text textAlign='center' fontSize={15} fontWeight='bold' mb={20}>{t('help-title')}</Text>
                    <CustomInput placeholder={t('topic')} value={topic} onChange={(text) => setTopic(text)} />
                    <CustomInput h={300} placeholder={t('message')} value={message} onChange={(text) => setMessage(text)} />
                    <Div>
                        <CustomButton title={t('send')} w='100%' bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />
                    </Div>
                </Div>
            </Div>
        </SafeAreaView>
    )
}

export default Help