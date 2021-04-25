import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../componets/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState('');

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name) {
      Alert.alert('hey!', 'Me diz como posso chamar você? 😭');
      return;
    }

    await AsyncStorage.setItem('@plantmanager:user', name);

    navigation.navigate('Confirmation', {
      title: 'Prontinho',
      description: 'Agora vamos a começar a cuidar das suas plantinhas com muito carinho.',
      buttonTitle: 'Começar',
      icon: 'smile',
      nextScreen: 'PlantSelect',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😃'}
                </Text>
                <Text style={styles.description}>
                  Como podemos { '\n'}
                  chamar você?
                </Text>
              </View>

              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder='Digite um nome'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button 
                  title='Confirmar'
                  onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    width: '100%',
  },
  header: {
    alignItems: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54,
  },
  emoji: {
    fontSize: 44,
  },
  description: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  input: {
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    color: colors.heading,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    marginTop: 50,
    padding: 10,
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});