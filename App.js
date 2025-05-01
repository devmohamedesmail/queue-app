import 'react-native-reanimated';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/components/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/Translation/i18n';
import { ThemeProvider } from './app/context/ThemeContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { InfoProvider } from './app/context/InfoContext';
import { AuthProvider } from './app/context/AuthContext';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';




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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <InfoProvider>
          <AuthProvider>
            <StatusBar  hidden  />
            <NavigationContainer>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor} >
                <I18nextProvider i18n={i18n} >
                  <AppNavigator />
                  <Toast />
                </I18nextProvider>
                </PersistGate>
                
              </Provider>
            </NavigationContainer>
          </AuthProvider>
        </InfoProvider>
      </ThemeProvider>
    </GestureHandlerRootView>

  );
}

