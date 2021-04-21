import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { Button } from '../componets/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          ☺️
        </Text>

        <Text style={styles.title}>
          Prontinho!
        </Text>

        <Text style={styles.description}>
          Agora vamos começar a cuidar das suas platinhas com muito carinho.
        </Text>

        <View style={styles.footer}>
          <Button
            title='Começar'
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    width: '100%',
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  description: {
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    color: colors.heading,
    paddingVertical: 10,
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50,
  }
});