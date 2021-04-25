import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

import Routes from './src/routes';
import colors from './src/styles/colors';
import { Plant } from './src/model/plant';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as Plant;
        console.log(data);
      }
    );

    return () => subscription.remove();

    // async function notificationCheck() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();

    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('getAllScheduledNotificationsAsync:', data);
    // }

    // notificationCheck();
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
      <Routes /> 
    </>
  );
}
