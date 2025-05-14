import React , {useCallback}from 'react'
import { Modal, Text, Div, Button } from 'react-native-magnus';
import { useTranslation } from 'react-i18next';
import colors from '../../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Feather from '@expo/vector-icons/Feather';
import FavouriteItem from '../../screens/Favourite/FavouriteItem';
import { remove_From_wishlist } from '../../redux/reducers/wishlistSlice';
import { useTheme } from '../../context/ThemeContext';
import ModalCloseBtn from '../ModalCloseBtn';
import { View } from 'react-native';
import Custom_favourite_item from '../../custom/Custom_favourite_item';
import Custom_delete_swipe_btn from '../../custom/Custom_delete_swipe_btn';
const FavouriteComponent = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    const { t, i18n } = useTranslation();
    const { theme } = useTheme();
    const favourites = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    const handle_delete = (id) => {
        dispatch(remove_From_wishlist({ id }))
    }



    return (
        <Modal
            isVisible={favouriteModalVisible}
            bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background}>

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
                        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
                        renderItem={({  item, index, rowMap }) => (
                            <Custom_favourite_item 
                            item={item} rowMap={rowMap}  
                            index={index} />
                        )}

                        renderHiddenItem={({ item }, rowMap) => (
                            <Div h={100} my={10} mx={10} flexDir="row" justifyContent="space-between">
                                {/* Left button */}
                                <Div w={50}  justifyContent="center" alignItems="center">
                                <Custom_delete_swipe_btn  onPress={() => {
                                        rowMap[item.id]?.closeRow();
                                        handle_delete(item.id);
                                    }} />
                                </Div>

                                {/* Spacer */}
                                <Div flex={1} />

                                {/* Right button */}
                                <Div w={50} justifyContent="center" alignItems="center">
                                    <Custom_delete_swipe_btn  onPress={() => {
                                        rowMap[item.id]?.closeRow();
                                        handle_delete(item.id);
                                    }} />
                                </Div>
                            </Div>
                        )}

                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />



                </Div>
            </Div>
        </Modal>
    )
}

export default FavouriteComponent