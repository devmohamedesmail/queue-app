import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import BankQueue from '../screens/BankQueue/BankQueue';
import MyQueue from '../screens/MyQueue/MyQueue';
import HistotyLog from '../screens/HistoryLog/HistotyLog';
import Favourite from '../screens/Favourite/Favourite';
import Account from '../screens/Account/Account';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import EditInfo from '../screens/Auth/EditInfo';
import Help from '../screens/Help/Help';
import Inbox from '../screens/Inbox/Inbox';


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
