import { StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {

  const [fontsLoaded] = useFonts({
    Barlow: require("./assets/fonts/Barlow-Regular.ttf"),
    BarlowSemiBold: require("./assets/fonts/Barlow-SemiBold.ttf"),
    BarlowBold: require("./assets/fonts/Barlow-Bold.ttf")
  })

  if(!fontsLoaded) return

  return (
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  }
});
