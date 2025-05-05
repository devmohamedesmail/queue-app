import React from 'react'
import { Modal, Text, Div, Button } from 'react-native-magnus';
import colors from '../config/colors';
import FavouriteItem from '../screens/Favourite/FavouriteItem';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import ModalCloseBtn from './ModalCloseBtn';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { remove_From_wishlist } from '../redux/reducers/wishlistSlice';
import Feather from '@expo/vector-icons/Feather';
const FavouriteComponent = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const favourites = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

const handle_delete = (id) => {
    dispatch(remove_From_wishlist({ id }))
}


    return (
        <Modal isVisible={favouriteModalVisible} bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

            <ModalCloseBtn onPress={() => setFavouriteModalVisible(false)} />
            <Div h="100%" position='relative' pb={100}>

                <Div mt={80} >
                    <Text
                        fontSize={20}
                        color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}
                        textAlign='center'
                        fontWeight='bold'
                        mb={20}
                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                    >
                        {t('favourite')}</Text>

                    <SwipeListView
                        data={favourites}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <FavouriteItem item={item} />}
                        renderHiddenItem={({ item }) => (
                            <Div
                            my={10}
                                flex={1}
                                justifyContent="flex-end"
                                alignItems="flex-end"
                                
                                flexDir='row'
                                bg="blue500"
                            >
                                
                                <Button bg="red600" onPress={()=>handle_delete(item.id)}>
                                    <Feather name="trash" size={24} color="black" />
                                </Button>

                                

                            </Div>
                        )}
                        rightOpenValue={-75}
                    />
                </Div>
            </Div>
        </Modal>
    )
}

export default FavouriteComponent