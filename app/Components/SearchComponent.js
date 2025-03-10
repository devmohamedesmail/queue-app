import React, { useState } from 'react'
import { Dropdown, Button, Text, Div, Input, Icon, ScrollDiv } from "react-native-magnus";
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../config/colors';
import places from '../config/places';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CustomIconBtn from '../CustomComponents/CustomIconBtn';




const dropdownRef = React.createRef();

export default function SearchComponent() {
    const navigation =useNavigation()
    const {theme,toggleTheme}=useTheme()
    return (
        <Div>
           
            <CustomIconBtn 
               icon={<AntDesign name="search1" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.lightTheme.white} />}
               onPress={() => dropdownRef.current.open()}
               />




            <Dropdown
                ref={dropdownRef}

                mt="md"
                pb="2xl"
                h="90%"
                showSwipeIndicator={true}
                roundedTop="xl">
                <Dropdown.Option py="md" px="xl" block>
                    <Input
                        placeholder="Search"
                        p={10}
                        h={60}
                        w="100%"
                        focusBorderColor={colors.primary}
                        suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
                    />
                </Dropdown.Option>

                <ScrollDiv>
                    {places.map((place, index) => (
                        <Dropdown.Option py={3} px="xl" block key={index}>
                            <Button
                            onPress={()=>navigation.navigate("BankQueue")}
                            w="100%" bg='transparent' m={0} p={0} borderBottomWidth={1} borderBottomColor='gray300' h={70}>
                                <Div flexDir='column' w="100%">
                                    <Text fontWeight='bold'>{place.title}</Text>
                                    <Text>{place.address}</Text>
                                </Div>
                            </Button>
                        </Dropdown.Option>
                    ))}
                </ScrollDiv>





            </Dropdown>






        </Div>
    )
}
