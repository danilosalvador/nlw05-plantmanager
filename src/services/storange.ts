import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import { format } from "date-fns";

import { Plant, PlantData } from "../model/plant";

export async function loadPlant(): Promise<Plant[]> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as PlantData) : {};

  const plantsSorted = Object
    .keys(plants)
    .map(key => {
      return {
        ...plants[key].data,
        hour: format(new Date(plants[key].data.dateTimeNotification), 'HH:mm'),
      }
    })
    .sort((a, b) =>
      Math.floor(
        (new Date(a.dateTimeNotification).getTime() / 1000) - Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
      )
    );

  return plantsSorted;
}

export async function savePlant(plant: Plant) : Promise<void> {
  const nextTime = new Date(plant.dateTimeNotification);
  const now = new Date();

  const { times, repeat_every } = plant.frequency;

  if (repeat_every === 'week') {
    const interval = Math.trunc(7 / times);
    nextTime.setDate(now.getDate() + interval);
  } else {
    nextTime.setDate(nextTime.getDate() + 1);
  }

  const seconds = Math.abs(
    Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
  );

  console.log('seconds', seconds);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'hey, 🌱',
      body: `Está na hora de cuidar da sua ${plant.name}`,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: {
        plant
      },
    },
    trigger: {
      seconds: seconds < 60 ? 60 : seconds,
      repeats: true,
    }
  });

  console.log('notificationId', notificationId);

  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const oldPlants = data ? (JSON.parse(data) as PlantData) : {};

  const newPlant = {
    [plant.id]: {
      data: plant,
      notificationId,
    }
  }

  await AsyncStorage.setItem('@plantmanager:plants',
    JSON.stringify({
      ...newPlant,
      ...oldPlants,
    })
  );
}

export async function removePlant(id: number): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as PlantData) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
  delete plants[id];

  await AsyncStorage.setItem(
    '@plantmanager:plants',
    JSON.stringify(plants)
  );
}
