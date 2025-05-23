import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import AuthCard from '../../components/auth/AuthCard';
import logo from '../../assets/images/happyplantlife.png';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = (session) => {
    if (session) {
      navigation.navigate('Dashboard'); 
    }
  };

    let [fontsLoaded] = useFonts({
      Pacifico_400Regular,
    });

    if (!fontsLoaded) return null;

  return (

    <View style={styles.container}>
      {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}

      <Text style={[styles.header, { fontFamily: 'Pacifico_400Regular' }]}>
         Happy Plant Life 
      </Text>
      <AuthCard onLogin={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 250,
    height: 100,
    marginBottom: 32,
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#173e25',
    marginBottom: 32,
    textAlign: 'center',
  },

});

export default HomeScreen;
