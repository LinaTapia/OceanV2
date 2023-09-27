import { StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './src/navigation/TabNav';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

  const [fontsLoaded] = useFonts({
    Barlow: require("./assets/fonts/Barlow-Regular.ttf"),
    BarlowSemiBold: require("./assets/fonts/Barlow-SemiBold.ttf"),
    BarlowBold: require("./assets/fonts/Barlow-Bold.ttf")
  })

  if(!fontsLoaded) return

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNav/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  }
});
