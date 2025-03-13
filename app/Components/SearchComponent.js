import React, { useState } from 'react'
import { Dropdown, Button, Text, Div, Input, Icon, ScrollDiv } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';
import places from '../config/places';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CustomIconBtn from '../CustomComponents/CustomIconBtn';
import { useTranslation } from 'react-i18next';




const dropdownRef = React.createRef();

export default function SearchComponent() {
    const navigation = useNavigation()
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();
    return (
        <Div >

            <CustomIconBtn
                icon={<AntDesign name="search1" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}
                onPress={() => dropdownRef.current.open()}
            />




            <Dropdown
                ref={dropdownRef}
                bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}
                mt="md"
                pb="2xl"
                h="90%"
                showSwipeIndicator={true}
                roundedTop="xl">
                <Dropdown.Option py="md" px="xl" block bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.background}>
                    <Input
                        placeholder={t('search')}
                        p={10}
                        h={60}
                        w="100%"
                        focusBorderColor={colors.primary}
                        suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
                    />
                </Dropdown.Option>

                <Div >
                    <ScrollDiv >
                        {places.map((place, index) => (
                            <Dropdown.Option
                                py={3}
                                px="xl"
                                my={3}
                                block
                                key={index}
                                bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
                                borderBottomWidth={theme === 'light' ? 1 : .3}
                                borderBottomColor='gray300'
                            >
                                <Button
                                    onPress={() => navigation.navigate("BankQueue")}
                                    w="100%"
                                    bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
                                    m={0}
                                    p={0}

                                    h={70}>
                                    <Div flexDir='column' w="100%">
                                        <Text fontWeight='bold' color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} mb={5} fontFamily='poppins-bold'>{place.title}</Text>
                                        <Text color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>{place.address}</Text>
                                    </Div>
                                </Button>
                            </Dropdown.Option>
                        ))}
                    </ScrollDiv>
                </Div>





            </Dropdown>






        </Div>
    )
}
