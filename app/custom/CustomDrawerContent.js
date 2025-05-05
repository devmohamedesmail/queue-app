import React, { useState } from 'react';
import { View, Text, TouchableOpacity, I18nManager, StatusBar, Dimensions } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme, ThemeProvider } from '../context/ThemeContext';
import colors from '../config/colors';
import { Div } from 'react-native-magnus';
import CustomDrawerBoxIcon from './CustomDrawerBoxIcon';

export default function CustomDrawerContent(props) {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();



    return (
        <DrawerContentScrollView  {...props} contentContainerStyle={{ flex: 1, backgroundColor: theme === 'light' ? colors.lightTheme.white : colors.lightTheme.black }}>
            <StatusBar hidden={false} />
            <Div>
                <Div flexDir='row' flexWrap='wrap' justifyContent='space-evenly' mt={50} px={5}>
                    <CustomDrawerBoxIcon icon={<AntDesign name="user" size={27} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('account')} onPress={() => setAccountModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<AntDesign name="hearto" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('favourite')} onPress={() => setFavouriteModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<MaterialIcons name="history-toggle-off" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('history')} onPress={() => setHistoryModalVisible(true)} />
                    <CustomDrawerBoxIcon icon={<MaterialCommunityIcons name="human-queue" size={24} color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} />} title={t('my-queue')} onPress={() => setQueueModalVisible(true)} />

                </Div>

            </Div>
        </DrawerContentScrollView>
    );
}
