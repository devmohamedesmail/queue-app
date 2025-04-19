import React, { useState } from 'react'
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-magnus'
import colors from '../config/colors';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function CustomLoading() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    return (
        <AnimatedLoader

            visible={true}
            overlayColor="rgba(255, 255, 255, 0.75)"
            
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
