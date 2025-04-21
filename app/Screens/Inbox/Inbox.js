import {  SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Div ,Text} from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import CustomHeader from '../../CustomComponents/CustomHeader';
import colors from '../../config/colors';
import CustomInput from '../../CustomComponents/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../CustomComponents/CustomButton';
import InboxItem from './InboxItem';

const Inbox = () => {
     const { theme } = useTheme();
        const { t, i18n } = useTranslation()
        const [topic, setTopic] = useState('')
        const [message, setMessage] = useState('')
  return (
    <SafeAreaView>
            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
                <CustomHeader />
                <Div px={10} mt={20}>
                   <InboxItem />
                   <InboxItem />
                   <InboxItem />
                   <InboxItem />
                   <InboxItem />
                </Div>
            </Div>
        </SafeAreaView>
  )
}

export default Inbox