import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Help from '../screens/Help/Help';
import CustomDrawerContent from '../custom/CustomDrawerContent';
import Home from '../screens/Home/Home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false,drawerPosition: 'right' , drawerType: 'slide',drawerStyle: {
        backgroundColor: '#fff',
        width: '90%',
      }, 
    
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    }}
    >
      
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Help" component={Help} />
     
    
    </Drawer.Navigator>
  );
}
