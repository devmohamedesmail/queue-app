import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import BankQueue from '../Screens/BankQueue/BankQueue';
import MyQueue from '../Screens/MyQueue/MyQueue';
import HistotyLog from '../Screens/HistoryLog/HistotyLog';
import Favourite from '../Screens/Favourite/Favourite';
import Account from '../Screens/Account/Account';
import Login from '../Screens/Auth/Login';


export default function AppNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Home'
        screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Smooth slide animation
          }}
        
        
        >
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='BankQueue' component={BankQueue} options={{headerShown:false}} />
            <Stack.Screen name='MyQueue' component={MyQueue} options={{headerShown:false}} />
            <Stack.Screen name='History' component={HistotyLog} options={{headerShown:false}} />
            <Stack.Screen name='Favourite' component={Favourite} options={{headerShown:false}} />
            <Stack.Screen name='Account' component={Account} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />

        </Stack.Navigator>
    )
}
