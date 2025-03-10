import { StatusBar } from 'react-native'
import React from 'react'
import colors from '../config/colors'

const StatusBarComponent = () => {
  return (
    <StatusBar
    animated={true}
    backgroundColor={colors.primary}
   
  
  />
  )
}

export default StatusBarComponent