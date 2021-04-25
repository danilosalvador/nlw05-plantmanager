import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const oldPlants = data ? (JSON.parse(data) as PlantData) : {};

  const newPlant = {
    [plant.id]: {
      data: plant,
    }
  }

  await AsyncStorage.setItem('@plantmanager:plants',
    JSON.stringify({
      ...newPlant,
      ...oldPlants,
    })
  );
}
