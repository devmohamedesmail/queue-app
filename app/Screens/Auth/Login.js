import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Div, Text } from 'react-native-magnus'
import CustomInput from '../../CustomComponents/CustomInput'
import colors from '../../config/colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '../../CustomComponents/CustomButton'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../context/AuthContext'
import CloseBtn from '../../Components/CloseBtn'
import { useNavigation } from '@react-navigation/native'
import CustomSocialLogin from '../../CustomComponents/CustomSocialLogin'
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator'
import Toast from 'react-native-toast-message'
import CustomHeader from '../../CustomComponents/CustomHeader'

const Login = () => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth, setAuth, login, register, logout } = useContext(AuthContext);
  const navigation = useNavigation();





  const handle_login = async (email, password) => {
    try {
      setLoading(true)
      await login(email, password)
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: 'Login successful',
        text2: 'Welcome back!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      navigation.navigate('Home')
      
    } catch (error) {
      console.log('Error during login:', error);
    }
  }







  return (
    <SafeAreaView>
  
      <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} px={5} h="100%" py={20}>
          <CustomHeader title={t('login')} />
      
        <Div mt={100} px={10}>
          <Text mb={20} fontWeight='bold' textAlign='center' fontSize={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}  >{t('Login')}</Text>

          <CustomInput
            onChange={text => setEmail(text)}
            value={email}
            icon={<SimpleLineIcons name="envelope" size={20} color="black" />}
            placeholder={t('email')}
          />
          <CustomInput
            onChange={text => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder={t('password')}
            icon={<AntDesign name="lock1" size={20} color="black" />} />








          {
            loading ? (<CustomActivityIndicator />) : (
              <CustomButton
                onPress={() => handle_login(email, password)}
                title={t('login')} bg={colors.lightTheme.primary} w="100%" />
            )
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
            <Text fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'} textAlign='center' color={theme === 'light' ? colors.lightTheme.primary : colors.darkTheme.primary} my={20}>{t('no-account')}</Text>
            <Button
              h={50}
              rounded={10}
              fontFamily={i18n.language === 'en' ? 'poppins-regular' : 'cairo'}
              fontWeight='bold'
              onPress={() => navigation.navigate('Register')}
              bg={theme === 'light' ? colors.lightTheme.secondary : colors.darkTheme.primary} w="100%" mt={10}>{t('register')}</Button>
          </Div>


        </Div>




      </Div>
    </SafeAreaView>
  )
}

export default Login
