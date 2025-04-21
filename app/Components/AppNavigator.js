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
import Register from '../Screens/Auth/Register';
import EditInfo from '../Screens/Auth/EditInfo';
import Help from '../Screens/Help/Help';
import Inbox from '../Screens/Inbox/Inbox';


export default function AppNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='Home'
      
        
        
        >
            <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
            <Stack.Screen name='BankQueue' component={BankQueue} options={{headerShown:false}} />
            <Stack.Screen name='MyQueue' component={MyQueue} options={{headerShown:false}} />
            <Stack.Screen name='History' component={HistotyLog} options={{headerShown:false}} />
            <Stack.Screen name='Favourite' component={Favourite} options={{headerShown:false}} />
            <Stack.Screen name='Account' component={Account} options={{headerShown:false}} />
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
            <Stack.Screen name='Register' component={Register} options={{headerShown:false}} />
            <Stack.Screen name='EditInfo' component={EditInfo} options={{headerShown:false}} />
            <Stack.Screen name='Help' component={Help} options={{headerShown:false}} />
            <Stack.Screen name='Inbox' component={Inbox} options={{headerShown:false}} />


        </Stack.Navigator>
    )
}
