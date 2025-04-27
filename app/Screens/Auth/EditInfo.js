import { SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Div, Text } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import colors from '../../config/colors'
import CustomInput from '../../CustomComponents/CustomInput'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../../CustomComponents/CustomButton'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import CustomHeader from '../../CustomComponents/CustomHeader'
import { InfoContext } from '../../context/InfoContext'
import Toast from 'react-native-toast-message'
import CustomActivityIndicator from '../../CustomComponents/CustomActivityIndicator'
import axios from 'axios'

const EditInfo = () => {
  const { theme } = useTheme()
  const { auth, setAuth, login, register, logout } = useContext(AuthContext)
  const { t } = useTranslation()
  const { info } = useContext(InfoContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const update_user_info = async () => {
    try {

      setLoading(true);
      const response = await axios.post(`${info.appUrl}/api/v1/auth/edit/user/${auth.user.user.id}`, {
        name: name,
        email: email,
        password: password
      })
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: t('success'),
        })
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t('error'),
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
        <CustomHeader />

        <Div px={20} py={30} >
          <Text textAlign='center' fontWeight='bold' mb={30} color={theme === 'light' ? colors.lightTheme.black : colors.darkTheme.primary}>{t('update-your-information')}</Text>
          <CustomInput placeholder={t('name')} value={auth.user.user.name} onChangeText={(text) => setName(text)} />
          <CustomInput placeholder={t('email')} value={auth.user.user.email} onChangeText={(text) => setEmail(text)} />
          <CustomInput placeholder={t('phone')} value={auth.user.user.phone} onChangeText={(text) => setPhone(text)} />
          <CustomInput placeholder={t('address')} value={auth.user.user.address} onChangeText={(text) => setAddress(text)} />


          {loading ? <CustomActivityIndicator /> : <CustomButton w={'100%'} title={t('save')} onPress={update_user_info} />}


        </Div>

      </Div>
    </SafeAreaView>
  )
}

export default EditInfo