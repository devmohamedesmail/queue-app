import React from 'react'
import { Button } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { Div, Text } from 'react-native-magnus';
import colors from '../../../config/colors'
import { useTranslation } from 'react-i18next';


export default function PlaceItem({ onPress, name, address, id, distance }) {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();

    return (
        <Button
            bg='transparent'
            onPress={onPress}
            key={id}
            flexDir='row'
            alignItems='center'
            px={15}
            my={5}
            borderBottomWidth={1}
            borderBottomColor='gray300'
            h={70}>
            <Div flex={1} mr={10}>
                <Text
                    fontWeight='semibold'
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    fontSize={11}
                    color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                    mb={5}
                >
                    {name}
                </Text>
                <Text
                    fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}
                    fontSize={10}
                >{address}</Text>
            </Div>
            <Div>
                {distance != null ? (
                    <Text
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        fontSize={16}
                    >
                        {distance.toFixed(1)} Km
                    </Text>
                ) : (
                    <Text color="gray400" fontSize={16}> -- </Text>
                )}
            </Div>
        </Button>
    )
}
