import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { EnviromentButton } from '../componets/EnviromentButton';
import { Header } from '../componets/Header';
import { Loading } from '../componets/Loading';
import { PlantCardPrimary } from '../componets/PlantCardPrimary';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentDTO {
  key: string;
  title: string;
}

interface PlantDTO {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentDTO[]>([]);
  const [plants, setPlants] = useState<PlantDTO[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantDTO[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [isEnviromentLoading, setIsEnviromentLoading] = useState(true);
  const [isPlantLoading, setIsPlantLoading] = useState(true);

  const [pageIndex, setPageIndex] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  useEffect(() => {
    loadEnviroment();
  }, []);

  useEffect(() => {
    loadPlants();
  }, []);

  async function loadEnviroment() {
    const { data } = await api
      .get<EnviromentDTO[]>('plants_environments?_sort=title&_order=asc');

    setEnviroments([
      {
        key: 'all',
        title: 'Todos'
      },
      ...data
    ]);
  }

  async function loadPlants() {
    const { data } = await api
      .get(`plants?_sort=name&_order=asc&_page=${pageIndex}&_limit=8`);

    if (!data) {
      setIsPlantLoading(true);
      return;
    }

    if (pageIndex > 1) {
      setPlants(oldValue => [...oldValue, ...data]);
      setFilteredPlants(oldValue => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsPlantLoading(false);
    setLoadingMore(false);
  }

  function handleLoadMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPageIndex(oldValue => oldValue + 1);

    loadPlants();

  }

  function handleEnviromentSelect(key: string) {
    setEnviromentSelected(key);

    if (key === 'all') {
      setFilteredPlants(plants);
      return;
    }

    const filtered = plants.filter(plant => plant.environments.includes(key));
    setFilteredPlants(filtered);
    setIsEnviromentLoading(false);
  }

  if (isEnviromentLoading && isPlantLoading) {
    return (
      <Loading />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>

      </View>

      <View>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={enviroments}
          renderItem={({ item }) => (
            <EnviromentButton
              key={item.key}
              title={item.title} 
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelect(item.key)}
            />      
          )}
        />
      </View>

      <View style={styles.plantContainer}>
          <FlatList 
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filteredPlants}
            renderItem={({item}) => (
              <PlantCardPrimary
                data={item}
              />
            )}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) => 
              handleLoadMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMore 
                ? <ActivityIndicator color={colors.green} />
                : <View style={styles.plantFooter}/>
            }
          />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15,

  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    
    paddingBottom: 5,
    marginVertical: 32,
    marginLeft: 32,
  },
  plantContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  plantFooter: {
    height: 20,
  }
});
