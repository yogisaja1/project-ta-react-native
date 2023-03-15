import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  //   ketika halaman tampil maka
  useEffect(() => {
    // jika waktu 2 detik maka
    setTimeout(() => {
      // pindah ke navigasi dengan nama SignIn
      navigation.replace('Home');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Streaming</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFC700',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    color: '#020202',
  },
});
