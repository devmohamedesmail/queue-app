import React, { useContext, useEffect, useState } from 'react'
import { Div, Text, Button } from 'react-native-magnus'
import colors from '../../config/colors'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CloseBtn from '../../Components/CloseBtn'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import PlaceDetails from './parts/PlaceDetails'
import { InfoContext } from '../../context/InfoContext'
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import QueueDetails from './parts/QueueDetails'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// functions
import { fetch_place_services, get_all_waiting_queues } from '../../utils/bankQueuesFunctions'
import { AuthContext } from '../../context/AuthContext'
import CustomInput from '../../CustomComponents/CustomInput'
import CustomButton from '../../CustomComponents/CustomButton'
import Toast from 'react-native-toast-message'
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator'



export default function BankQueue({ route }) {
    const navigation = useNavigation()
    const { theme } = useTheme()
    const { t, i18n } = useTranslation();
    const { place } = route.params;
    const [placeServices, setPlaceServices] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const { info } = useContext(InfoContext)

    const [serviceId, setServiceId] = useState(null)
    const [servicesModalVisible, setServicesModalVisible] = useState(false)
    const [loadingFetchData, setLoadingFetchData] = useState(false)
    const [waitingQueues, setWaitingQueues] = useState(null);
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const [LoginModalVisible, setLoginModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const toggleServicesModal = () => {
        setServicesModalVisible(!servicesModalVisible);
    };

    // ********************************* Fetch Place Services Start **********************************
    useEffect(() => {
        fetch_place_services(place._id, info.appUrl, setPlaceServices, setLoadingFetchData, setServicesModalVisible)
    }, [])


    // ******************************** Get All Waiting Queues Start ********************************
    useEffect(() => {
        get_all_waiting_queues(info.appUrl, place._id, serviceId, setWaitingQueues)
    }, [serviceId, place._id, loadingFetchData])

    // ******************************** Get All Waiting Queues End ********************************


    // *********************************  book_new_queue Start *******************************************
    const book_new_queue = async () => {
        try {


            if (auth === null) {
                setLoginModalVisible(true)
                return
            }
            setLoading(true)
           
            let url = `${info.appUrl}/api/v1/queues/book/new/queue/${auth.user.user._id}/${place._id}`;
            if (serviceId) {
                url += `/${serviceId}`;
            }
            const response = await axios.post(url);
            setLoading(false);
            const queue = response.data
            navigation.navigate("MyQueue", { queue: queue, place: place })
        } catch (error) {
            console.log("Error During Book New Queue", error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    // ********************************* Get Device ID Start *******************************************


    const handle_login = async (email, password) => {
        try {

            setLoadingLogin(true)
            await login(email, password)
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Login Success',
                text2: 'You are logged in successfully',
                visibilityTime: 3000,
                position: 'top',
                autoHide: true,

            })
        } catch (error) {

            setLoadingLogin(false)
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Please check your email and password',
                visibilityTime: 3000,
                position: 'top',
                autoHide: true,
            })
            console.log('Error during login:', error);
        } finally {

            setLoadingLogin(false)
        }
    }




    return (
        <SafeAreaView>

            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
                <CloseBtn />

                {/* Bank name And Address Start */}
                <PlaceDetails place={place} />
                {/* Bank name And Address Start */}

                {placeServices !== null && placeServices.length > 0 ? (
                    <>
                        <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                    </>) : (
                    <>
                        <QueueDetails waitingQueues={waitingQueues} loading={loading} book_new_queue={book_new_queue} />
                    </>)}

            </Div>





            {/* Modal Services  */}
            <Modal isVisible={servicesModalVisible}>
                <Div bg='white' rounded={20} p={10} position='relative' >
                    {placeServices !== null && placeServices.length > 0 ? (
                        <Div px={10} py={10} mt={70}>
                            <Text textAlign='center' fontWeight='bold' fontSize={20} mb={20}>{t('select-your-service')}</Text>
                            {placeServices.map((service) => (
                                <Button
                                    w="100%"
                                    h={70}
                                    onPress={() => {
                                        setServiceId(service._id)
                                        get_all_waiting_queues()
                                        setServicesModalVisible(false)

                                    }}
                                    key={service._id}
                                    rounded={10}
                                    my={5}
                                    bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}>


                                    <Text
                                        fontWeight='bold'
                                        fontSize={15}
                                        fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                                        color={theme === 'light' ? colors.lightTheme.white : colors.darkTheme.white} textAlign='center'>
                                        {i18n.language === "ar" ? service.nameAr : service.nameEn}
                                    </Text>
                                </Button>
                            ))}
                        </Div>
                    ) : (<Text>no</Text>)}


                    <Button
                        onPress={toggleServicesModal} bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                        h={40}
                        w={40}
                        mt={20}
                        rounded={10}
                        position='absolute'
                        right={10}
                        top={10}
                        p={0}

                    >
                        <AntDesign name="close" size={20} color="white" />
                    </Button>
                </Div>
            </Modal>



            {/* Login Modal  */}
            <Modal isVisible={LoginModalVisible}>
                <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.dark} rounded={20} p={10} py={30} position='relative' >

                    <Div flexDir='row' justifyContent='flex-end' alignItems='center'  >
                        <Button bg='transparent' onPress={() => setLoginModalVisible(false)}  >
                            <AntDesign name="close" size={24} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.light} />
                        </Button>
                    </Div>

                    <Text
                        color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}
                        textAlign='center' fontWeight='bold' fontSize={15} mb={20} fontFamily='poppins-regular'>Login First To Can Book Queue</Text>

                    <CustomInput
                        onChange={text => setEmail(text)}
                        value={email}
                        icon={<SimpleLineIcons name="envelope" size={20} color="black" />}
                        placeholder="Email"
                    />
                    <CustomInput
                        onChange={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                        icon={<AntDesign name="lock1" size={20} color="black" />} placeholder="password" />






                    {loadingLogin ? (<CustomActivityIndicator />) :
                        <CustomButton
                            bg={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary}
                            onPress={() => handle_login(email, password)}
                            title="Login" w="100%"
                        />}



                    <Div mt={20} flexDir='row' justifyContent='center' alignItems='center'>
                        <Text
                            color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white}
                            textAlign='center'
                            fontWeight='bold'
                            fontSize={15}
                            mb={20}
                            fontFamily='poppins-regular'>
                            Don't have an account?


                        </Text>
                        <Button p={0} mx={5} bg='transparent' onPress={() => navigation.navigate('Register')} >
                            <Text color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.white} fontWeight='bold'>Register</Text>
                        </Button>
                    </Div>



                </Div>
            </Modal>

        </SafeAreaView>

    )
}





