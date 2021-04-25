import React, { useEffect, useState } from 'react';
import { 
  Alert,
  FlatList,
  Image,
  StyleSheet, Text, View,
} from 'react-native';
import LottieView from 'lottie-react-native';

import { Header } from '../componets/Header';
import { Loading } from '../componets/Loading';
import { PlantCardSecundary } from '../componets/PlantCardSecundary';

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { loadPlant, removePlant } from '../services/storange';
import { Plant } from '../model/plant';

import empty from '../assets/empty.json';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import waterdrop from '../assets/waterdrop.png';

export function MyPlants() {
  const [list, setList] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await loadPlant();

      if (plantsStoraged.length > 0) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          {
            locale: ptBR
          }
        );

        setNextWaterd(
          `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}.`
        );
        setList(plantsStoraged);
      }
      setLoading(false);
    }

    loadStorageDate();
  }, []);

  function handleRemove(plant: Plant) {
    Alert.alert('Remover', `Deseja remote a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 🥺',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setList((oldData) => 
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch {
           Alert.alert('Ocorreu um erro ao tentar remover o item.');
          }
        }
      }
    ]);
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      {list.length === 0 && (
        <View style={styles.emptyContainer}>
          <LottieView 
            style={styles.empty}
            source={empty}
            autoPlay
            loop
          />
        </View>
      )}

      {list.length > 0 && (
        <>
          <View style={styles.spotlight}>
            <Image 
              style={styles.spotlightImage}
              source={waterdrop} 
            />
            <Text style={styles.spotlightText}>
              {nextWaterd}
            </Text>
          </View>
        
          <View style={styles.plants}>
            <Text style={styles.plantsTitle}>
              Próximas regadas
            </Text>
            
            <FlatList
              data={list}
              keyExtractor={(item => String(item.id))}
              renderItem={({ item }) => (
                <PlantCardSecundary 
                  data={item}
                  handleRemove={() => handleRemove(item)}
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.background,
  },
  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.blue_light,
  },
  spotlightImage: {
    height: 60,
    width: 60,
  },
  spotlightText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.blue,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 30,
    marginBottom: 15,
  },
  list: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    width: 100,
    height: 100,
  }
});
