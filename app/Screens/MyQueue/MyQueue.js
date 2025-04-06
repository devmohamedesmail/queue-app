import React from 'react'
import { Button, Div, Text } from 'react-native-magnus'

import colors from '../../config/colors'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'

import AntDesign from '@expo/vector-icons/AntDesign';
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../Components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import QueueItem from './parts/QueueItem';
import MyQueues from './parts/MyQueues';


export default function MyQueue({route}) {
    const navigation = useNavigation();
    const { theme } = useTheme()
    const { t } = useTranslation()
    const { queue, place } = route.params;
    return (
        <SafeAreaView>

            <Div bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.black} h="100%" >

                <CloseBtn />

                <Text
                    textAlign='center'
                    fontWeight='bold'
                    fontSize={25}
                    mt={20}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}>{t('my-queues')}</Text>



              <MyQueues />



            </Div>
        </SafeAreaView>
    )
}
