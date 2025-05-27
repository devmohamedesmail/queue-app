import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Image } from 'react-native-magnus'
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
import CustomActivityIndicator from '../../custom/CustomActivityIndicator'
import Toast from 'react-native-toast-message'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { Easing } from 'react-native-reanimated'



const Login = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth, login, register, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('login');









  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t('invalid-email')).required(t('email-required')),
      password: Yup.string().required(t('password-required')),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const res = await login(values.email, values.password)

        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: t('login-success'),
            text2: t('welcome-to-app'),
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
          })
          navigation.navigate('Home')
          setEmail('')
          setPassword('')
        }


        setLoading(false)
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: t('login-error'),
          text2: err.message,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        })
      } finally {
        setLoading(false);
      }
    },
  });


  const registerFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('name-required')),
      email: Yup.string().email(t('invalid-email')).required(t('email-required')),
      password: Yup.string().min(6, t('min-6')).required(t('password-required')),

    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await register(values.name, values.email, values.password)
        if (res.status === 201) {
          Toast.show({
            type: 'success',
            text1: t('register-success'),
            text2: t('register-success-message'),
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40
          })
          navigation.navigate('Home');
          setName('')
          setEmail('')
          setPassword('')
        }

        setLoading(false)
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('register-error'),
          text2: error.message,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        })
      } finally {
        setLoading(false);
      }
    },
  });






  return (
    <SafeAreaView>

      <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} px={5} h="100%" py={5}>


        <CloseBtn />



        <Div mt={10} px={10}  py={10} >

          <Div>
            <Image
              h={200}
              w="60%"
              alignSelf='center'
              rounded="md"
              source={require("../../../assets/images/login.png")}
            />
          </Div>

          <Div rounded={10} mb={20} px={5} py={5} bg={theme === 'light' ? colors.lightTheme.light : colors.darkTheme.dark} flexDir='row' justifyContent='space-between' alignItems='center'>

            <CustomButton
              shadow={activeTab === 'login' ? 'lg': 'transparent'}
              title={t('login')}
              bg={activeTab === 'login' ? colors.lightTheme.primary : 'transparent'}
              w="48%"
              color={activeTab === 'login' ? colors.lightTheme.white : colors.lightTheme.white}
              onPress={() => setActiveTab('login')}
              
            />
            <CustomButton
              shadow={activeTab === 'register' ? 'lg': 'transparent'}
              title={t('register')}
              bg={activeTab === 'register' ? colors.lightTheme.primary : 'transparent'}
              w="48%"
              color={activeTab === 'register' ? colors.lightTheme.white : colors.lightTheme.white}
              onPress={() => setActiveTab('register')}
              
            />

          </Div>





          {activeTab === 'login' ? (
            <Div key="login">

              <CustomInput
                onChange={loginFormik.handleChange('email')}
                value={loginFormik.values.email}
                icon={<SimpleLineIcons name="envelope" size={17} color="black" />}
                placeholder={t('email')}
                error={loginFormik.touched.email && loginFormik.errors.email}
              />

              <CustomInput
                onChange={loginFormik.handleChange('password')}
                value={loginFormik.values.password}
                secureTextEntry
                placeholder={t('password')}
                icon={<AntDesign name="lock1" size={17} color="black" />}
                error={loginFormik.touched.password && loginFormik.errors.password}
              />


              {
                loading ? (<CustomActivityIndicator />) : (
                  <CustomButton

                    onPress={loginFormik.handleSubmit}
                    title={t('login')} w="100%" />
                )
              }



            </Div>


          ) : (
            <Div key="register">
              <CustomInput
                onChange={registerFormik.handleChange('name')}
                value={registerFormik.values.name}
                icon={<AntDesign name="user" size={17} color="black" />}
                placeholder={t('name')}
                error={registerFormik.touched.name && registerFormik.errors.name}
              />

              <CustomInput
                onChange={registerFormik.handleChange('email')}
                value={registerFormik.values.email}
                icon={<SimpleLineIcons name="envelope" size={17} color="black" />}
                placeholder={t('email')}
                error={registerFormik.touched.email && registerFormik.errors.email}
              />

              <CustomInput
                onChange={registerFormik.handleChange('password')}
                value={registerFormik.values.password}
                secureTextEntry
                placeholder={t('password')}
                icon={<AntDesign name="lock1" size={17} color="black" />}
                error={registerFormik.touched.password && registerFormik.errors.password}

              />



              {loading ?
                <CustomActivityIndicator />
                :
                <CustomButton
                  onPress={registerFormik.handleSubmit}
                  title={t('register')} w="100%" />

              }


            </Div>)}
















        </Div>




      </Div>
    </SafeAreaView>
  )
}

export default Login
