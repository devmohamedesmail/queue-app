import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/Components/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/Translation/i18n';
import { ThemeProvider } from './app/context/ThemeContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { InfoProvider } from './app/context/InfoContext';
import { AuthProvider } from './app/context/AuthContext';
import Toast from 'react-native-toast-message';




SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'cairo': require('./assets/fonts/Cairo/static/Cairo-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }



  return (
    <ThemeProvider>
      <InfoProvider>
       <AuthProvider>
        
          <NavigationContainer>
            <I18nextProvider i18n={i18n} >
              <AppNavigator />
              <Toast />
            </I18nextProvider>
          </NavigationContainer>

        </AuthProvider>
      </InfoProvider>
    </ThemeProvider>

  );
}

