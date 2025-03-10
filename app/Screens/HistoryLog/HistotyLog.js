import React from 'react'
import BackBtn from '../../Components/BackBtn'
import NotificationComponent from '../../Components/NotificationComponent'
import DrawerComponent from '../../Components/DrawerComponent'
import { Div, ScrollDiv, Text } from 'react-native-magnus'
import HistoryItem from './HistoryItem'
import { SafeAreaView } from 'react-native'
import colors from '../../config/colors'
import StatusBarComponent from '../../Components/StatusBarComponent'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import CloseBtn from '../../Components/CloseBtn'

export default function HistotyLog() {
  const { t } = useTranslation()
  const {theme}=useTheme();
  return (
    <SafeAreaView>
      
      
      <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black}>
          <CloseBtn />

        <Text 
          mt={10} 
          mb={20} 
          color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
          textAlign='center' 
          fontWeight='bold' 
          fontSize={20}>
            {t('history')}
        </Text>


        <ScrollDiv>
          <Div>
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
          </Div>
        </ScrollDiv>
      </Div>
    </SafeAreaView>
  )
}
