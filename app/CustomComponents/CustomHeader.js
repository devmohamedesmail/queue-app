import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Header, Button, Icon, Text, Drawer } from 'react-native-magnus'
import DrawerComponent from '../Components/DrawerComponent';
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';


const CustomHeader = ({ title }) => {
    const navigation = useNavigation();
    const {theme}=useTheme();
    return (

        <Header
            pt={25}
            px={15}
            p="lg"
            bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}
            alignment="left"
            prefix={
                <Button bg="transparent" onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} fontFamily="Feather" fontSize="2xl"  />
                </Button>
            }
            // suffix={
            //     <Button bg="transparent">
            //         <Icon name="more-vertical" fontFamily="Feather" />
            //     </Button>
            //    <DrawerComponent />
            // }
        >
            {title}
        </Header>
    )
}

export default CustomHeader