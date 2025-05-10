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
import { useNavigation } from '@react-navigation/native'
import CustomSocialLogin from '../../custom/CustomSocialLogin'
import CustomActivityIndicator from '../../custom/CustomActivityIndicator'
import Toast from 'react-native-toast-message'
import CustomHeader from '../../custom/CustomHeader'
import CustomText from '../../custom/CustomText'

const Login = () => {
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
  const [activeTab, setActiveTab] = useState('login');




  const handle_login = async (email, password) => {

    // Validate email and password
    if (email === '') {
      setEmailError(t('email-required'))
      return;
    }

    if (password === '') {
      setPasswordError(t('password-required'))
      return;
    }

    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: t('error'),
        text2: t('try-again'),
        visibilityTime: 3000,
        position: 'top',
        autoHide: true,
      })
      return;
    }


    try {

      setLoading(true)
      await login(email, password)
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: t('login-success'),
        text2: t('welcome-to-app'),
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      navigation.navigate('Home')

    } catch (error) {
      console.log('Error during login:', error);
    }
  }


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





    try {
      setLoading(true)
      await register(name, email, password).then((res) => {
        if (res.success) {
          Toast.show({
            type: 'success',
            text1: t('register-success'),
            text2: t('register-success-message'),
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          })
          navigation.navigate('Login');
        }
      })



      setLoading(false)
      Toast.show({
        type: 'success',
        text1: t('register-success'),
        text2: t('welcome-to-app'),
        position: 'top',
        visibilityTime: 1000,
        autoHide: true,
      })
      navigation.navigate('Home')
      setName('')
      setEmail('')
      setPassword('')


    } catch (error) {
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

      <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} px={5} h="100%" py={20}>


        <CloseBtn />

        <Div mt={100} px={10}>



          <Div rounded={10} mb={20} px={5} py={10} bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} flexDir='row' justifyContent='space-between' alignItems='center'>

            <CustomButton
              title={t('login')}
              bg={activeTab === 'login' ? colors.lightTheme.primary : 'transparent'}
              w="48%"
              onPress={() => setActiveTab('login')}
            />
            <CustomButton
              title={t('register')}
              bg={activeTab === 'register' ? colors.lightTheme.primary : 'transparent'}
              w="48%"
              onPress={() => setActiveTab('register')}
            />

          </Div>


          {activeTab === 'login' ? (
            <Div>
              <CustomText content={t('login')} fontWeight='bold' textAlign='center' fontSize={20} mb={10} />
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








              {
                loading ? (<CustomActivityIndicator />) : (
                  <CustomButton
                    onPress={() => handle_login(email, password)}
                    title={t('login')}  w="100%" />
                )
              }
            </Div>


          ) : (<Div>



             <CustomText content={t('login')} fontWeight='bold' textAlign='center' fontSize={20} mb={10} />

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
                title={t('register')} w="100%" />

            }



          </Div>)}



















        </Div>




      </Div>
    </SafeAreaView>
  )
}

export default Login
