
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import BankQueue from '../screens/BankQueue/BankQueue';
import MyQueue from '../screens/MyQueue/MyQueue';
import HistotyLog from '../screens/HistoryLog/HistotyLog';
import Favourite from '../screens/Favourite/Favourite';
import Account from '../screens/Account/Account';
import Login from '../screens/Auth/Login';
import EditInfo from '../screens/Auth/EditInfo';
import Help from '../screens/Help/Help';
import Inbox from '../screens/Inbox/Inbox';
import Test from '../screens/Test';






export default function AppNavigator() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                animationDuration: 700
            }}
            
        >   
           
            <Stack.Screen name='Test' component={Test}  />
            <Stack.Screen name='Home' component={Home}  />
            <Stack.Screen name='BankQueue' component={BankQueue}  />
            <Stack.Screen name='MyQueue' component={MyQueue}  />
            <Stack.Screen name='History' component={HistotyLog}  />
            <Stack.Screen name='Favourite' component={Favourite}  />
            <Stack.Screen name='Account' component={Account}  />
            <Stack.Screen name='Login' component={Login}  />
            <Stack.Screen name='EditInfo' component={EditInfo}  />
            <Stack.Screen name='Help' component={Help}  />
            <Stack.Screen name='Inbox' component={Inbox}  />
            
        </Stack.Navigator>
    )
}
