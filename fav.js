import React, { useState } from 'react'
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Div, Text } from 'react-native-magnus'
import { Image } from "react-native-magnus";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import colors from '../../config/colors';
import { useTranslation } from 'react-i18next';



export default function FavouriteItem({ item }) {
    const { theme } = useTheme();
    const { t , i18n } = useTranslation();

    return (
        <Div
            flexDir='row'
            w="98%"
            m="auto"
            my={5}
            py={30}
            bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
            rounded="md"
            borderColor='gray300'
            overflow='hidden'
            pr={10}

            borderWidth={theme === 'light' ? 1 : 0}
        >

            {/* <Div>
                <Image
                    h={80}
                    w={80}
                    rounded="md"
                    source={{
                        uri: "https://picsum.photos/200",
                    }}
                />
            </Div> */}

            <Div flexDir='column' justifyContent="center" flex={1} px={10}>
                <Text
                    fontWeight='bold'
                    fontSize={17}
                    mx={10}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                >
                    {i18n.language === 'ar' ? item.name_ar : item.name_en}
                    
                </Text>


                <Div flexDir='row' alignItems='center' mt={5}>
                    <Ionicons name="location-outline" size={14}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} />
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                        numberOfLines={3} pr={20} ellipsizeMode='tail' fontSize={10} ml={5}>
                        
                        {i18n.language === 'ar' ? item.address_ar : item.address_en}
                    </Text>
                </Div>

            </Div>
        </Div>


    )
}


