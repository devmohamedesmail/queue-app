import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import React from 'react'
import { Modal, Button, Div, Text } from 'react-native-magnus';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAccountButton from '../CustomComponents/CustomAccountButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../config/colors';

const AccountComponent = ({ accountModalVisible, setAccountModalVisible }) => {
    return (
        <Modal isVisible={accountModalVisible}>
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
                    setAccountModalVisible(false);
                }}
            >
                <AntDesign name="close" size={20} color="black" />
            </Button>


           <Div h="100%"  position='relative'>
            
           <Div mt={100}>
               <Text fontWeight='bold' fontSize={20} textAlign='center' mb={20}>My Account</Text>
                <CustomAccountButton icon={<FontAwesome name="edit" size={24} color="black" />} title="update your information" />
                <CustomAccountButton icon={<MaterialIcons name="history" size={24} color="black" />} title="Histroy Log" />
                <CustomAccountButton icon={<AntDesign name="hearto" size={24} color="black" />} title="My Favourite" />
                <CustomAccountButton icon={<Feather name="help-circle" size={24} color="black" />} title="Need Help" />
            </Div>



            <Div px={10} bottom={20} position='absolute' right={0} left={0}>


                <Button
                    mt="lg"
                    px="xl"
                    py="lg"
                    bg="white"
                    w="100%"
                    h={60}
                    borderWidth={1}
                    borderColor={colors.primary}
                    color={colors.primary}
                    underlayColor="red100"
                    fontWeight='bold'
                >
                    Logout
                </Button>


                <Button
                    mt="lg"
                    px="xl"
                    py="lg"
                    bg="red600"
                    w="100%"
                    h={60}
                    color="white"
                    underlayColor="red100"
                    fontWeight='bold'
                >
                    Delete Account
                </Button>




            </Div>
           </Div>






        </Modal>
    )
}

export default AccountComponent