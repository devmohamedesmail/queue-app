
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next';
import ModalCloseBtn from './ModalCloseBtn';
import { Modal, Div, Text } from 'react-native-magnus';
import colors from '../config/colors';
import { ScrollView } from 'react-native';
import HistoryItem from '../Screens/HistoryLog/HistoryItem';
import axios from 'axios';
import { InfoContext } from '../context/InfoContext';
import { AuthContext } from '../context/AuthContext';

const HistoryComponent = ({ historyModalVisible, setHistoryModalVisible }) => {
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [history, setHistory] = useState([]);
    const { info } = useContext(InfoContext);
    const { auth, setAuth, login, register, logout } = useContext(AuthContext)





    const fetch_user_history = async () => {
        try {
            const response = await axios.get(`${info.appUrl}/api/v1/queues/user/queues/history/${auth.user.user._id}`)
            setHistory(response.data)
        } catch (error) {
            console.log("Error in history log Screen", error)
        }
    }


    useEffect(() => {
        fetch_user_history()
    }, [])


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
                        mb={20}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    >{t('history')}
                    </Text>



                    <ScrollView>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <HistoryItem 
                                key={item._id} 
                                item={item}
                                />
                            ))
                        ) : (
                            <Text
                                color={theme === 'light' ? colors.lightTheme.gray : colors.darkTheme.primary}
                                fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                textAlign="center"
                                mt={20}
                            >
                                {t('noHistoryFound')}
                            </Text>
                        )}

                    </ScrollView>









                </Div>

            </Div>

        </Modal>
    )
}

export default HistoryComponent