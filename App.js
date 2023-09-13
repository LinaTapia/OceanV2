import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './src/screens/Home';
import { colors } from './src/theme/colors';
import Products from './src/screens/Products';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    Barlow: require("./assets/fonts/Barlow-Regular.ttf"),
    BarlowSemiBold: require("./assets/fonts/Barlow-SemiBold.ttf"),
    BarlowBold: require("./assets/fonts/Barlow-Bold.ttf")
  })

  if(!fontsLoaded) return

  return (
    <SafeAreaView style={styles.container}>
      <Home/> 
      <Products category="resin plugs"/> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  }
});
