import React, { useState } from 'react';
import { Div, Button, Modal} from "react-native-magnus";
import { useTheme } from '../context/ThemeContext';
import colors from '../config/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Custom_modal(
    {
        onPressClose,
        isVisible,
        onClose,
        children,
        animationIn = "lightSpeedIn",
        animationOut = "lightSpeedOut",
        height = 350,
        ...props
    }
) {

    const { theme } = useTheme()
    const [visible, setVisible] = useState(false);
    return (

        <Modal isVisible={isVisible} zIndex={1000} onBackdropPress={onClose} h={350} bg={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.dark}>
            <Button
                bg="gray400"
                h={35}
                w={35}
                p={0}
                position="absolute"
                top={20}
                right={15}
                rounded="circle"
                onPress={onPressClose}
            >
                <AntDesign name="close" size={20} color="black" />
            </Button>

            <Div mt={50}>
                {children}
            </Div>

        </Modal>
    )
}