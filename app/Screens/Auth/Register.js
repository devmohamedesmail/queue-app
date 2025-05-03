import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import CustomInput from '../../custom/CustomInput'
import colors from '../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../custom/CustomButton'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import CloseBtn from '../../components/CloseBtn'
import CustomSocialLogin from '../../custom/CustomSocialLogin'
import CustomActivityIndicator from '../../custom/CustomActivityIndicator'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'


const Register = () => {

    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { auth, setAuth, login, register, logout } = useContext(AuthContext);
    const navigation = useNavigation();


    const handle_register = async (name, email, password) => {
        if (name === '') {
            setNameError(t('name-required'))
            return;
        }
        if (email === '') {
            setEmailError(t('email-required'))
            return;
        }
        if (password === '') {
            setPasswordError(t('password-required'))
            return;
        }

        Toast.show({
            type: 'error',
            text1: t('error'),
            text2: t('try-again'),
            visibilityTime: 3000,
            position: 'top',
            autoHide: true,
        })



        try {
            setLoading(true)
            await register(name, email, password)
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: t('register-success'),
                text2: t('welcome-to-app'),
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
            })
            navigation.navigate('Home')
            setName('')
            setEmail('')
            setPassword('')
            setError('')

        } catch (error) {
            console.log('Error during registration:', error);
            setLoading(false)
            setError(error.message)
            Toast.show({
                type: 'error',
                text1: 'Registration failed',
                text2: error.message,
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
            })
        } finally {
            setLoading(false)
        }
    }



    return (
        <SafeAreaView>
            {/* <StatusBarComponent /> */}
            <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} px={10} py={20} h="100%" >

                <CloseBtn />


                <Div mt={60}>

                    <Text mb={20} textAlign='center' fontWeight='bold' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}  >{t('Register')}</Text>

                    <CustomInput
                        onChange={text => setName(text)}
                        value={name}
                        icon={<AntDesign name="user" size={24} color="black" />}
                        placeholder={t('name')}
                        error={nameError}
                    />

                    <CustomInput
                        onChange={text => setEmail(text)}
                        value={email}
                        icon={<SimpleLineIcons name="envelope" size={20} color="black" />}
                        placeholder={t('email')}
                        error={emailError}
                    />
                    
                    <CustomInput
                        onChange={text => setPassword(text)}
                        value={password}
                        secureTextEntry
                        placeholder={t('password')}
                        icon={<AntDesign name="lock1" size={20} color="black" />} 
                        error={passwordError}
                        
                        />



                    {loading ?
                        <CustomActivityIndicator />
                        :
                        <CustomButton
                            onPress={() => handle_register(name, email, password)}
                            title={t('register')} bg={colors.lightTheme.primary} w="100%" />

                    }




                    <Text textAlign='center' my={20}>{t('or')}</Text>

                    <CustomSocialLogin
                        bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.primary}
                        image={require('./images/google.png')}
                        title={t('login-with-google')}
                        onPress={() => navigation.navigate('Register')}
                    />

                    <CustomSocialLogin
                        bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.primary}
                        image={require('./images/apple1.png')}
                        title={t('login-with-apple')}

                        onPress={() => navigation.navigate('Register')}
                    />



                    <Div>

                        <Button
                            h={50}
                            rounded={10}
                            fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
                            fontWeight='bold'
                            onPress={() => navigation.navigate('Login')}
                            bg={theme === 'light' ? colors.lightTheme.secondary : colors.darkTheme.primary} w="100%" mt={10}>{t('login')}</Button>
                    </Div>

                </Div>


            </Div>
        </SafeAreaView>
    )
}

export default Register