import React from 'react'
import { Modal, Text, Div } from 'react-native-magnus';
import colors from '../config/colors';
import FavouriteItem from '../screens/Favourite/FavouriteItem';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import ModalCloseBtn from './ModalCloseBtn';
import { useSelector } from 'react-redux';

const FavouriteComponent = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    const { t,i18n } = useTranslation();
    const { theme } = useTheme();
    const favourites = useSelector(state => state.wishlist.items);





    return (
        <Modal isVisible={favouriteModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>
            
            <ModalCloseBtn onPress={() => setFavouriteModalVisible(false)} />
            <Div h="100%" position='relative'>
                
                <Div mt={80}>
                    <Text 
                      fontSize={20} 
                      color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary} 
                      textAlign='center' 
                      fontWeight='bold' 
                      mb={20} 
                      fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                      >
                        {t('favourite')}</Text>
                    <FlatList
                        data={favourites}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <FavouriteItem item={item} />}
                    />
                </Div>
            </Div>
        </Modal>
    )
}

export default FavouriteComponent