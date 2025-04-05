import React, { useState } from 'react'
import AnimatedLoader from 'react-native-animated-loader';
import {  StyleSheet } from 'react-native'
import { Text } from 'react-native-magnus'

export default function CustomLoading({ loading }) {

    return (
        <AnimatedLoader

            visible={loading}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}>
            <Text>Doing something...</Text>
        </AnimatedLoader>
    )
}


const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
    },
});
