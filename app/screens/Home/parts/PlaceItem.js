import React from 'react'
import { Button } from 'react-native-magnus'
import { useTheme } from '../../../context/ThemeContext'
import { Div } from 'react-native-magnus';
import colors from '../../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from '../../../custom/CustomText';

export default function PlaceItem({ onPress, name, address, id, add_to_favorites, distance, isFavorite }) {
    const { theme } = useTheme();


    return (
        <Button
            bg='transparent'
            onPress={onPress}
            key={id}
            flexDir='row'
            alignItems='center'
            
            my={5}
            borderBottomWidth={1}
            borderBottomColor='gray300'
            h={75}>
            <Div flexDir='row' justifyContent='space-between' px={10}>
                <Div w="85%">
                    <CustomText content={name} color={theme === 'light' ? "" : "#a2a4f8"} />
                    <CustomText content={address} fontSize={10} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} />
                </Div>
                <Div flexDir='column' justifyContent='center' alignItems='center'>
                    {distance && (

                        <CustomText fontSize={10} content={`${distance} Km`} />
                    )}

                    <Button bg='transparent' onPress={add_to_favorites}>
                        {isFavorite ?
                            <AntDesign name="heart" size={24} color="red" />
                            :
                            <AntDesign name="hearto" size={20} color="red" />
                        }

                    </Button>

                </Div>
            </Div>
        </Button>
    )
}
