import { Modal, Div, Text } from 'react-native-magnus'
import React from 'react'

import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import colors from '../../config/colors'
import MyQueues from '../../screens/MyQueue/parts/MyQueues'
import ModalCloseBtn from '../ModalCloseBtn'
import CustomText from '../../custom/CustomText'

const MyQueueComponent = ({ queueModalVisible, setQueueModalVisible }) => {
    const { theme } = useTheme();
    const { t,i18n } = useTranslation();
    return (
        <Modal isVisible={queueModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>
            <ModalCloseBtn onPress={() => setQueueModalVisible(false)} />
            <Div h="100%" position='relative' pointerEvents="box-none">
                <Div mt={80}>
                  <CustomText textAlign='center' fontWeight='bold' fontSize={20} content={t('my-queues')} />
                    <Div h="90%">
                        <MyQueues />
                    </Div>
                </Div>
            </Div>
        </Modal>
    )
}






export default MyQueueComponent