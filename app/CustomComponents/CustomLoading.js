import React, { useState } from 'react'
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-magnus'
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CustomLoading({ loading }) {
    const { theme } = useTheme();
    const {t}=useTranslation();
    return (
        <AnimatedLoader

            visible={true}
            overlayColor={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
            animationStyle={styles.lottie}
            speed={1}>
            <Text>{t('loading')}</Text>
        </AnimatedLoader>
    )
}


const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
});
