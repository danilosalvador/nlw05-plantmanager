import React, { useEffect, useState } from 'react';
import { 
  FlatList,
  Image,
  StyleSheet, Text, View,
} from 'react-native';

import { Header } from '../componets/Header';

import colors from '../styles/colors';

import waterdrop from '../assets/waterdrop.png';
import { Plant } from '../model/plant';
import { loadPlant } from '../services/storange';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../componets/PlantCardSecundary';

export function MyPlants() {
  const [list, setList] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await loadPlant();

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
      setLoading(false);
    }

    loadStorageDate();
  }, []);



  return (
    <View style={styles.container}>
      <Header />

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
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
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
});
