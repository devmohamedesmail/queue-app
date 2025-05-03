import { SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext';
import CustomHeader from '../../custom/CustomHeader';
import colors from '../../config/colors';
import CustomInput from '../../custom/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../custom/CustomButton';
import InboxItem from './InboxItem';
import axios from 'axios';
import { InfoContext } from '../../context/InfoContext';
import { AuthContext } from '../../context/AuthContext';

const Inbox = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [helpMessages, setHelpmessages] = useState([]);
  const { info } = useContext(InfoContext)
  const { auth } = useContext(AuthContext)


  const fetch_help_replies = async () => {
    try {
      const response = await axios.get(`${info.appUrl}/api/v1//show/help/replies/67f7e188b2653e8589c142e0`)
      setHelpmessages(response.data.help)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_help_replies()
  }, [])


  return (
    <SafeAreaView>
      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%">
        <CustomHeader />
        <Div px={10} mt={20}>


          <Text textAlign='center' fontWeight='bold' fontSize={17} mb={20}>{t('inbox')}</Text>


          {helpMessages.length > 0 ? (
            helpMessages.map((msg, index) => (
              <InboxItem key={index} topic={msg.topic} message={msg.message} />
            ))
          ) : (
            <Text textAlign='center' color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}>
              {t('No messages')}
            </Text>
          )}
        </Div>
      </Div>
    </SafeAreaView>
  )
}

export default Inbox