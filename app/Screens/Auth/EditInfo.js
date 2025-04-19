import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { Div } from 'react-native-magnus'
import { useTheme } from '../../context/ThemeContext'
import colors from '../../config/colors'
import CustomInput from '../../CustomComponents/CustomInput'
import CloseBtn from '../../Components/CloseBtn'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../../CustomComponents/CustomButton'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

const EditInfo = () => {
    const {theme}=useTheme()
    const { auth, setAuth, login, register, logout } =useContext(AuthContext)
    const {t}=useTranslation()
  return (
   <SafeAreaView>
     <Div bg={theme === 'light' ? colors.lightTheme.background : colors.darkTheme.background} h="100%">
       
       <CloseBtn />
       <Div px={20}>
          <CustomInput value={auth.user.user.name} />
          <CustomInput value={auth.user.user.email} />

          <CustomButton bg='red600' title={t('save')} />
       </Div>
       
     </Div>
   </SafeAreaView>
  )
}

export default EditInfo