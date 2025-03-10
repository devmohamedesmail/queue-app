import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/Components/AppNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './app/Translation/i18n';
import { ThemeProvider } from './app/context/ThemeContext';







export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
        <I18nextProvider i18n={i18n} >

          <AppNavigator />
        </I18nextProvider>
      </NavigationContainer>
    </ThemeProvider>

  );
}

