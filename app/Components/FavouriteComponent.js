import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React from 'react'
import { Modal, Button, Div } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAccountButton from '../CustomComponents/CustomAccountButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../config/colors';
import FavouriteItem from '../Screens/Favourite/FavouriteItem';
import { FlatList } from 'react-native';
import places from '../config/places';

const FavouriteComponent = ({ favouriteModalVisible, setFavouriteModalVisible }) => {
    return (
        <Modal isVisible={favouriteModalVisible}>
            <Button
                bg="gray400"
                h={35}
                w={35}
                flexDir='row'
                justifyContent='center'
                alignItems='center'
                position="absolute"
                top={30}
                right={15}
                p={0}
                rounded="circle"
                onPress={() => {
                    setFavouriteModalVisible(false);
                }}
            >
                <AntDesign name="close" size={20} color="black" />
            </Button>


            <Div h="100%" position='relative'>
                <Div mt={100}>
                    <FlatList
                        data={places}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <FavouriteItem item={item} />}
                    />
                </Div>




            </Div>






        </Modal>
    )
}

export default FavouriteComponent