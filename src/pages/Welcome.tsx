import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import watering from '../assets/watering.png'

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image 
          source={watering} 
          style={styles.image} 
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.3}
          onPress={handleStart}>
          <Feather 
            name="chevron-right" 
            style={styles.buttonIcon} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  description: {
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: 'center',
    color: colors.heading,
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: colors.green,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 28,
  },
});
