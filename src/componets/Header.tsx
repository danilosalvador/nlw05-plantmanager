import React, { useEffect, useState } from 'react';
import { 
  Image,
  StyleSheet, 
  Text, 
  View,
  Platform,
} from 'react-native';
import AsyncStorange from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LottieView from 'lottie-react-native';

import avatar from '../assets/avatar.json';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUserName() {
      const name = await AsyncStorange.getItem('@plantmanager:user');
      setUserName(name ?? '');
    }

    loadUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <LottieView 
        style={styles.avatar} 
        source={avatar}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ?  getStatusBarHeight() : 0,
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 40,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  avatar: {
    width: 70,
    height: 70,
  },
});
