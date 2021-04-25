import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../componets/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ConfirmationParams {
  title: string,
  description: string,
  buttonTitle: string,
  icon: 'smile' | 'hug',
  nextScreen: string,
}

const emojis = {
  smile: '☺️',
  hug: '🤗',
}

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const { 
    title,
    description,
    buttonTitle,
    icon,
    nextScreen,
   } = routes.params as ConfirmationParams;

  function handleStart() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.description}>
          {description}
        </Text>

        <View style={styles.footer}>
          <Button
            title={buttonTitle}
            onPress={handleStart}
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