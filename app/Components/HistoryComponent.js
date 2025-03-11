
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next';
import ModalCloseBtn from './ModalCloseBtn';
import { Modal,Div,Text } from 'react-native-magnus';
import colors from '../config/colors';
import { ScrollView } from 'react-native';
import HistoryItem from '../Screens/HistoryLog/HistoryItem';

const HistoryComponent = ({historyModalVisible, setHistoryModalVisible}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    return (
        <Modal isVisible={historyModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setHistoryModalVisible(false)} />


            <Div h="100%" position='relative'>

                <Div mt={80}>
                    <Text
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        fontWeight='bold'
                        fontSize={20}
                        textAlign='center'
                        mb={20}>{t('history')}
                    </Text>



                    <ScrollView>
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem />
                    </ScrollView>









                </Div>

            </Div>

        </Modal>
    )
}

export default HistoryComponent