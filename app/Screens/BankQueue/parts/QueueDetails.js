import { Div, Text, Button } from 'react-native-magnus'
import colors from '../../../config/colors'
import React from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import CustomLoading from '../../../CustomComponents/CustomLoading'

const QueueDetails = ({waitingQueues,loading,book_new_queue}) => {


  const {theme}=useTheme();
  const {t,i18n}=useTranslation()



  return (
    <>
      <Div bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} py={20} my={60} w="97%" m="auto" rounded={10}>
        <Div flexDir='column' justifyContent='center' alignItems='center'>
          <Text fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>{t('clients-in-queue')}</Text>
          <Text my={10} fontWeight='bold' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{waitingQueues ? waitingQueues.length : 0}</Text>
        </Div>

        <Div w="100%" h={2} bg='white'></Div>
        <Div flexDir='row' justifyContent='space-between' alignItems='center' pt={20} px={20}>
          <Text fontWeight='bold' fontSize={16} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}>{t('estimate-time')}</Text>
          <Text fontWeight='bold' fontSize={20} color={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.primary}>
          {`${Math.floor((waitingQueues ? waitingQueues.length : 0) * 15 / 60)}:${((waitingQueues ? waitingQueues.length : 0) * 15) % 60} H`}
          </Text>
        </Div>
      </Div>


      <Div flexDir='row' justifyContent='center' alignItems='center' position='absolute' left="50%" bottom={110} style={{ transform: [{ translateX: "-50%" }] }}>

        {
          loading ? (
            <CustomLoading loading={loading} />
          ) : (
            <Button
              onPress={() => book_new_queue()}
              bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
              h={200}
              w={200}
              fontWeight='bold'
              fontSize={30}
              rounded="circle"
              shadow="md"
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              shadowColor={theme === 'light' ? colors.lightTheme.primary : colors.lightTheme.white}>
              {t('book')}
            </Button>
          )
        }
      </Div>
    </>
  )
}

export default QueueDetails