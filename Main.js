
import { ThemeProvider } from 'react-native-magnus'
import App from './App'

export default function Main() {
  return (
    <ThemeProvider>
        <App />
    </ThemeProvider>
  )
}