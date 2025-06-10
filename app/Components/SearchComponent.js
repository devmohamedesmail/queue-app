import React, { useState } from 'react'
import { Dropdown, Button, Text, Div, Input, Icon, ScrollDiv } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CustomIconBtn from '../custom/CustomIconBtn';
import { useTranslation } from 'react-i18next';
import { getLimitedWords } from '../utils/getLimitedWords';




const dropdownRef = React.createRef();

export default function SearchComponent({ places }) {
    const navigation = useNavigation()
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');



    // Function to filter places based on the search query
    const filteredPlaces = places.filter((place) => {
        const name = i18n.language === 'ar' ? place.nameAr : place.nameEn;
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });






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
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        placeholder={t('search')}
                        p={10}
                        h={60}
                        w="100%"
                        onChangeText={(text) => setSearchQuery(text)}
                        focusBorderColor={colors.primary}
                        suffix={<AntDesign name="search1" size={20} color="black" />}
                    />
                </Dropdown.Option>

                <Div >
                    <ScrollDiv>
                        {filteredPlaces.length > 0 ? (
                            filteredPlaces.map((place, index) => (
                                <Dropdown.Option
                                    py={10}
                                    px="xl"
                                    my={3}
                                    block
                                    key={index}
                                    bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
                                    borderBottomWidth={theme === 'light' ? 1 : 0}
                                    borderBottomColor={theme === 'light' ? 'gray300' : 'transparent'}
                                >
                                    <Button
                                        onPress={() => navigation.navigate('BankQueue',{ place })}
                                        w="100%"
                                        bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}
                                        m={0}
                                        p={0}
                                        h={70}
                                    >
                                        <Div flexDir="column" w="100%">
                                            <Text
                                                fontWeight="bold"
                                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                                color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                                                mb={5}
                                                fontSize={14}
                                                
                                            >
                                              
                                                {getLimitedWords(i18n.language === 'ar' ? place.nameAr : place.nameEn, 8)}
                                            </Text>
                                            <Text 
                                                fontSize={10}
                                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                                color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light}>
                                                {i18n.language === 'ar' ? place.addressAr : place.addressEn}

                                            </Text>
                                        </Div>
                                    </Button>
                                </Dropdown.Option>
                            ))
                        ) : (
                            <Text color="gray900">{t('noResults')}</Text>
                        )}
                    </ScrollDiv>
                </Div>





            </Dropdown>






        </Div>
    )
}
