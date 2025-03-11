
import React,{useEffect, useState} from 'react'
import { Modal, Text, Div, Toggle, Icon } from 'react-native-magnus'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../config/colors'
import ModalCloseBtn from './ModalCloseBtn'

const SettingComponent = ({ settingModalVisible, setSettingModalVisible }) => {
    const { theme ,toggleTheme } = useTheme();
    const { t ,i18n} = useTranslation()
    
 
    
    const [on, toggle] = useState(false);
    return (
        <Modal isVisible={settingModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setSettingModalVisible(false)} />


            <Div h="100%" position='relative' pointerEvents="box-none">

                <Div mt={80}>
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontWeight='bold'
                        fontSize={20}
                        textAlign='center'
                        mb={20}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                        >{t('setting')}
                    </Text>

                    <Div px={10}>
                        <Div flexDir='row' justifyContent='space-between' alignItems='center'>
                            <Text 
                               fontWeight='bold' 
                               color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.white}
                               fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                               >
                                {theme === 'light' ? t('change_to_dark') : t('change_to_light')}
                            </Text>
                            <Toggle
                                on={theme === 'dark'}
                                onPress={toggleTheme}
                                bg="gray200"
                                circleBg={colors.lightTheme.primary}
                                activeBg={colors.lightTheme.primary}
                                h={30}
                                w={60}
                            />
                        </Div>
                    </Div>











                </Div>

            </Div>

        </Modal>
    )
}

export default SettingComponent